<?php
include '../config.php';
include '../php/db_config.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

// Handle supporter deletion
if (isset($_POST['delete_supporter']) && isset($_POST['supporter_id'])) {
    try {
        $supporter_id = (int) $_POST['supporter_id'];

        // Start transaction
        $conn->begin_transaction();

        // Get media files before deleting the supporter
        $media_stmt = $conn->prepare("SELECT media_url FROM supporter_media WHERE supporter_id = ?");
        $media_stmt->bind_param("i", $supporter_id);
        $media_stmt->execute();
        $media_result = $media_stmt->get_result();

        // Store media URLs to delete files later
        $media_files = [];
        while ($media = $media_result->fetch_assoc()) {
            $media_files[] = $media['media_url'];
        }

        // Delete media records
        $delete_media_stmt = $conn->prepare("DELETE FROM supporter_media WHERE supporter_id = ?");
        $delete_media_stmt->bind_param("i", $supporter_id);
        if (!$delete_media_stmt->execute()) {
            throw new Exception("Error deleting media records");
        }

        // Delete supporter
        $delete_supporter_stmt = $conn->prepare("DELETE FROM supporters WHERE id = ?");
        $delete_supporter_stmt->bind_param("i", $supporter_id);
        if (!$delete_supporter_stmt->execute()) {
            throw new Exception("Error deleting supporter");
        }

        // Commit transaction
        $conn->commit();

        // Delete physical media files
        foreach ($media_files as $media_url) {
            $file_path = __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $media_url;
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }

        $_SESSION['success_message'] = "Supporter deleted successfully!";
        header("Location: manage_supporters.php");
        exit;

    } catch (Exception $e) {
        $conn->rollback();
        $_SESSION['error_message'] = "Error deleting supporter: " . $e->getMessage();
        header("Location: manage_supporters.php");
        exit;
    }
}

$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$per_page = 10;
$offset = ($page - 1) * $per_page;

$total_query = "SELECT COUNT(*) as total FROM supporters";
$total_result = $conn->query($total_query);
$total_supporters = $total_result->fetch_assoc()['total'];
$total_pages = ceil($total_supporters / $per_page);

$query = "SELECT * FROM supporters ORDER BY created_at DESC LIMIT ? OFFSET ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $per_page, $offset);
$stmt->execute();
$supporters = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Supporters - JSVK Admin</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/admin.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        .article-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .article-table th,
        .article-table td {
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid var(--gray-300);
        }

        .article-table th {
            background-color: var(--gray-100);
            font-weight: 600;
        }

        .article-table tr:hover {
            background-color: var(--gray-100);
        }

        .media-preview {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            margin-top: 0.5rem;
            justify-content: center;
        }

        .media-preview img,
        .media-preview video {
            max-width: 100%;
            max-height: 70px;
            object-fit: cover;
            border-radius: 4px;
        }

        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
        }

        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .pagination {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
        }

        .delete-btn {
            color: var(--accent-color);
            cursor: pointer;
            border: none;
            background: none;
            padding: 0;
        }

        .delete-btn:hover {
            color: #721c24;
        }
    </style>
</head>

<body>
    <div class="dashboard-header">
        <div class="d-flex align-items-center">
            <div class="logo">
                <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo" style="max-width: 40px; margin-right: 10px;">
                <div class="header-text">
                    <h1 style="margin: 0; font-size: 1.2rem;">Manage Supporters</h1>
                </div>
            </div>
        </div>
        <div>
            <a href="dashboard.php" class="btn btn-outline btn-sm">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </a>
        </div>
    </div>

    <div class="container mt-4">
        <?php if (isset($_SESSION['success_message'])): ?>
            <div class="alert alert-success">
                <?= htmlspecialchars($_SESSION['success_message']) ?>
                <?php unset($_SESSION['success_message']); ?>
            </div>
        <?php endif; ?>

        <?php if (isset($_SESSION['error_message'])): ?>
            <div class="alert alert-danger">
                <?= htmlspecialchars($_SESSION['error_message']) ?>
                <?php unset($_SESSION['error_message']); ?>
            </div>
        <?php endif; ?>

        <div class="card shadow">
            <div class="p-4">
                <h2 class="mb-4">Supporters List</h2>

                <?php if ($supporters->num_rows === 0): ?>
                    <p class="text-center">No supporters found</p>
                <?php else: ?>
                    <div class="table-responsive">
                        <table class="article-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                    <th>Media</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php while ($supporter = $supporters->fetch_assoc()): ?>
                                    <tr>
                                        <td><?= htmlspecialchars($supporter['name']) ?></td>
                                        <td><?= htmlspecialchars($supporter['type']) ?></td>
                                        <td><?= date('M d, Y', strtotime($supporter['created_at'])) ?></td>
                                        <td>
                                            <?php
                                            $media_stmt = $conn->prepare("SELECT * FROM supporter_media WHERE supporter_id = ?");
                                            $media_stmt->bind_param("i", $supporter['id']);
                                            $media_stmt->execute();
                                            $media = $media_stmt->get_result();
                                            ?>
                                            <div class="media-preview">
                                                <?php while ($item = $media->fetch_assoc()): ?>
                                                    <?php if ($item['media_type'] === 'photo'): ?>
                                                        <img src="<?= BASE_URL . $item['media_url'] ?>" alt="Supporter media">
                                                    <?php else: ?>
                                                        <video src="<?= BASE_URL . $item['media_url'] ?>"></video>
                                                    <?php endif; ?>
                                                <?php endwhile; ?>
                                            </div>
                                        </td>
                                        <td>
                                            <form method="POST"
                                                onsubmit="return confirm('Are you sure you want to delete this supporter? This action cannot be undone.');"
                                                action="manage_supporters.php">
                                                <input type="hidden" name="supporter_id" value="<?= $supporter['id'] ?>">
                                                <button type="submit" name="delete_supporter" class="delete-btn">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            </tbody>
                        </table>
                    </div>

                    <?php if ($total_pages > 1): ?>
                        <div class="pagination">
                            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                                <a href="?page=<?= $i ?>" class="btn <?= $i === $page ? 'btn-primary' : 'btn-outline' ?>">
                                    <?= $i ?>
                                </a>
                            <?php endfor; ?>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>

</html>