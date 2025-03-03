<?php
// Include config to ensure BASE_URL is always available
include $_SERVER['DOCUMENT_ROOT'] . '/config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jan Sahbhagi Vikas Kendra (JSVK)</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css"> <!-- Link to header.css -->
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css"> <!-- Link to main stylesheet -->
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
</head>
<body>
    <header>
        <div class="header-container">
            <!-- Logo and Text -->
            <div class="logo-container">
                <div class="logo">
                    <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo">
                </div>
                <div class="header-text">
                    <h1>Jan Sahbhagi Vikas Kendra (JSVK)</h1>
                    <p>Empowering Communities, Transforming Lives</p>
                </div>
            </div>

            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav id="navbar">
                <ul>
                    <?php
                    $current_page = basename($_SERVER['SCRIPT_NAME']); // Get current file name
                    $pages = [
                        "index.php" => "Home",
                        "pages/about.php" => "About Us",
                        "pages/programs.php" => "Programs",
                        "pages/craft.php" => "Craft & Jute Creations",
                        "pages/make_difference.php" => "Make a Difference",
                        "pages/resources.php" => "Resources",
                        "pages/meet_team.php" => "Meet Our Team",
                        "pages/supporters.php" => "Our Supporters",
                        "pages/articles.php" => "Articles",
                        "pages/media_coverage.php" => "Media & Coverage",
                        "pages/impact.php" => "Our Impact",
                        "pages/financial_statement.php" => "Financial Statement",
                        "pages/annual_report.php" => "Annual Report",
                        "pages/policies.php" => "Policies"
                    ];

                    foreach ($pages as $file => $title) {
                        $active_class = ($current_page == basename($file)) ? 'class="active"' : '';
                        echo "<li><a href='" . BASE_URL . $file . "' $active_class>$title</a></li>";
                    }
                    ?>
                </ul>
            </nav>
        </div> 
    </header>

    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const hamburger = document.querySelector(".hamburger");
        const navbar = document.querySelector("#navbar");
        const navLinks = document.querySelectorAll("#navbar ul li a");

        hamburger.addEventListener("click", function() {
            navbar.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
            });
        });
    });
    </script>
</body>
</html>
