<?php include '../config.php'; ?>
<?php

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
    // Redirect to login page
    header("Location: " . BASE_URL . "pages/admin.php");
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
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

// Get admin ID
$admin_id = $_SESSION['admin_id'] ?? 'Admin';

// Include database connection
require_once '../php/db_config.php';

// Log login activity if this is a new session
if (!isset($_SESSION['login_logged'])) {
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $activity = "Login";
    $stmt = $conn->prepare("INSERT INTO admin_activity (admin_id, activity, ip_address) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $admin_id, $activity, $ip_address);
    $stmt->execute();
    $stmt->close();

    // Mark that we've logged this login
    $_SESSION['login_logged'] = true;
}

try {
    // Query to get the count of products
    $products_query = "SELECT COUNT(*) as count FROM products";
    $products_result = $conn->query($products_query);
    $products_count = $products_result->fetch_assoc()['count'];

    // Query to get the count of team members
    $team_members_query = "SELECT COUNT(*) as count FROM team_members";
    $team_members_result = $conn->query($team_members_query);
    $team_members_count = $team_members_result->fetch_assoc()['count'];

    // Query to get the count of supporters
    $supporters_query = "SELECT COUNT(*) as count FROM supporters";
    $supporters_result = $conn->query($supporters_query);
    $supporters_count = $supporters_result->fetch_assoc()['count'];

    // Query to get the count of articles
    $articles_query = "SELECT COUNT(*) as count FROM articles";
    $articles_result = $conn->query($articles_query);
    $articles_count = $articles_result->fetch_assoc()['count'];

    // Query to get the count of media coverage
    $media_coverage_query = "SELECT COUNT(*) as count FROM media_coverage";
    $media_coverage_result = $conn->query($media_coverage_query);
    $media_coverage_count = $media_coverage_result->fetch_assoc()['count'];

    // Store counts in an array
    $stats = [
        'products' => $products_count,
        'team_members' => $team_members_count,
        'supporters' => $supporters_count,
        'articles' => $articles_count,
        'media_coverage' => $media_coverage_count,
    ];
} catch (Exception $e) {
    // Handle errors
    error_log("Error fetching stats: " . $e->getMessage());
    $stats = [
        'products' => 0,
        'team_members' => 0,
        'supporters' => 0,
        'articles' => 0,
        'media_coverage' => 0,
    ];
}

// Get recent activity (last 5 only)
$activities = [];
$query = "SELECT * FROM admin_activity ORDER BY timestamp DESC LIMIT 5";

// Check if the admin_activity table exists
$check_table = $conn->query("SHOW TABLES LIKE 'admin_activity'");

if ($check_table->num_rows == 0) {
    die("❌ Error: admin_activity table does not exist. Please create it first.");
}

$result = $conn->query($query);
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $activities[] = $row;
    }
}

$conn->close();

// Function to format timestamp to IST
function formatTimestampToIST($timestamp)
{
    $date = new DateTime($timestamp, new DateTimeZone('Asia/Kolkata'));
    return $date->format('d M Y, h:i A') . ' IST';
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - JSVK</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/admin.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/dynamic.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .toggle-sidebar {
            display: none !important;
        }

        .logo {
            position: absolute;
            left: 1rem;
        }

        .stats-row {
            display: flex;
            flex-wrap: nowrap;
            margin: 0 -0.75rem;
        }

        .stats-row>div {
            flex: 1;
            padding: 0 0.75rem;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .toggle-sidebar {
                display: flex !important;
            }

            .logo {
                position: static;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            .stats-row {
                flex-wrap: wrap;
                flex-direction: column;
                margin: 0;
            }

            .stats-row>div {
                width: 100%;
                padding: 0 0;
                margin-bottom: 1rem;
            }
        }
    </style>
</head>

<body>
    <header class="dashboard-header">
        <div class="d-flex align-items-center">
            <button class="toggle-sidebar me-3" style="background: none; border: none; color: white; cursor: pointer;">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <div class="d-flex align-items-center">
            <div class="logo">
                <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo"
                    style="max-width: 40px; margin-left: 20px; margin-right: 10px;">
                <div class="header-text">
                    <h1 style="margin: 0; font-size: 1.2rem;">JSVK Admin Dashboard</h1>
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <!-- <div class="me-3">
                <i class="fas fa-user-circle me-1"></i> <?= htmlspecialchars($admin_id) ?>
            </div> -->
            <a href="?action=logout" class="btn btn-outline btn-sm"
                style="padding: 0.4rem 0.8rem; font-size: 0.9rem; margin-left: 1rem; margin-right: 1rem;">
                <i class="fas fa-sign-out-alt"></i>Logout
            </a>
        </div>
    </header>

    <div class="dashboard-sidebar">
        <ul>
            <li><a href="<?= $_SERVER['PHP_SELF']; ?>" class="active"><i class="fas fa-home"></i>
                    Dashboard</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_products.php"><i class="fas fa-wrench"></i>
                    Manage Products</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_team_members.php"><i class="fas fa-users"></i> Manage
                    Team</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_supporters.php"><i class="fas fa-hands-helping"></i>
                    Manage Supporters</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_article.php"><i class="fas fa-image"></i>
                    Manage Articles</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_media_coverage.php"><i class="fas fa-newspaper"></i> Manage
                    Media</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_applications.php"><i class="fas fa-user-tie"></i> Manage
                    Applications</a></li>
            <li><a href="<?= BASE_URL ?>index.php"><i class="fas fa-external-link-alt"></i> View
                    Website</a></li>
            <li><a href="?action=logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
    </div>

    <div class="dashboard-content">
        <div class="welcome-message">
            <h2>Welcome, <?= htmlspecialchars($admin_id) ?>!</h2>
            <p>You are logged in to the JSVK Admin Dashboard. Here you can manage website content, teams and more.
            </p>
        </div>

        <h2 class="mb-4">Overview</h2>

        <div class="stats-row mb-4">
            <div>
                <div class="dashboard-card stat-card">
                    <i class="fas fa-box"></i>
                    <div class="stat-value"><?= $stats['products'] ?></div>
                    <div class="stat-label">Products</div>
                </div>
            </div>
            <div>
                <div class="dashboard-card stat-card">
                    <i class="fas fa-users"></i>
                    <div class="stat-value"><?= $stats['team_members'] ?></div>
                    <div class="stat-label">Team Members</div>
                </div>
            </div>
            <div>
                <div class="dashboard-card stat-card">
                    <i class="fas fa-hands-helping"></i>
                    <div class="stat-value"><?= $stats['supporters'] ?></div>
                    <div class="stat-label">Supporters</div>
                </div>
            </div>
            <div>
                <div class="dashboard-card stat-card">
                    <i class="fas fa-newspaper"></i>
                    <div class="stat-value"><?= $stats['articles'] ?></div>
                    <div class="stat-label">Articles</div>
                </div>
            </div>
            <div>
                <div class="dashboard-card stat-card">
                    <i class="fas fa-bullhorn"></i>
                    <div class="stat-value"><?= $stats['media_coverage'] ?></div>
                    <div class="stat-label">Media</div>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <h3 class="mb-3">Quick Actions</h3>
            <div class="d-flex flex-wrap gap-3">
                <a href="add_product.php" class="btn btn-primary"><i class="fas fa-plus"></i> Add Product</a>
                <a href="add_team_member.php" class="btn btn-primary"><i class="fas fa-plus"></i> Add Team Member</a>
                <a href="add_supporter.php" class="btn btn-primary"><i class="fas fa-plus"></i> Add Supporter</a>
                <a href="add_article.php" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add Article
                </a>
                <a href="add_media_coverage.php" class="btn btn-primary"><i class="fas fa-plus"></i> Add Media</a>
            </div>
        </div>

        <!-- <div class="dashboard-card recent-activity">
            <h3 class="mb-3">Recent Activity</h3>
            <?php if (empty($activities)): ?>
                <p>No recent activity found.</p>
            <?php else: ?>
                <?php foreach ($activities as $activity): ?>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas <?= $activity['activity'] === 'Login' ? 'fa-sign-in-alt' : 'fa-sign-out-alt' ?>"></i>
                        </div>
                        <div class="activity-content">
                            <div><?= htmlspecialchars($activity['admin_id']) ?>         <?= strtolower($activity['activity']) ?></div>
                            <div class="activity-time">
                                <?= formatTimestampToIST($activity['timestamp']) ?> | IP:
                                <?= htmlspecialchars($activity['ip_address']) ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div> -->
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            // Mobile sidebar toggle
            const toggleSidebar = document.querySelector('.toggle-sidebar');
            const sidebar = document.querySelector('.dashboard-sidebar');

            if (toggleSidebar) {
                toggleSidebar.addEventListener('click', function () {
                    sidebar.classList.toggle('active');
                });
            }

            // Handle window resize
            window.addEventListener('resize', function () {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('active');
                }
            });
        });
    </script>
</body>

</html>