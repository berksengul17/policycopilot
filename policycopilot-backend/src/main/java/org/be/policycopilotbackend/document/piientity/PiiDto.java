package org.be.policycopilotbackend.document.piientity;

public record PiiDto (
        Long id,
        String type,
        String text,
        boolean isHighRisk
){}
