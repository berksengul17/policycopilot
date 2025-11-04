package org.be.policycopilotbackend.document;

import java.util.Date;

public record DocumentDto(
        Long id,
        String name,
        Date uploadDate,
        String contentType,
        DocumentStatus status,
        Integer highRiskCount,
        Integer piiCount
) {
    public static DocumentDto from(Document d) {
        return new DocumentDto(
                d.getId(),
                d.getName(),
                d.getUploadDate(),
                d.getContentType(),
                d.getStatus(),
                d.getHighRiskCount(),
                d.getPiiCount()
        );
    }
}
