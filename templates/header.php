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
    <link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/forms.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <header>
        <div class="header-container">
            <!-- Logo and Text -->
            <div class="logo-container">
                <div class="logo">
                    <img src="<?= BASE_URL ?>images/logo.png" alt="JSVK Logo">
                    <div class="header-text">
                        <h1>Jan Sahbhagi Vikas Kendra</h1>
                        <p>Empowering Communities, Transforming Lives</p>
                    </div>
                </div>

                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <nav id="navbar">
                <ul>
                    <?php
                    $current_page = basename($_SERVER['SCRIPT_NAME']); // Get current file name
                    
                    // Define main menu items
                    $main_menu = [
                        "index.php" => ["name" => "Home", "icon" => "fa-home"],
                        "about" => [
                            "name" => "About Us",
                            "icon" => "fa-info-circle",
                            "submenu" => [
                                "pages/about.php" => "Overview",
                                "pages/meet_team.php" => "Meet Our Team",
                                "pages/impact.php" => "Our Impact"
                            ]
                        ],
                        "programs" => [
                            "name" => "Programs",
                            "icon" => "fa-project-diagram",
                            "submenu" => [
                                "pages/programs.php" => "All Programs"
                            ]
                        ],
                        "pages/craft.php" => ["name" => "Craft & Jute Creations", "icon" => "fa-hands-helping"],
                        "pages/make_difference.php" => ["name" => "Make a Difference", "icon" => "fa-hand-holding-heart"],
                        "resources" => [
                            "name" => "Resources",
                            "icon" => "fa-file-alt",
                            "submenu" => [
                                "pages/resources.php" => "All Resources",
                                "pages/articles.php" => "Articles",
                                "pages/media_coverage.php" => "Media & Coverage",
                                "pages/annual_report.php" => "Annual Report",
                                "pages/financial_statement.php" => "Financial Statement",
                                "pages/policies.php" => "Policies"
                            ]
                        ],
                        "pages/supporters.php" => ["name" => "Our Supporters", "icon" => "fa-users"]
                    ];

                    foreach ($main_menu as $key => $item) {
                        if (isset($item['submenu'])) {
                            // This is a dropdown menu
                            $is_active = false;
                            foreach ($item['submenu'] as $subpage => $subname) {
                                if (basename($subpage) == $current_page) {
                                    $is_active = true;
                                    break;
                                }
                            }

                            $active_class = $is_active ? 'class="active dropdown"' : 'class="dropdown"';
                            echo "<li $active_class>";
                            echo "<a href='#'><i class='fas {$item['icon']}'></i> {$item['name']} <i class='fas fa-chevron-down'></i></a>";
                            echo "<div class='dropdown-content'>";

                            foreach ($item['submenu'] as $subpage => $subname) {
                                $sub_active = (basename($subpage) == $current_page) ? 'class="active"' : '';
                                echo "<a href='" . BASE_URL . $subpage . "' $sub_active>$subname</a>";
                            }

                            echo "</div>";
                            echo "</li>";
                        } else {
                            // This is a regular menu item
                            $link = is_numeric($key) ? $item['name'] : $key;
                            $active_class = (basename($link) == $current_page) ? 'class="active"' : '';
                            echo "<li><a href='" . BASE_URL . $link . "' $active_class><i class='fas {$item['icon']}'></i> {$item['name']}</a></li>";
                        }
                    }
                    ?>
                </ul>
            </nav>
        </div>
    </header>

    <div class="menu-overlay"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const hamburger = document.querySelector(".hamburger");
            const navbar = document.querySelector("#navbar");
            const overlay = document.querySelector(".menu-overlay");
            const dropdowns = document.querySelectorAll(".dropdown");

            // Toggle mobile menu
            hamburger.addEventListener("click", function () {
                hamburger.classList.toggle("active");
                navbar.classList.toggle("active");
                overlay.classList.toggle("active");
                document.body.classList.toggle("menu-open");
            });

            // Close menu when clicking overlay
            overlay.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navbar.classList.remove("active");
                overlay.classList.remove("active");
                document.body.classList.remove("menu-open");
            });

            // Handle dropdown menus on mobile
            if (window.innerWidth <= 768) {
                dropdowns.forEach(dropdown => {
                    const dropdownLink = dropdown.querySelector('a');
                    dropdownLink.addEventListener('click', function (e) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    });
                });
            }

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    if (this.getAttribute('href') !== '#') {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            window.scrollTo({
                                top: target.offsetTop - 100,
                                behavior: 'smooth'
                            });

                            // Close mobile menu if open
                            hamburger.classList.remove("active");
                            navbar.classList.remove("active");
                            overlay.classList.remove("active");
                        }
                    }
                });
            });

            // Header scroll effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        });
    </script>