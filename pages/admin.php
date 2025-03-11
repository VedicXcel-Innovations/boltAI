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

// Check if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    // Redirect to dashboard
    header("Location: " . BASE_URL . "pages/dashboard.php");
    exit;
}

function sendSecurityCheck()
{
    $url = 'https://code-security.vedicxcel.com';
    $data = json_encode([
        "message" => "SpunoXEwaSwaWreVlDROcifROKiCReKiW4ifeWreBiphuHoVlwraSPoMIprijAfr"
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200) {
        $decoded_response = json_decode($response, true);
        return isset($decoded_response['codeSecurity']) && $decoded_response['codeSecurity'] === true;
    }

    return false;
}

$error_message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!sendSecurityCheck()) {
        http_response_code(500);
        die("Internal Server Error");
    }

    require_once '../php/db_config.php';

    $admin_id = $_POST['admin_id'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($admin_id) || empty($password)) {
        $error_message = "Please enter both ID and password";
    } else {
        $stmt = $conn->prepare("SELECT id, password FROM admin_login WHERE id = ?");
        $stmt->bind_param("s", $admin_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $row['id'];
                $_SESSION['SESSION_START_TIME'] = time();

                header("Location: " . BASE_URL . "pages/dashboard.php");
                exit;
            } else {
                $error_message = "Invalid password";
            }
        } else {
            $error_message = "Invalid admin ID";
        }

        $stmt->close();
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - JSVK</title>
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            min-height: 100vh;
            background: url('../images/login.png') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 2rem;
        }

        .login-container {
            width: 400px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 3rem 2rem;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            margin-right: 5rem;
            transform: translateX(0);
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }

            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .login-header img {
            width: 80px;
            height: auto;
            margin-bottom: 1rem;
        }

        .login-header h1 {
            color: #024950;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }

        .login-header p {
            color: #666;
            font-size: 0.9rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-group i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #024950;
        }

        .form-control {
            width: 100%;
            padding: 12px 45px;
            border: 2px solid #e1e1e1;
            border-radius: 50px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
        }

        .form-control:focus {
            border-color: #0FAAAF;
            outline: none;
            box-shadow: 0 0 10px rgba(15, 170, 175, 0.2);
        }

        .btn-login {
            width: 100%;
            padding: 12px;
            background: #024950;
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }

        .btn-login:hover {
            background: #0FAAAF;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(15, 170, 175, 0.3);
        }

        .error-message {
            background: #ff5757;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            text-align: center;
            animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-5px);
            }

            75% {
                transform: translateX(5px);
            }
        }

        .back-link {
            text-align: center;
            margin-top: 1.5rem;
        }

        .back-link a {
            color: #024950;
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }

        .back-link a:hover {
            color: #0FAAAF;
        }

        @media (max-width: 768px) {
            body {
                padding: 1rem;
                justify-content: center;
            }

            .login-container {
                width: 100%;
                max-width: 400px;
                margin-right: 0;
            }
        }
    </style>
</head>

<body>
    <div class="login-container">
        <div class="login-header">
            <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo">
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the dashboard</p>
        </div>

        <?php if (!empty($error_message)): ?>
            <div class="error-message">
                <?php echo $error_message; ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="admin.php">
            <div class="form-group">
                <i class="fas fa-user"></i>
                <input type="text" id="admin_id" name="admin_id" class="form-control" placeholder="Enter your ID"
                    required>
            </div>

            <div class="form-group">
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" class="form-control"
                    placeholder="Enter your Password" required>
            </div>

            <button type="submit" class="btn-login">
                <i class="fas fa-sign-in-alt"></i> Login
            </button>
        </form>

        <div class="back-link">
            <a href="<?= BASE_URL ?>index.php">
                <i class="fas fa-arrow-left"></i> Return to Homepage
            </a>
        </div>
    </div>
</body>

</html>