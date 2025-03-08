<?php
include '../config.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

$message = isset($_GET['message']) ? $_GET['message'] : "Operation completed successfully!";
$isError = isset($_GET['error']) && $_GET['error'] == 1;
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $isError ? 'Error' : 'Success' ?> - JSVK Admin</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/admin.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        .result-container {
            max-width: 500px;
            margin: 2rem auto;
            padding: 2rem;
            background: var(--white);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            text-align: center;
        }

        .icon-container {
            font-size: 4rem;
            margin-bottom: 1rem;
            color:
                <?= $isError ? 'var(--accent-color)' : 'var(--secondary-color)' ?>
            ;
        }

        .message {
            margin: 1.5rem 0;
            color: var(--dark-color);
            font-size: 1.1rem;
        }

        .actions {
            margin-top: 2rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
    </style>
</head>

<body>
    <div class="dashboard-header">
        <div class="d-flex align-items-center">
            <div class="logo">
                <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo" style="max-width: 40px; margin-right: 10px;">
                <div class="header-text">
                    <h1 style="margin: 0; font-size: 1.2rem;">JSVK Admin</h1>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="result-container">
            <div class="icon-container">
                <i class="fas <?= $isError ? 'fa-times-circle' : 'fa-check-circle' ?>"></i>
            </div>
            <h2><?= $isError ? 'Error' : 'Success!' ?></h2>
            <div class="message">
                <?= htmlspecialchars($message) ?>
            </div>
            <div class="actions">
                <a href="dashboard.php" class="btn btn-primary">
                    <i class="fas fa-home"></i> Back to Dashboard
                </a>
                <?php if (!$isError): ?>
                    <a href="add_article.php" class="btn btn-outline">
                        <i class="fas fa-plus"></i> Add Another Article
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>

</html>