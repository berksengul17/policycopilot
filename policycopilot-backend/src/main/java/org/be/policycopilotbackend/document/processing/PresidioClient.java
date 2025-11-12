package org.be.policycopilotbackend.document.processing;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PresidioClient {
    private final RestTemplate restTemplate;
    @Value("${presidio.analyze.url}")
    private String ANALYZE_URL;

    public List<PresidioAnalyzerResponse> analyze(String text) {
        PresidioAnalyzerRequest body = new PresidioAnalyzerRequest(text, "en");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<PresidioAnalyzerRequest> req = new HttpEntity<>(body, headers);
        ResponseEntity<List<PresidioAnalyzerResponse>> resp =
                restTemplate.exchange(
                        ANALYZE_URL,
                        HttpMethod.POST,
                        req,
                        new ParameterizedTypeReference<>() {
                        });

        return resp.getBody();
    }
}
