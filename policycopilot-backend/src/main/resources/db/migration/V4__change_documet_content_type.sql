ALTER TABLE document
    ALTER COLUMN content
        TYPE bytea
        USING lo_get(content);
