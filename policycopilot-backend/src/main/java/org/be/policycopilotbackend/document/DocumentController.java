package org.be.policycopilotbackend.document;

import lombok.RequiredArgsConstructor;
import org.be.policycopilotbackend.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Document>> getAllDocuments(@AuthenticationPrincipal User user) {
        List<Document> docs = documentService.getAllForUser(user);

        return ResponseEntity.ok().body(docs);
    }

    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(@RequestParam("file") MultipartFile file,
                                                 @AuthenticationPrincipal User user) {
        try {
            Document doc = documentService.saveDocument(file, user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(doc);
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id,
                                                   @AuthenticationPrincipal User user) {
        // FIXME when document doesnt exist it returns error code of 403 instead of 404
        try {
            Document doc = documentService.getDocument(id);

            // if a user tries to download a document he/she doesn't own, reject.
            if (!doc.getOwner().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity
                    .ok()
                    .header("Content-Type", doc.getContentType())
                    .body(doc.getContent());
        } catch (DocumentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
