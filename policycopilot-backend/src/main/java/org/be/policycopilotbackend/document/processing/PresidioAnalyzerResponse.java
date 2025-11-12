package org.be.policycopilotbackend.document.processing;

public record PresidioAnalyzerResponse(String analysisExplanation,
                                       int end,
                                       String entityType,
                                       float score,
                                       int start) {}