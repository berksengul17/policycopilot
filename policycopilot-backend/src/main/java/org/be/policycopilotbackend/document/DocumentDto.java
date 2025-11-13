package org.be.policycopilotbackend.document;

import java.util.Date;

public record DocumentDto(
        Long id,
        String name,
        Date uploadDate,
        String contentType,
        DocumentStatus status,
        int piiCount,
        int highRiskCount
) { }
