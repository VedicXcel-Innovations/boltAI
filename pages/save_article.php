<?php
include '../config.php';
include '../php/db_config.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Request Method: " . $_SERVER['REQUEST_METHOD'] . "<br>";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: add_article.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $title = $_POST['title'];
    $content = $_POST['content'];
    $type = $_POST['type'];

    if ($conn->connect_error) {
        die("Database connection failed: " . $conn->connect_error);
    }

    // Insert article into the articles table
    $stmt = $conn->prepare("INSERT INTO articles (title, content, type) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $type);
    print_r($_FILES);
    if ($stmt->execute()) {
        $article_id = $stmt->insert_id; // Get the newly inserted article's ID
        echo "Article added successfully! Article ID: $article_id<br>";

        // Handle media uploads
        if (!empty($_FILES['media']['name'][0])) {
            $upload_dir = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
            
            if (!is_dir($upload_dir) && !mkdir($upload_dir, 0755, true)) {
                die("Failed to create uploads directory.");
            }

            foreach ($_FILES['media']['tmp_name'] as $key => $tmp_name) {
                 $media_ext = pathinfo($_FILES['media']['name'][$key], PATHINFO_EXTENSION);
                 $unique_name = uniqid('media_', true) . '.' . $media_ext;
                 $media_url = $upload_dir . $unique_name;
                 $media_type = strpos($_FILES['media']['type'][$key], 'image') !== false ? 'photo' : 'video';

                if (move_uploaded_file($tmp_name, $media_url)) {
                    // Insert media record into media table
                    $stmt = $conn->prepare("INSERT INTO media_article (article_id, media_url, media_type) VALUES (?, ?, ?)");
                    $stmt->bind_param("iss", $article_id, $media_url, $media_type);

                    if ($stmt->execute()) {
                        echo "Media '$unique_name' uploaded successfully!<br>";
                         echo "📂 Saved at: " . realpath($media_url) . "<br>";
                    } else {
                        echo "Error inserting media record into database.<br>";
                    }
                } else {
                    echo "Error moving uploaded file '$media_name'.<br>";
                }
            }
        }
//         header("Location: success.php?message=Article added successfully!");
        exit;
    } else {
        echo "Error adding article: " . $stmt->error;
    }
} else {
    echo "Invalid request method.";
}
?>
