package org.be.policycopilotbackend.document.processing;

import lombok.RequiredArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.be.policycopilotbackend.config.RabbitConfig;
import org.be.policycopilotbackend.document.Document;
import org.be.policycopilotbackend.document.DocumentNotFoundException;
import org.be.policycopilotbackend.document.DocumentService;
import org.be.policycopilotbackend.document.DocumentStatus;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class DocumentProcessingListener {
    private final DocumentService documentService;
    private final TextExtractionService textExtractionService;

    @RabbitListener(queues = RabbitConfig.DOC_QUEUE)
    public void onDocumentUpload(Long docId) {
        try {
            Document doc = documentService.getDocument(docId);
            doc.setStatus(DocumentStatus.SCANNED);
            String content = textExtractionService.extractText(doc.getContent());
            System.out.println(content);
            documentService.updateDocument(doc);
        } catch (DocumentNotFoundException e) {
            System.out.println("Document not found.");
        } catch (TikaException | IOException | SAXException e) {
            throw new RuntimeException(e);
        }

    }
}
