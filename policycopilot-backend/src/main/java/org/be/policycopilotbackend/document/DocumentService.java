package org.be.policycopilotbackend.document;

import lombok.AllArgsConstructor;
import org.be.policycopilotbackend.user.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    public List<Document> getAllForUser(User user) {
        return documentRepository.findAllByOwner_Id(user.getId());
    }

    public Document getDocument(Long id) throws DocumentNotFoundException {
        return documentRepository.findById(id).orElseThrow(DocumentNotFoundException::new);
    }

    public Document saveDocument(MultipartFile file, User owner) throws IOException {
        return documentRepository.save(
                new Document(file.getOriginalFilename(),
                        new Date(),
                        file.getBytes(),
                        file.getContentType(),
                        owner));
    }
}
