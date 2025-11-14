package org.be.policycopilotbackend.document.piientity;

import lombok.RequiredArgsConstructor;
import org.apache.tika.exception.TikaException;
import org.be.policycopilotbackend.document.Document;
import org.be.policycopilotbackend.document.processing.PresidioAnalyzerResponse;
import org.be.policycopilotbackend.document.processing.TextExtractionService;
import org.be.policycopilotbackend.util.TextFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PiiEntityService {
    private final PiiEntityRepository piiEntityRepository;
    private final TextExtractionService textExtractionService;

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

    public List<PiiDto> getPiiList(Document doc) {
        try {
            List<PiiDto> piiList = new ArrayList<>();
            String content = textExtractionService.extractText(doc.getContent());
            List<PiiEntity> piiEntities = piiEntityRepository.findAllByDocument_Id(doc.getId());

            for  (PiiEntity piiEntity : piiEntities) {
                String text = content.substring(piiEntity.getStart(), piiEntity.getEnd());
                String displayType = TextFormat.prettifyEnumLike(piiEntity.getType());
                piiList.add(new PiiDto(
                        piiEntity.getId(),
                        displayType,
                        text,
                        piiEntity.isHighRisk()
                ));
            }

            return piiList;
        } catch (TikaException | IOException | SAXException e) {
            throw new RuntimeException(e);
        }

    }
}
