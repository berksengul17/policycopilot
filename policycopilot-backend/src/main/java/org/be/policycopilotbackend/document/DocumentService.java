package org.be.policycopilotbackend.document;

import lombok.AllArgsConstructor;
import org.be.policycopilotbackend.user.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Date;

@Service
@AllArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

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
