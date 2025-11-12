package org.be.policycopilotbackend.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.be.policycopilotbackend.document.piientity.PiiEntity;
import org.be.policycopilotbackend.user.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Temporal(TemporalType.DATE)
    private Date uploadDate;
    @Column(columnDefinition = "bytea")
    private byte[] content;
    private String contentType;
    @Enumerated(EnumType.STRING)
    private DocumentStatus status;
    @OneToMany(mappedBy="document", cascade = CascadeType.ALL)
    private List<PiiEntity> piiEntities;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User owner;

    public Document(String name, Date uploadDate, byte[] content, String contentType, User owner) {
        this.name = name;
        this.uploadDate = uploadDate;
        this.content = content;
        this.contentType = contentType;
        this.owner = owner;
        this.status = DocumentStatus.QUEUED;
        this.piiEntities = new ArrayList<>();
    }
}
