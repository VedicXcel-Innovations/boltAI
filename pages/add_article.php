<?php include '../config.php'; ?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>
<?php

// Start session
session_start();
// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Redirect to login page
    header("Location: " . BASE_URL . "pages/add_article.php");
    exit;
}

// Handle logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    // Log the logout activity
    require_once '../php/db_config.php';
    $admin_id = $_SESSION['admin_id'] ?? 'Admin';
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $activity = "Logout";
    $stmt = $conn->prepare("INSERT INTO admin_activity (admin_id, activity, ip_address) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $admin_id, $activity, $ip_address);
    $stmt->execute();
    $stmt->close();
    $conn->close();

    // Destroy session
    session_unset();
    session_destroy();

    // Redirect to login page
    header("Location: " . BASE_URL . "pages/add_article.php");
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Article</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
  <style>
    #loader {
        display: none;
        text-align: center;
        margin-top: 10px;
    }
</style>
<script>
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function () {
        document.getElementById("loader").style.display = "block"; // Show loader
        document.querySelector("button[type=submit]").disabled = true; // Disable button
    });
});
</script>
</head>
<body>
  <div class="container mt-5">
    <h1>Add Article</h1>
    <form action="save_article.php" method="post" enctype="multipart/form-data">
    <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" name="title" required>
    </div>
    <div class="mb-3">
        <label for="content" class="form-label">Content</label>
        <textarea class="form-control" id="content" name="content" rows="5" required></textarea>
    </div>
    <div class="mb-3">
        <label for="type" class="form-label">Type</label>
        <select class="form-select" id="type" name="type" required>
            <option value="article">Article</option>
            <option value="story">Story of Change</option>
            <option value="photo_gallery">Photo Gallery</option>
            <option value="video_gallery">Video Gallery</option>
            <option value="publication">Publication</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="media" class="form-label">Upload Media</label>
        <input type="file" class="form-control" id="media" name="media[]" multiple>
    </div>
    <button type="submit" class="btn btn-primary" onclick="this.form.submit();">Save Article</button>
    <div id="loader">
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <p>Processing... Please wait</p>
</div>
</form>
  </div>
    <script>
document.querySelector('form').addEventListener('submit', function(event) {
    console.log('Form submitted!');
    console.log('Title:', document.getElementById('title').value);
    console.log('Content:', document.getElementById('content').value);
    console.log('Type:', document.getElementById('type').value);
    console.log('Files:', document.getElementById('media').files);
});
</script>
</body>
</html>