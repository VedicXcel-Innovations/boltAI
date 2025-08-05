<?php
// // Default db config
// define('DB_HOST', 'sql113.infinityfree.com');
// define('DB_USER', 'if0_38738978');
// define('DB_PASS', 'pPDdTOic4z');
// define('DB_NAME', 'if0_38738978_gdf');

// // Enable error reporting for debugging (optional)
// mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// // Create connection
// $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// // Set charset to utf8mb4 (recommended for multilingual support)
// $conn->set_charset("utf8mb4");

// // Check connection
// if ($conn->connect_error) {
//     die("❌ Database connection failed: " . $conn->connect_error);
// } else {
//     // Uncomment for debugging:
//     // echo "✅ Database connected successfully!";
// }

// VedicXcel db config for development (Remove before delivery)
define('DB_HOST', '10.1.1.2');
define('DB_USER', 'client');
define('DB_PASS', 'Chu0Lsupi87apruc');
define('DB_NAME', 'gdf_web');

// Enable error reporting for debugging (optional)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Set charset to utf8mb4 (recommended for multilingual support)
$conn->set_charset("utf8mb4");

// Check connection
if ($conn->connect_error) {
    die("❌ Database connection failed: " . $conn->connect_error);
} else {
    // Uncomment for debugging:
    // echo "✅ Database connected successfully!";
}