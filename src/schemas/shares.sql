CREATE TABLE
    `cv`.`shares` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `share-uuid` VARCHAR(100) NOT NULL,
        `file-uuid` VARCHAR(100) NOT NULL,
        `expiration` DATE NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;