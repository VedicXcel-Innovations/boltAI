<?php include '../config.php'; ?>
<?php
// Start session
session_start();

// Check if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    // Redirect to dashboard
    header("Location: " . BASE_URL . "pages/dashboard.php");
    exit;
}

// Process login form
$error_message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once '../php/db_config.php';

    // Get form data
    $admin_id = $_POST['admin_id'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validate input
    if (empty($admin_id) || empty($password)) {
        $error_message = "Please enter both ID and password.";
    } else {
        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT id, password FROM admin_login WHERE id = ?");
        $stmt->bind_param("s", $admin_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            // Verify password
            if (password_verify($password, $row['password'])) {
                // Set session variables
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $row['id'];

                // Redirect to dashboard
                header("Location: " . BASE_URL . "pages/dashboard.php");
                exit;
            } else {
                $error_message = "Invalid password.";
            }
        } else {
            $error_message = "Invalid admin ID.";
        }

        $stmt->close();
    }

    $conn->close();
}
?>

<?php include '../templates/header.php'; ?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Admin Login</h1>
            <p>Secure access to JSVK administration panel</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="row">
                <div class="col-12 col-sm-6 offset-sm-3">
                    <div class="card shadow p-4">
                        <h2 class="text-center mb-4">Login</h2>

                        <?php if (!empty($error_message)): ?>
                            <div class="alert bg-accent text-white p-3 mb-4 rounded">
                                <?php echo $error_message; ?>
                            </div>
                        <?php endif; ?>

                        <form method="POST" action="admin.php">
                            <div class="form-group mb-3 d-flex justify-content-center">
                                <div style="width: 50%;">
                                    <label for="admin_id" class="form-label">Enter your ID</label>
                                    <input type="text" id="admin_id" name="admin_id" class="form-control" required>
                                </div>
                            </div>

                            <div class="form-group mb-4 d-flex justify-content-center">
                                <div style="width: 50%;">
                                    <label for="password" class="form-label">Enter your Password</label>
                                    <input type="password" id="password" name="password" class="form-control" required>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn btn-primary" style="width: 50%;">Login</button>
                            </div>
                        </form>

                        <div class="mt-4 text-center">
                            <a href="<?= BASE_URL ?>index.php">Return to Homepage</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<?php include '../templates/footer.php'; ?>