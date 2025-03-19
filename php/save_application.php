<?php
include '../config.php';
include 'db_config.php';

header('Content-Type: application/json');

try {
    // Validate input
    $required_fields = ['name', 'email', 'contact_no', 'scope', 'area', 'message'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Sanitize input
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $contact_no = filter_var($_POST['contact_no'], FILTER_SANITIZE_STRING);
    $scope = filter_var($_POST['scope'], FILTER_SANITIZE_STRING);
    $area = filter_var($_POST['area'], FILTER_SANITIZE_STRING);
    $other_area = isset($_POST['other_area']) ? filter_var($_POST['other_area'], FILTER_SANITIZE_STRING) : null;
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // If area is "Others", use the other_area value
    if ($area === 'Others' && $other_area) {
        $area = $other_area;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO applications (name, email, contact_no, scope, area_of_interest, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $contact_no, $scope, $area, $message);

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