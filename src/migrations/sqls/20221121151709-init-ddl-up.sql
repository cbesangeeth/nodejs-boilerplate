CREATE TABLE IF NOT EXISTS users (
    `id` BIGINT NOT NULL AUTO_INCREMENT , 
    `sso_id` VARCHAR(127) NOT NULL , 
    `email` VARCHAR(255) NULL DEFAULT NULL , 
    `name` VARCHAR(255) NULL DEFAULT NULL , 
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
    `updated_at` DATETIME NULL DEFAULT NULL , 
    CONSTRAINT pk_users PRIMARY KEY (`id`),
    CONSTRAINT unique_sso_id UNIQUE (`sso_id`),
    CONSTRAINT unique_email UNIQUE (`email`)
);