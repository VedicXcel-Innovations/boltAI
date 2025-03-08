<?php
include '../config.php';
include '../php/db_config.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: add_article.php");
    exit;
}

try {
    $title = $_POST['title'];
    $content = $_POST['content'];
    $type = $_POST['type'];

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    // Start transaction
    $conn->begin_transaction();

    // Insert article
    $stmt = $conn->prepare("INSERT INTO articles (title, content, type) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $type);

    if (!$stmt->execute()) {
        throw new Exception("Error adding article: " . $stmt->error);
    }

    $article_id = $stmt->insert_id;

    // Handle media uploads
    if (!empty($_FILES['media']['name'][0])) {
        $upload_dir = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;

        if (!is_dir($upload_dir) && !mkdir($upload_dir, 0755, true)) {
            throw new Exception("Failed to create uploads directory.");
        }

        foreach ($_FILES['media']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['media']['error'][$key] !== UPLOAD_ERR_OK) {
                continue;
            }

            $media_ext = pathinfo($_FILES['media']['name'][$key], PATHINFO_EXTENSION);
            $unique_name = uniqid('media_', true) . '.' . $media_ext;
            $media_url = 'uploads/' . $unique_name;
            $full_path = $upload_dir . $unique_name;

            $media_type = strpos($_FILES['media']['type'][$key], 'image') !== false ? 'photo' : 'video';

            if (!move_uploaded_file($tmp_name, $full_path)) {
                throw new Exception("Error uploading file: " . $_FILES['media']['name'][$key]);
            }

            $stmt = $conn->prepare("INSERT INTO media_article (article_id, media_url, media_type) VALUES (?, ?, ?)");
            $stmt->bind_param("iss", $article_id, $media_url, $media_type);

            if (!$stmt->execute()) {
                throw new Exception("Error saving media record: " . $stmt->error);
            }
        }
    }

    // Commit transaction
    $conn->commit();

    // Redirect to success page
    header("Location: success.php?message=" . urlencode("Article added successfully!"));
    exit;

} catch (Exception $e) {
    // Rollback transaction on error
    if ($conn->connect_error === false) {
        $conn->rollback();
    }

    // Log error
    error_log("Error in save_article.php: " . $e->getMessage());

    // Redirect to error page
    header("Location: success.php?error=1&message=" . urlencode($e->getMessage()));
    exit;
}
?>