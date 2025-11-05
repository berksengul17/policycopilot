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
    public ResponseEntity<List<DocumentDto>> getAllDocuments(@AuthenticationPrincipal User user) {
        List<DocumentDto> docs = documentService.getAllForUser(user)
                .stream().map(DocumentDto::from).toList();

        return ResponseEntity.ok().body(docs);
    }

    @PostMapping("/upload")
    public ResponseEntity<DocumentDto> uploadDocument(@RequestParam("file") MultipartFile file,
                                                 @AuthenticationPrincipal User user) {
        try {
            DocumentDto doc = DocumentDto.from(documentService.saveDocument(file, user));
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
        try {
            Document doc = documentService.getDocument(id);

            // if a user tries to download a document he/she doesn't own, reject.
            if (!doc.getOwner().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            return ResponseEntity
                    .ok()
                    .header("Content-Type", doc.getContentType())
                    .header("Content-Disposition", "attachment; filename=\"" + doc.getName() + "\"")
                    .body(doc.getContent());
        } catch (DocumentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
