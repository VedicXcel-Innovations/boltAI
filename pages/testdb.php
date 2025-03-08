<?php
include '../php/db_config.php'; // Include your database configuration file

// Check if the connection was successful
if ($conn->connect_error) {
    die("❌ Database connection failed: " . $conn->connect_error);
} else {
    echo "✅ Database connected successfully!";
}

// Close the connection
$conn->close();
?>