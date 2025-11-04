package org.be.policycopilotbackend.document;

public class DocumentNotFoundException extends Exception {
    public DocumentNotFoundException() {
        super("Document not found");
    }
}
