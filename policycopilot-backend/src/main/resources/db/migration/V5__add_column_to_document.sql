ALTER TABLE document
    ADD high_risk_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE document
    ADD pii_count INTEGER NOT NULL DEFAULT 0;

ALTER TABLE document
    ALTER COLUMN high_risk_count SET NOT NULL;

ALTER TABLE document
    ALTER COLUMN pii_count SET NOT NULL;