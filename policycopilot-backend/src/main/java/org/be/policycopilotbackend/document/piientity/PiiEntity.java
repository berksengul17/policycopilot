package org.be.policycopilotbackend.document.piientity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.be.policycopilotbackend.document.Document;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PiiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String type;
    private int start;
    @Column(name = "\"end\"")
    private int end;
    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    @JoinColumn(name = "document_id")
    private Document document;
    private boolean isHighRisk;

    public PiiEntity(String type, int start, int end, Document document, boolean isHighRisk) {
        this.type = type;
        this.start = start;
        this.end = end;
        this.document = document;
        this.isHighRisk = isHighRisk;
    }
}
