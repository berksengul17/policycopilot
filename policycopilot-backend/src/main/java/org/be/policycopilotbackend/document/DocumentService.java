package org.be.policycopilotbackend.document;

import lombok.AllArgsConstructor;
import org.be.policycopilotbackend.config.RabbitConfig;
import org.be.policycopilotbackend.document.piientity.PiiEntity;
import org.be.policycopilotbackend.user.User;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final RabbitTemplate rabbitTemplate;

    @Transactional(readOnly = true)
    public List<DocumentDto> getAllForUser(User user) {
        return documentRepository
                .findAllByOwner_Id(user.getId())
                .stream()
                .map(d -> new DocumentDto(
                        d.getId(), d.getName(), d.getUploadDate(), d.getContentType(), d.getStatus(),
                        d.getPiiEntities().size(),
                        (int) d.getPiiEntities().stream().filter(PiiEntity::isHighRisk).count()
                ))
                .toList();
    }

    public Document getDocument(Long id) throws DocumentNotFoundException {
        return documentRepository.findById(id).orElseThrow(DocumentNotFoundException::new);
    }

    public Document saveDocument(MultipartFile file, User owner) throws IOException {
        Document doc = documentRepository.save(
                new Document(file.getOriginalFilename(),
                        new Date(),
                        file.getBytes(),
                        file.getContentType(),
                        owner));

        rabbitTemplate.convertAndSend(RabbitConfig.DOC_EXCHANGE,
                RabbitConfig.DOC_ROUTING_KEY,
                doc.getId());

        return doc;
    }

    public void updateDocument(Document doc) {
        documentRepository.save(doc);
    }

    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
