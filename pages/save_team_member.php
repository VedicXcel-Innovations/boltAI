<?php
include '../config.php';
include '../php/db_config.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: add_team_member.php");
    exit;
}

try {
    $name = $_POST['name'];
    $role = $_POST['role'];
    $message = $_POST['message'];

    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $conn->begin_transaction();

    // Insert team member data
    $stmt = $conn->prepare("INSERT INTO team_members (name, role, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $role, $message);

    if (!$stmt->execute()) {
        throw new Exception("Error adding team member: " . $stmt->error);
    }

    $team_member_id = $stmt->insert_id;

    // Handle media upload
    if (!empty($_FILES['media']['name'][0])) {
        $upload_dir = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;

        if (!is_dir($upload_dir) && !mkdir($upload_dir, 0755, true)) {
            throw new Exception("Failed to create uploads directory.");
        }

        foreach ($_FILES['media']['tmp_name'] as $key => $tmp_name) {
            if ($_FILES['media']['error'][$key] !== UPLOAD_ERR_OK) {
                continue;
            }

            // Validate file type
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_file($finfo, $tmp_name);
            finfo_close($finfo);

            if (!in_array($mime_type, ['image/jpeg', 'image/png', 'video/mp4'])) {
                throw new Exception("Invalid file type: " . $_FILES['media']['name'][$key]);
            }

            // Validate file size
            $max_file_size = 100 * 1024 * 1024; // 100 MB
            if ($_FILES['media']['size'][$key] > $max_file_size) {
                throw new Exception("File size exceeds the limit: " . $_FILES['media']['name'][$key]);
            }

            $media_ext = pathinfo($_FILES['media']['name'][$key], PATHINFO_EXTENSION);
            $unique_name = uniqid('media_', true) . '.' . $media_ext;
            $media_url = 'uploads/' . $unique_name;
            $full_path = $upload_dir . $unique_name;

            $media_type = strpos($mime_type, 'image') !== false ? 'photo' : 'video';

            if (!move_uploaded_file($tmp_name, $full_path)) {
                throw new Exception("Error uploading file: " . $_FILES['media']['name'][$key]);
            }

            $stmt = $conn->prepare("INSERT INTO team_media (team_member_id, media_url, media_type) VALUES (?, ?, ?)");
            $stmt->bind_param("iss", $team_member_id, $media_url, $media_type);

            if (!$stmt->execute()) {
                throw new Exception("Error saving media record: " . $stmt->error);
            }
        }
    }

    $conn->commit();

    header("Location: success.php?message=" . urlencode("Team member added successfully!"));
    exit;

} catch (Exception $e) {
    if ($conn->connect_error === false) {
        $conn->rollback();
    }

    error_log("Error in save_team_member.php: " . $e->getMessage());

    header("Location: success.php?error=1&message=" . urlencode($e->getMessage()));
    exit;
}
?>