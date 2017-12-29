-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bdSICIMEC
-- -----------------------------------------------------
-- V1.0

-- -----------------------------------------------------
-- Schema bdSICIMEC
--
-- V1.0
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bdSICIMEC` DEFAULT CHARACTER SET utf8 ;
USE `bdSICIMEC` ;

-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbMarca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbMarca` (
  `idMarca` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idMarca`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbMarca2` (
  `idMarca` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (`idMarca`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;

INSERT INTO tbMarca2 VALUES (default, 'Ensamblada', default);
-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbTipoEquipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbTipoEquipo` (
  `idTipoEquipo` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC),
  PRIMARY KEY (`idTipoEquipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbDepartamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbDepartamento` (
  `idDepartamento` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idDepartamento`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbEquipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbEquipo` (
  `idEquipo` INT NOT NULL AUTO_INCREMENT,
  `idDepartamento` INT NOT NULL,
  `idTipoEquipo` INT NOT NULL,
  `idMarca` INT NOT NULL,
  `modelo` VARCHAR(100) NULL,
  `noSerie` VARCHAR(100) NULL,
  `observacion` VARCHAR(100) NULL,
  `fechaAlta` DATE NULL,
  `fechaBaja` DATE NULL,
  `estatus` INT NOT NULL DEFAULT 1,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idEquipo`),
  UNIQUE INDEX `noSerie_UNIQUE` (`noSerie` ASC),
  INDEX `idDepartamento_idx` (`idDepartamento` ASC),
  INDEX `idMarca_idx` (`idMarca` ASC),
  INDEX `idTipoEquipo_idx` (`idTipoEquipo` ASC),
  CONSTRAINT `idDepartamento`
    FOREIGN KEY (`idDepartamento`)
    REFERENCES `bdSICIMEC`.`tbDepartamento` (`idDepartamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idTipoEquipo`
    FOREIGN KEY (`idTipoEquipo`)
    REFERENCES `bdSICIMEC`.`tbTipoEquipo` (`idTipoEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idMarca`
    FOREIGN KEY (`idMarca`)
    REFERENCES `bdSICIMEC`.`tbMarca` (`idMarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbTipoMantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbTipoMantenimiento` (
  `idTipoMantenimiento` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idTipoMantenimiento`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbCausaMantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbCausaMantenimiento` (
  `idCausaMantenimiento` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCausaMantenimiento`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbMantenimiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbMantenimiento` (
  `idMantenimiento` INT NOT NULL AUTO_INCREMENT,
  `idTipoMantenimiento` INT NOT NULL,
  `idCausaMantenimiento` INT NOT NULL,
  `idEquipo` INT NOT NULL,
  `fechaSolicitud` DATE NOT NULL,
  `fechaTerminado` DATE NULL,
  `observacion` VARCHAR(100) NULL,
  `terminado` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idMantenimiento`),
  INDEX `idTipoMantenimiento_idx` (`idTipoMantenimiento` ASC),
  INDEX `idCausaMantenimiento_idx` (`idCausaMantenimiento` ASC),
  INDEX `idEquipo_idx` (`idEquipo` ASC),
  CONSTRAINT `idTipoMantenimiento`
    FOREIGN KEY (`idTipoMantenimiento`)
    REFERENCES `bdSICIMEC`.`tbTipoMantenimiento` (`idTipoMantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idCausaMantenimiento`
    FOREIGN KEY (`idCausaMantenimiento`)
    REFERENCES `bdSICIMEC`.`tbCausaMantenimiento` (`idCausaMantenimiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idEquipo`
    FOREIGN KEY (`idEquipo`)
    REFERENCES `bdSICIMEC`.`tbEquipo` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbCausaBaja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbCausaBaja` (
  `idCausaBaja` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(100) NOT NULL,
  `baja` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idCausaBaja`),
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bdSICIMEC`.`tbBajaEquipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bdSICIMEC`.`tbBajaEquipo` (
  `idBajaEquipo` INT NOT NULL AUTO_INCREMENT,
  `idCausaBaja` INT NOT NULL,
  `idEquipo` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `observacion` VARCHAR(100) NULL,
  PRIMARY KEY (`idBajaEquipo`),
  INDEX `idCausaBaja_idx` (`idCausaBaja` ASC),
  INDEX `idEquipo_idx` (`idEquipo` ASC),
  CONSTRAINT `idCausaBaja`
    FOREIGN KEY (`idCausaBaja`)
    REFERENCES `bdSICIMEC`.`tbCausaBaja` (`idCausaBaja`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idEquipo`
    FOREIGN KEY (`idEquipo`)
    REFERENCES `bdSICIMEC`.`tbEquipo` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
