-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    address VARCHAR(128),
    telephone VARCHAR(128),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    job VARCHAR(20) NOT NULL,
    CONSTRAINT chk_job CHECK (job IN ('KERTESZ', 'HENTES', 'PEK'))
);

-- Create index for sorting by name
CREATE INDEX idx_users_name ON users(lastname, firstname);
