package org.be.policycopilotbackend.document.piientity;

import lombok.RequiredArgsConstructor;
import org.be.policycopilotbackend.document.Document;
import org.be.policycopilotbackend.document.processing.HighRiskPIIEntity;
import org.be.policycopilotbackend.document.processing.PresidioAnalyzerResponse;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PiiEntityService {
    private final PiiEntityRepository piiEntityRepository;

    public List<PiiEntity> fromPresidioAnalyzerResponse(List<PresidioAnalyzerResponse> presidioAnalyzerResponses,
                                                        Document doc) {
        return piiEntityRepository
                .saveAll(presidioAnalyzerResponses
                .stream()
                .map(r -> new PiiEntity(
                        r.entityType() == null ? "UNKNOWN" : r.entityType(),
                        r.start(),
                        r.end(),
                        doc,
                        Arrays.stream(HighRiskPIIEntity.values())
                                .anyMatch(e -> e.name().equals(r.entityType()))
                )).toList());

    }

}
