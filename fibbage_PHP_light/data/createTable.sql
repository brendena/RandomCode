DROP DATABASE IF EXISTS fibbage;
CREATE DATABASE fibbage;
USE fibbage;

/*
CREATE TABLE IF NOT EXISTS `Question` (
  `id` INT NOT NULL,
  `question` VARCHAR(120) NULL,
  `answer` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`fakeAnswers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FakeAnswers` (
  `question_id` INT NOT NULL,
  `answer` VARCHAR(45),
  PRIMARY KEY (`question_id`),
  CONSTRAINT `fk_fakeAnswers_question`  FOREIGN KEY (`question_id`) REFERENCES `Question` (`id`)
)
    
ENGINE = InnoDB;
*/

Drop table if Exists UserDB;
CREATE TABLE IF NOT EXISTS `UserDB` (
  `pwd` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `age` int NOT NULL,
  `fn` VARCHAR(45) NOT NULL,
  `ln` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


Drop table if Exists Question;
CREATE TABLE IF NOT EXISTS `Question` (
  `id` INT auto_increment NOT NULL,
  `question` VARCHAR(150) NOT NULL,
  `answer` VARCHAR(45) NOT NULL,
  `userEmail` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Question_User1`
    FOREIGN KEY (`userEmail`)
    REFERENCES `UserDB` (`email`)
)
ENGINE = InnoDB;


Drop table if Exists FakeAnswers;
CREATE TABLE IF NOT EXISTS `FakeAnswers` (
  `question_id` INT NOT NULL,
  `answer` VARCHAR(45) NULL,
  `id`  INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (`id`,`question_id`),
  CONSTRAINT `fk_fakeAnswers_question`
    FOREIGN KEY (`question_id`)
    REFERENCES `Question` (`id`)
)
ENGINE = InnoDB;


