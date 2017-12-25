-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 25, 2017 at 09:18 PM
-- Server version: 5.7.18-0ubuntu0.16.10.1
-- PHP Version: 7.0.18-0ubuntu0.16.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `LIT`
--

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `option_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` text,
  `is_correct` tinyint(1) DEFAULT NULL,
  `contains_image` tinyint(1) NOT NULL,
  `image_url` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`option_id`, `question_id`, `option_text`, `is_correct`, `contains_image`, `image_url`) VALUES
(1, 1, 'q1 a1', 0, 0, ''),
(1, 2, 'q2 a1', 1, 0, ''),
(1, 3, 'q3 a1', 0, 0, ''),
(1, 31, 'k', 1, 0, ''),
(1, 33, 'one', 0, 0, ''),
(1, 34, 'lungs', 1, 0, ''),
(1, 35, 'x', 1, 0, ''),
(2, 1, 'q1 a2', 1, 0, ''),
(2, 2, 'q2 a2', 0, 0, ''),
(2, 3, 'q3 a2', 1, 0, ''),
(2, 31, 'kk', 1, 0, ''),
(2, 33, 'nine point 8', 1, 0, ''),
(2, 34, 'heart', 1, 0, ''),
(2, 35, 'y', 0, 0, ''),
(3, 1, 'q1 a3', 0, 0, ''),
(3, 31, 'kkkk', 1, 0, ''),
(3, 33, '9.8 sahi hai', 1, 0, ''),
(3, 34, 'stomach', 0, 0, ''),
(3, 35, 'z', 0, 0, ''),
(4, 31, 'kkkkkkk', 0, 0, ''),
(4, 33, '100 galat hai', 0, 0, ''),
(4, 34, 'liver ', 1, 0, ''),
(4, 35, 'w', 1, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `question_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `topic_name` varchar(20) NOT NULL,
  `subject_name` varchar(20) NOT NULL,
  `question_marks` int(11) NOT NULL,
  `contains_image` tinyint(1) NOT NULL,
  `image_url` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`question_id`, `question_text`, `topic_name`, `subject_name`, `question_marks`, `contains_image`, `image_url`) VALUES
(1, 'Text of Question 1', 'Calculus', 'Mathematics', 10, 0, ''),
(2, 'Text of Question 2', 'Gravitation', 'Physics', 20, 0, ''),
(3, 'Text of Question 3', 'Equilibrium', 'Chemistry', 5, 0, ''),
(31, 'sme question', 'Reproduction', 'Biology', 220, 0, ''),
(33, 'what is the value of G?\r\n', 'Gravitation', 'Physics', 200, 0, ''),
(34, 'bio ka ek aur quetsion', 'Reproduction', 'Biology', 20, 0, ''),
(35, 'calculus ka question', 'Calculus', 'Mathematics', 20, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `username` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `class` int(11) NOT NULL,
  `school` varchar(100) NOT NULL,
  `ph_no` bigint(20) NOT NULL,
  `area_pincode` int(11) NOT NULL,
  `math_teacher` varchar(20) NOT NULL,
  `phy_teacher` varchar(20) NOT NULL,
  `chem_teacher` varchar(20) NOT NULL,
  `bio_teacher` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`username`, `name`, `password`, `email`, `class`, `school`, `ph_no`, `area_pincode`, `math_teacher`, `phy_teacher`, `chem_teacher`, `bio_teacher`) VALUES
('insan', 'Insan', '$2a$08$KO2w1evX5aoSH0Qy8DM8DevnnxSItnpAxaYPQWztmpKrwhtPYE7I2', 'insan@gmail.com', 8, 'insaniyat', 9967063383, 400076, 'randomTeacher1', 'randomTeacher2', 'random99', 'random99'),
('sbarodiya', 'Shreyansh Barodiya', '$2a$08$E0pbmT/hVrTwtQIoPDPD8uEdxJnLFHIqJ2K42fF/ar97EnBA1VPWa', '140050025@xyz.com', 10, 'KVS', 9967063383, 400076, 'random99', 'random99', 'random99', 'random99');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_name`) VALUES
('Biology'),
('Chemistry'),
('Mathematics'),
('Physics');

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `username` varchar(20) NOT NULL,
  `question_id` int(11) NOT NULL,
  `correctAttempted` tinyint(1) NOT NULL,
  `timeStamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `area_pincode` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `name`, `area_pincode`) VALUES
('random99', 'Praveen Mishra ', 999999),
('randomTeacher1', 'Random Teacher 1', 461001),
('randomTeacher2', 'Random Teacher 2', 461001);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `topic_name` varchar(20) NOT NULL,
  `subject_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`topic_name`, `subject_name`) VALUES
('Reproduction', 'Biology'),
('Equilibrium', 'Chemistry'),
('Calculus', 'Mathematics'),
('Gravitation', 'Physics');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`,`question_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `topic` (`topic_name`),
  ADD KEY `subject_name` (`subject_name`,`topic_name`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`username`),
  ADD KEY `bio_teacher` (`bio_teacher`),
  ADD KEY `math_teacher` (`math_teacher`),
  ADD KEY `phy_teacher` (`phy_teacher`),
  ADD KEY `chem_teacher` (`chem_teacher`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_name`);

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`username`,`question_id`),
  ADD KEY `idQuestion` (`question_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `idTeacher` (`teacher_id`),
  ADD KEY `idTeacher_2` (`teacher_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topic_name`,`subject_name`),
  ADD KEY `subject_name` (`subject_name`),
  ADD KEY `topic_name` (`topic_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`subject_name`,`topic_name`) REFERENCES `topic` (`subject_name`, `topic_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`math_teacher`) REFERENCES `teacher` (`teacher_id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`phy_teacher`) REFERENCES `teacher` (`teacher_id`),
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`chem_teacher`) REFERENCES `teacher` (`teacher_id`),
  ADD CONSTRAINT `student_ibfk_4` FOREIGN KEY (`bio_teacher`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `submission`
--
ALTER TABLE `submission`
  ADD CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`username`) REFERENCES `student` (`username`),
  ADD CONSTRAINT `submission_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`);

--
-- Constraints for table `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`subject_name`) REFERENCES `subject` (`subject_name`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
