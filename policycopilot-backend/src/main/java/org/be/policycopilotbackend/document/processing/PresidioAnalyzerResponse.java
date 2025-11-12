package org.be.policycopilotbackend.document.processing;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PresidioAnalyzerResponse(@JsonProperty("analysis_explanation") String analysisExplanation,
                                       int end,
                                       @JsonProperty("entity_type") String entityType,
                                       float score,
                                       int start) {}