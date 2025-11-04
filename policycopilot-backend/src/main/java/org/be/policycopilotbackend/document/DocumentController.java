package org.be.policycopilotbackend.document;

import lombok.RequiredArgsConstructor;
import org.be.policycopilotbackend.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file,
                                                 @AuthenticationPrincipal User user) {
        try {
            Document doc = documentService.saveDocument(file, user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(String.format("Document with the name '%s' is successfully uploaded..",  doc.getName()));
        } catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error while saving the document.");
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
