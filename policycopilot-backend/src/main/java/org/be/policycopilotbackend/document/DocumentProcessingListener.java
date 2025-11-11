package org.be.policycopilotbackend.document;

import lombok.RequiredArgsConstructor;
import org.be.policycopilotbackend.config.RabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DocumentProcessingListener {
    private final DocumentService documentService;

    @RabbitListener(queues = RabbitConfig.DOC_QUEUE)
    public void onDocumentUpload(Long docId) {
        try {
            Document doc = documentService.getDocument(docId);
            doc.setStatus(DocumentStatus.SCANNED);
            documentService.updateDocument(doc);
        } catch (DocumentNotFoundException e) {
            System.out.println("Document not found.");
        }

    }
}
