<?php
include '../config.php';
include 'db_config.php';

header('Content-Type: application/json');

try {
    // Validate input
    $required_fields = ['name', 'email', 'contact_no', 'scope', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Validate CV file
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("CV file is required");
    }

    // Validate file type
    $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($finfo, $_FILES['cv']['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime_type, $allowed_types)) {
        throw new Exception("Invalid file type. Only PDF, DOC, DOCX, XLS, and XLSX files are allowed.");
    }

    // Validate file size (5MB max)
    if ($_FILES['cv']['size'] > 5 * 1024 * 1024) {
        throw new Exception("File size exceeds 5MB limit");
    }

    // Sanitize input
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $contact_no = filter_var($_POST['contact_no'], FILTER_SANITIZE_STRING);
    $scope = filter_var($_POST['scope'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    // Handle CV file upload
    $upload_dir = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'cv' . DIRECTORY_SEPARATOR;
    if (!is_dir($upload_dir) && !mkdir($upload_dir, 0755, true)) {
        throw new Exception("Failed to create uploads directory");
    }

    $file_ext = pathinfo($_FILES['cv']['name'], PATHINFO_EXTENSION);
    $unique_name = uniqid('cv_', true) . '.' . $file_ext;
    $cv_url = 'uploads/cv/' . $unique_name;
    $full_path = $upload_dir . $unique_name;

    if (!move_uploaded_file($_FILES['cv']['tmp_name'], $full_path)) {
        throw new Exception("Error uploading CV file");
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO applications (name, email, contact_no, scope, message, cv_url) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $contact_no, $scope, $message, $cv_url);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception("Error saving application: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>