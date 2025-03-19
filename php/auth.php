<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Check if user is logged in
 * 
 * @return bool True if user is logged in, false otherwise
 */
function isLoggedIn()
{
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

/**
 * Require login to access a page
 * Redirects to login page if not logged in
 */
function requireLogin()
{
    if (!isLoggedIn()) {
        // Get base URL from config
        require_once __DIR__ . '/../config.php';

        // Redirect to login page
        header("Location: " . BASE_URL . "pages/admin.php");
        exit;
    }
}

/**
 * Log out the current user
 */
function logout()
{
    // Destroy session
    session_unset();
    session_destroy();

    // Get base URL from config
    require_once __DIR__ . '/../config.php';

    // Redirect to login page
    header("Location: " . BASE_URL . "pages/admin.php");
    exit;
}

/**
 * Get current admin ID
 * 
 * @return string|null Admin ID if logged in, null otherwise
 */
function getCurrentAdminId()
{
    return $_SESSION['admin_id'] ?? null;
}