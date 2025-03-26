<?php
include '../config.php';
include '../php/db_config.php';

$session_lifetime = 24 * 60 * 60;

session_start();

if (isset($_SESSION['SESSION_START_TIME']) && (time() - $_SESSION['SESSION_START_TIME'] > $session_lifetime)) {
    session_unset();
    session_destroy();
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

// Handle application deletion
if (isset($_POST['delete_application']) && isset($_POST['application_id'])) {
    try {
        $application_id = (int) $_POST['application_id'];

        // Get CV file path before deleting
        $stmt = $conn->prepare("SELECT cv_url FROM applications WHERE id = ?");
        $stmt->bind_param("i", $application_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $cv_path = $result->fetch_assoc()['cv_url'];

        // Delete from database
        $stmt = $conn->prepare("DELETE FROM applications WHERE id = ?");
        $stmt->bind_param("i", $application_id);

        if ($stmt->execute()) {
            // Delete CV file if it exists
            if ($cv_path && file_exists($_SERVER['DOCUMENT_ROOT'] . '/' . $cv_path)) {
                unlink($_SERVER['DOCUMENT_ROOT'] . '/' . $cv_path);
            }
            $_SESSION['success_message'] = "Application deleted successfully!";
        } else {
            throw new Exception("Error deleting application");
        }

        header("Location: manage_applications.php");
        exit;

    } catch (Exception $e) {
        $_SESSION['error_message'] = "Error: " . $e->getMessage();
        header("Location: manage_applications.php");
        exit;
    }
}

// Fetch applications with pagination
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$per_page = 10;
$offset = ($page - 1) * $per_page;

$total_query = "SELECT COUNT(*) as total FROM applications";
$total_result = $conn->query($total_query);
$total_applications = $total_result->fetch_assoc()['total'];
$total_pages = ceil($total_applications / $per_page);

$query = "SELECT * FROM applications ORDER BY created_at DESC LIMIT ? OFFSET ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $per_page, $offset);
$stmt->execute();
$applications = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Applications - JSVK Admin</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/admin.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        .application-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .application-table th,
        .application-table td {
            padding: 1rem;
            text-align: center;
            border-bottom: 1px solid var(--gray-300);
        }

        .application-table th {
            background-color: var(--gray-100);
            font-weight: 600;
        }

        .application-table tr:hover {
            background-color: var(--gray-100);
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

        .badge {
            padding: 0.25rem 0.5rem;
            border-radius: 50px;
            font-size: 0.875rem;
        }

        .badge-volunteer {
            background-color: #e3f2fd;
            color: #1976d2;
        }

        .badge-career {
            background-color: #f3e5f5;
            color: #7b1fa2;
        }

        .filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .filter-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--gray-300);
            border-radius: 4px;
            background: var(--white);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-btn.active {
            background: var(--secondary-color);
            color: var(--white);
            border-color: var(--secondary-color);
        }

        .cv-link {
            color: var(--secondary-color);
            text-decoration: none;
        }

        .cv-link:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="dashboard-header">
        <div class="d-flex align-items-center">
            <div class="logo">
                <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo" style="max-width: 40px; margin-right: 10px;">
                <div class="header-text">
                    <h1 style="margin: 0; font-size: 1.2rem;">Manage Applications</h1>
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
                <h2 class="mb-4">Applications List</h2>

                <?php if ($applications->num_rows === 0): ?>
                    <p class="text-center">No applications found</p>
                <?php else: ?>
                    <div class="filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="Volunteer">Volunteer</button>
                        <button class="filter-btn" data-filter="Career">Career</button>
                    </div>

                    <div class="table-responsive">
                        <table class="application-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact No</th>
                                    <th>Scope</th>
                                    <th>CV</th>
                                    <th>Message</th>
                                    <th>Applied On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php while ($application = $applications->fetch_assoc()): ?>
                                    <tr data-scope="<?= htmlspecialchars($application['scope']) ?>">
                                        <td><?= htmlspecialchars($application['name']) ?></td>
                                        <td><?= htmlspecialchars($application['email']) ?></td>
                                        <td><?= htmlspecialchars($application['contact_no']) ?></td>
                                        <td>
                                            <span class="badge badge-<?= strtolower($application['scope']) ?>">
                                                <?= htmlspecialchars($application['scope']) ?>
                                            </span>
                                        </td>
                                        <td>
                                            <?php if ($application['cv_url']): ?>
                                                <a href="<?= BASE_URL . $application['cv_url'] ?>" class="cv-link" target="_blank">
                                                    <i class="fas fa-file-download"></i> Download</a>
                                            <?php else: ?>
                                                <span class="text-muted">No CV</span>
                                            <?php endif; ?>
                                        </td>
                                        <td><?= htmlspecialchars($application['message']) ?></td>
                                        <td><?= date('M d, Y', strtotime($application['created_at'])) ?></td>
                                        <td>
                                            <form method="POST"
                                                onsubmit="return confirm('Are you sure you want to delete this application? This action cannot be undone.');"
                                                action="manage_applications.php">
                                                <input type="hidden" name="application_id" value="<?= $application['id'] ?>">
                                                <button type="submit" name="delete_application" class="delete-btn">
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
                        <div class="pagination d-flex justify-content-center gap-2 mt-4">
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

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const applicationRows = document.querySelectorAll('.application-table tbody tr');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const filter = button.getAttribute('data-filter');

                    applicationRows.forEach(row => {
                        if (filter === 'all' || row.getAttribute('data-scope') === filter) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                });
            });
        });
    </script>
</body>

</html>