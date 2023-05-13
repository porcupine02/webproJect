DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
    `service_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `breakfast` enum('yes', 'no') NOT NULL,
    `pool` enum('yes', 'no') NOT NULL,
    `wifi` enum('yes', 'no') NOT NULL,
    `air_conditioner` enum('yes', 'no') NOT NULL,
    PRIMARY KEY (`service_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
    `comment_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `content` varchar(100) NOT NUll,
    `cus_id` int(5) unsigned NOT NUll,
    `like` int(5) DEFAULT 0,
    `room_id` int(5) NOT NUll,
    PRIMARY KEY (`comment_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
    `report_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `content` varchar(500) NOT NUll,
    `cus_id` int(5) unsigned NOT NUll,
    `status` enum('submit', 'accept') DEFAULT 'submit',
    PRIMARY KEY (`report_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

CREATE INDEX customers_ibfk_1 ON comments (cus_id);
CREATE INDEX customers_ibfk_2 ON reports (cus_id);

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
    `cus_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `first_name` varchar(50) NOT NULL,
    `last_name` varchar(50) NOT NULL,
    `phone` int(10) NOT NULL,
    `email` varchar(100) NOT NULL,
    `DOB` date NOT NUll,
    PRIMARY KEY (`cus_id`),
    FOREIGN KEY (`cus_id`) REFERENCES `comments`(`cus_id`),
    FOREIGN KEY (`cus_id`) REFERENCES `reports`(`cus_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `log_in`;
CREATE TABLE `log_in` (
    `login_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `cus_id` int(5) unsigned NOT NULL,
    `username` varchar(25) NOT NULL,
    `password` varchar(100) NOT NULL,
    `login_role` enum('manager', 'customer') NOT NULL DEFAULT 'customer',
    PRIMARY KEY (`login_id`),
    FOREIGN KEY (`cus_id`) REFERENCES `customers`(`cus_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
    `img_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `room_id` int(5) unsigned,
    `file_path` varchar(50) NOT NUll,
    `cus_id` int(5),
    `upload_date` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`img_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;

CREATE INDEX customers_ibfk_2 ON images (room_id);

DROP TABLE IF EXISTS `roomDetail`;
CREATE TABLE `roomDetail` (
    `room_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `room_type` varchar(25) NOT NULL,
    `price` int(10) NOT NULL,
    `rate` int(1) unsigned DEFAULT 5,
    `description` varchar(500),
    `service_id` int(5) unsigned,
    `room_img_id` int(2) unsigned NOT NULL,
    `people`int(2) unsigned NOT NUll,
    `count` int(5) unsigned DEFAULT 0,
    PRIMARY KEY (`room_id`),
    FOREIGN KEY (`room_img_id`) REFERENCES `images`(`img_id`),
    FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `booking`;
CREATE TABLE `booking` (
    `booking_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `cus_id` int(5) unsigned NOT NULL,
    `room_id` int(5) unsigned NOT NULL,
    `price` int(10) unsigned NOT NUll,
    `check_in` date NOT NULL,
    `check_out` date NOT NULL,
    `booking_fname` varchar(50) NOT NULL,
    `booking_lname` varchar(50) NOT NULL,
    `timestamp_booking` datetime NOT NULL,
    `people` int(1) NOT NULL,
    `countRoom` int(2) NOT NULL,
    `status` enum('booked', 'complete', 'doing') NOT NUll DEFAULT 'booked',
    PRIMARY KEY (`booking_id`),
    FOREIGN KEY (`cus_id`) REFERENCES `customers`(`cus_id`),
    FOREIGN KEY (`room_id`) REFERENCES `roomDetail`(`room_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
    `payment_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `payment_date` date NOT NULL,
    `payment_slip` varchar(40) NOT NULL,
    `payment_total_money` int(10) NOT NULL,
    `booking_id` int(5) unsigned NOT NULL,
    `payment_amount` int(5) NOT NUll,
    PRIMARY KEY (`payment_id`),
    FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


DROP TABLE IF EXISTS `unvalible_room`;
CREATE TABLE `unvalible_room` (
    `room_id` int(5) unsigned NOT NULL AUTO_INCREMENT,
    `count` int(2) NOT NULL,
    `date` date NOT NUll,
    PRIMARY KEY (`date`, `room_id`),
    FOREIGN KEY (`room_id`) REFERENCES `roomDetail`(`room_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4;


