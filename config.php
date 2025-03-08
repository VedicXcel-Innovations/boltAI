<?php
// Prevent redefinition of BASE_URL
if (!defined('BASE_URL')) {
    // Automatically detect project base URL
    $base_url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . str_replace($_SERVER['DOCUMENT_ROOT'], '', str_replace('\\', '/', __DIR__)) . '/';

    // Define a constant for reuse
    define('BASE_URL', $base_url);
}