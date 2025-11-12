package org.be.policycopilotbackend.document.processing;

import lombok.RequiredArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.be.policycopilotbackend.config.RabbitConfig;
import org.be.policycopilotbackend.document.Document;
import org.be.policycopilotbackend.document.DocumentNotFoundException;
import org.be.policycopilotbackend.document.DocumentService;
import org.be.policycopilotbackend.document.DocumentStatus;
import org.be.policycopilotbackend.document.piientity.PiiEntity;
import org.be.policycopilotbackend.document.piientity.PiiEntityService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DocumentProcessingListener {
    private final DocumentService documentService;
    private final PiiEntityService piiEntityService;
    private final TextExtractionService textExtractionService;
    private final PresidioClient presidioClient;

    @RabbitListener(queues = RabbitConfig.DOC_QUEUE)
    public void onDocumentUpload(Long docId) {
        try {
            Document doc = documentService.getDocument(docId);
            String content = textExtractionService.extractText(doc.getContent());
            List<PresidioAnalyzerResponse> resp = presidioClient.analyze(content);
            // create pii entity objects from the response
            List<PiiEntity> piiEntities = piiEntityService
                    .fromPresidioAnalyzerResponse(resp, doc);
            doc.setPiiEntities(piiEntities);
            doc.setStatus(DocumentStatus.SCANNED);
            documentService.updateDocument(doc);
        } catch (DocumentNotFoundException e) {
            System.out.println("Document not found.");
        } catch (TikaException | IOException | SAXException e) {
            throw new RuntimeException(e);
        }

    }
}
