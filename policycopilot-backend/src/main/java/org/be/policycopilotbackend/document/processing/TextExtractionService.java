package org.be.policycopilotbackend.document.processing;

import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class TextExtractionService {
    public String extractText(byte[] content) throws TikaException, IOException, SAXException {
        try (var in = new ByteArrayInputStream(content)) {
            var handler = new BodyContentHandler(-1);
            var metadata = new Metadata();
            new AutoDetectParser().parse(in, handler, metadata);
            return handler.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to extract text", e);
        }
    }
}
