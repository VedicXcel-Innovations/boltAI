<?php
$message = isset($_GET['message']) ? $_GET['message'] : "Operation completed successfully!";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center">
        <h2 class="text-success">✅ Success!</h2>
        <p><?php echo htmlspecialchars($message); ?></p>
        <a href="dashboard.php" class="btn btn-primary">Go Back to Dashboard</a>
    </div>
</body>
</html>