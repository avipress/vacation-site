CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` int NOT NULL,
  `vacation_id` int DEFAULT NULL,
  KEY `userID_idx` (`vacation_id`),
  KEY `holidayID_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,19),(12,6),(13,3),(13,8),(13,11),(2,19),(12,6),(13,3),(13,8),(13,11);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siteusers`
--

DROP TABLE IF EXISTS `siteusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siteusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL DEFAULT 'na',
  `user_email` varchar(90) NOT NULL DEFAULT 'na',
  `password` varchar(45) NOT NULL,
  `user_create` varchar(45) NOT NULL,
  `role_type` varchar(45) DEFAULT 'member',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siteusers`
--

LOCK TABLES `siteusers` WRITE;
/*!40000 ALTER TABLE `siteusers` DISABLE KEYS */;
INSERT INTO `siteusers` VALUES (1,'admin','admin@gmail.com','admin','12.7.2023   ,   10:30:00','admin'),(2,'aviavi','avip@gmail.com','12345','12.7.2023   ,   11:43:00','member'),(13,'yosi','yosi@gmail.com','123456','31.7.2023   ,   18:11:24','member');
/*!40000 ALTER TABLE `siteusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(55) NOT NULL,
  `description` varchar(2255) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `followers_count` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (1,'Hawaii','Hawaii is a volcanic archipelago and an American state. It is located in the Central Pacific Ocean and is made up of hundreds of islands that span a distance of 2,451km. Only 8 of these islands are commonly known and just 6 are regularly visited. They include Hawaii Island, Maui, Oahu, Kauai, Molokai and Lanai.','2023-07-01','2023-07-10','1500','Hawaii.jpg','1'),(3,'Bali','Bali is the most popular island vacation destination in the Indonesian archipelago. Its home to an ancient culture thats known for its warm hospitality as well as exotic temples and palaces set against stunning natural backdrops. Dining in Bali presents endless choices of exotic, local cuisine.','2023-09-04','2023-09-14','1700','Bali.jpg','1'),(4,'Maldives','The Maldive Islands are a series of coral atolls built up from the crowns of a submerged ancient volcanic mountain range. All the islands are low-lying, none rising to more than 6 feet (1.8 metres) above sea level. Barrier reefs protect the islands from the destructive effects of monsoons.','2023-10-10','2023-10-20','2500','Maldives.jpg','1'),(5,'Tokyo','Tokyo is the administrative, cultural, financial, commercial, and educational centre of Japan and the focus of an extensive urban complex that includes Kawasaki and Yokohama. Attractions include the Imperial Palace, encircled by stone-walled moats and broad gardens, and numerous temples and shrines.','2023-11-15','2023-11-25','2200','Tokyo.jpg','0'),(6,'Rome','Rome is often referred to as the City of Seven Hills due to its geographic location, and also as the \"Eternal City\". Rome is generally considered to be the \"cradle of Western civilization and Christian culture\", and the centre of the Catholic Church.','2024-01-05','2024-01-15','1900','Rome.jpg','1'),(7,'Bora Bora','Bora Bora is located on a dormant volcano island, set on one of the worlds most beautiful and crystal-clear lagoons, colored in a million shades of blue. Bora Bora is located a brief 50-minute flight from The Islands of Tahiti or Moorea.','2024-02-10','2024-02-20','3000','Bora Bora.jpg','1'),(8,'Barcelona','Barcelona is a city with a wide range of original leisure options that encourage you to visit time and time again. Overlooking the Mediterranean Sea, and famous for Gaudí and other Art Nouveau architecture, Barcelona is one of Europes trendiest cities.','2024-03-15','2024-03-25','1800','Barcelona.jpg','0'),(9,'Cancun','The island, with its skyscraper hotels and sprawling resorts, and the coastal area occupied by Cancún city have abundant white sand beaches, palm groves, and coral reefs. The warm, tropical climate has a short rainy season.','2024-04-05','2024-04-15','2100','Cancun.jpg','2'),(10,'Sydney','Sydney, city, capital of the state of New South Wales, Australia. Located on Australias southeastern coast, Sydney is the countrys largest city and, with its magnificent harbour and strategic position, is one of the most important ports in the South Pacific.','2024-05-10','2024-05-20','2300','Sydney.jpg','2'),(11,'London','It is the largest metropolis in the United Kingdom, and it is also the countrys economic, transportation, and cultural centre. In addition to its history, art, and politics, London is a popular tourist destination for its wide variety of museums, shops, restaurants, and sports teams.','2024-06-15','2024-06-25','2000','London.jpg','2'),(12,'New York','New York is composed of five boroughs – Brooklyn, the Bronx, Manhattan, Queens and Staten Island - is home to 8.4 million people who speak more than 200 languages, hail from every corner of the globe, and, together, are the heart and soul of the most dynamic city in the world.','2024-07-05','2024-07-15','1900','New York.jpg','1'),(19,'israel','Israel is a small, narrow, semi-arid country on the southeastern coastline of the Mediterranean Sea. It entered history some 35 centuries ago when the Jewish people forsook its nomadic way of life, settled in the Land and became a nation.','2024-08-02','2024-08-05','1100','israel.jpg','3');
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-01  3:31:20
