-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 01, 2025 lúc 05:20 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `keycap_dev`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `keycap`
--

CREATE TABLE `keycap` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `old_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `keycap`
--

INSERT INTO `keycap` (`id`, `name`, `price`, `img`, `slug`, `old_price`) VALUES
(1, 'Bộ keycap Cherry Darling', 750000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1730797498734.png?v=1730797509123', 'PVN1284', 850000),
(2, 'Bộ keycap Cherry Spark Light', 760000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1720782650146.png?v=1720783131223', 'PVN1157', 860000),
(3, 'Bộ keycap Chocolate Donut', 550000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1711626280868.png?v=1711626287557', 'PVN597', 699000),
(10, 'Bộ keycap Cherry Tiramisu', 750000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1730800872475.png?v=1730800890857', 'PVN1285', 850000),
(11, 'Bộ keycap Wukds Inception', 780000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1730189637353.png?v=1730189645547', 'WUKDS', 990000),
(12, 'Bộ keycap Cherry Vibrato', 690000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1730019881390.png?v=1730019887907', 'PVN1283', 850000),
(13, 'Bộ keycap Cherry Vibrato', 750000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1729750629486.png?v=1729750635570', 'PVN1282', 850000),
(14, 'Bộ keycap Cherry Chemical 003', 850000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1719403784926.png?v=1719403921827', 'PVN1152', 950000),
(15, 'Bộ keycap cherry Yogurt', 850000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1703953568200.png?v=1703953574807', 'PVN956', 1000000),
(16, 'Bộ keycap Kon Momo', 600000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/z4321725147750-a8e77e476337bc6f41c1057a666f7ac6-1683347785114.jpg?v=1683347789513', 'PVN198', 800000),
(17, 'Bộ keycap JKDK Carpenter', 900000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/7-min-1709354714400.png?v=1709354719583', 'PVN1015', 1000000),
(18, 'Bộ keycap Ninja xuyên led in mặt bên', 350000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1711468269209.png?v=1711468274203', 'PVN1044', 450000),
(19, 'Bộ keycap Cherry GMK Wild Clone cao cấp', 850000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-1713105556069.png?v=1713105562993', 'PVN1057', 1000000),
(20, 'Bộ keycap Cherry JTK Classic FC Clone cao cấp', 830000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-min-1713690887335.png?v=1713690892667', 'PVN1060', 930000),
(21, 'Bộ keycap Needy Candy', 850000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-min-1704806042574.png?v=1704821630373', 'PVN1061', 1000000),
(22, 'Bộ keycap Silent Plateau', 780000, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/436/596/products/1-min-1704387635357.png?v=1704387641193', 'PVN1062', 900000);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `keycap`
--
ALTER TABLE `keycap`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `keycap`
--
ALTER TABLE `keycap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
