package org.be.policycopilotbackend.document.piientity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PiiEntityRepository extends JpaRepository<PiiEntity, Long> {
}
