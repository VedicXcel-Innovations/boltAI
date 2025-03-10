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
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .dashboard-header {
            background-color: var(--primary-color);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--white);
        }

        .dashboard-sidebar {
            width: 250px;
            background-color: var(--dark-color);
            color: var(--white);
            height: calc(100vh - 70px);
            position: fixed;
            left: 0;
            top: 70px;
            padding: 2rem 0;
            overflow-y: auto;
        }

        .dashboard-sidebar ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .dashboard-sidebar li {
            margin-bottom: 0;
        }

        .dashboard-sidebar a {
            display: block;
            padding: 0.75rem 1.5rem;
            color: var(--light-color);
            text-decoration: none;
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
        }

        .dashboard-sidebar a:hover,
        .dashboard-sidebar a.active {
            background-color: rgba(255, 255, 255, 0.1);
            color: var(--white);
            border-left-color: var(--secondary-color);
        }

        .dashboard-sidebar i {
            margin-right: 10px;
            width: 20px;
            text-align: center;
        }

        .dashboard-content {
            margin-left: 250px;
            padding: 2rem;
            min-height: calc(100vh - 70px);
            background-color: var(--gray-100);
        }

        .dashboard-card {
            background-color: var(--white);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            transition: var(--transition);
        }

        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .stat-card {
            text-align: center;
            padding: 1.5rem;
        }

        .stat-card i {
            font-size: 2.5rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }

        .stat-card .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .stat-card .stat-label {
            font-size: 1rem;
            color: var(--gray-800);
        }

        .welcome-message {
            background-color: var(--secondary-color);
            color: var(--white);
            padding: 2rem;
            border-radius: var(--border-radius);
            margin-bottom: 2rem;
        }

        .recent-activity {
            margin-top: 2rem;
        }

        .activity-item {
            display: flex;
            align-items: center;
            padding: 1rem 0;
            border-bottom: 1px solid var(--gray-200);
        }

        .activity-item:last-child {
            border-bottom: none;
        }

        .activity-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--light-color);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            color: var(--primary-color);
        }

        .activity-content {
            flex: 1;
        }

        .activity-time {
            color: var(--gray-800);
            font-size: 0.85rem;
        }

        /* Mobile responsiveness */
        @media (max-width: 992px) {
            .dashboard-sidebar {
                width: 200px;
            }

            .dashboard-content {
                margin-left: 200px;
            }
        }

        @media (max-width: 768px) {
            .dashboard-sidebar {
                width: 0;
                z-index: 1000;
                transition: all 0.3s ease;
            }

            .dashboard-sidebar.active {
                width: 250px;
            }

            .dashboard-content {
                margin-left: 0;
            }

            .toggle-sidebar {
                display: block !important;
            }

            .stats-row {
                flex-wrap: wrap;
            }

            .stats-row>div {
                flex: 0 0 50%;
                max-width: 50%;
            }
        }

        @media (max-width: 576px) {
            .stats-row>div {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        /* Stats row for single line display */
        .stats-row {
            display: flex;
            flex-wrap: nowrap;
            margin: 0 -0.75rem;
        }

        .stats-row>div {
            flex: 1;
            padding: 0 0.75rem;
        }
    </style>
</head>

<body>
    <header class="dashboard-header">
        <div class="d-flex align-items-center">
            <button class="toggle-sidebar me-3 d-none"
                style="background: none; border: none; color: white; cursor: pointer;">
                <i class="fas fa-bars"></i>
            </button>
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
                style="padding: 0.4rem 0.8rem; font-size: 0.9rem; margin-left: 1rem;">
                <i class="fas fa-sign-out-alt"></i>Logout
            </a>
        </div>
    </header>

    <div class="dashboard-sidebar">
        <ul>
            <li><a href="<?= $_SERVER['PHP_SELF']; ?>" class="active"><i class="fas fa-tachometer-alt"></i>
                    Dashboard</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_products.php"><i class="fas fa-newspaper"></i>
                    Manage Products</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_team_members.php"><i class="fas fa-users"></i> Manage
                    Team</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_supporters.php"><i class="fas fa-hands-helping"></i>
                    Manage Supporters</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_article.php"><i class="fas fa-newspaper"></i>
                    Manage Articles</a></li>
            <li><a href="<?= BASE_URL ?>pages/manage_media_coverage.php"><i class="fas fa-image"></i> Manage
                    Media</a></li>

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