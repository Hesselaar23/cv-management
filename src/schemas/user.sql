CREATE TABLE
    `cv`.`user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `username` varchar(100) NOT NULL,
        `password` varchar(200) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;