package org.be.policycopilotbackend.document.piientity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PiiEntityRepository extends JpaRepository<PiiEntity, Long> {
    List<PiiEntity> findAllByDocument_Id(Long documentId);
}
