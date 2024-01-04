CREATE TABLE
    `cv`.`entries` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `phone` VARCHAR(20) NULL DEFAULT NULL,
        `file` VARCHAR(300) NOT NULL,
        `status` VARCHAR(20) NOT NULL,
        `created` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;