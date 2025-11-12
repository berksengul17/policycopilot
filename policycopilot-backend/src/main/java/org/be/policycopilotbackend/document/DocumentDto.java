package org.be.policycopilotbackend.document;

import org.be.policycopilotbackend.document.piientity.PiiEntity;

import java.util.Date;
import java.util.List;

public record DocumentDto(
        Long id,
        String name,
        Date uploadDate,
        String contentType,
        DocumentStatus status,
        int piiCount,
        int highRiskCount
) { }
