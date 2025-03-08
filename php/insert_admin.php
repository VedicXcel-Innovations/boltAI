<?php include '../config.php'; ?>
<?php
require 'db_config.php';

// Securely hashed password
$admin_password = password_hash("coVuv5matrezED4s", PASSWORD_BCRYPT); 

// Insert 'admin' as ID
$sql = "INSERT INTO admin_login (id, password) VALUES ('admin', '$admin_password') 
        ON DUPLICATE KEY UPDATE password = '$admin_password'";

if ($conn->query($sql) === TRUE) {
    echo "✅ Admin user added/updated!";
} else {
    echo "❌ Error: " . $conn->error;
}

$conn->close();
?>
