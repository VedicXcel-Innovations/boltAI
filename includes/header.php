<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <meta name="googlebot" content="noindex, nofollow">
    <title>Gyan Deepak Foundation<?php echo isset($pageTitle) ? " | $pageTitle" : ""; ?></title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="shortcut icon" href="assets/favicon.ico">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet">
    <!-- Lightbox CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css">
    <!-- Lightbox JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js"></script>
</head>

<body>
    <header class="main-header">

        <!-- Header Top Band -->
        <div class="header-top" style="background-color: #521706;">

            <div class="header-top-content">
                <div class="header-location">
                    <i class="fa-solid fa-location-dot fa-lg" style="color: #db4437;"></i>
                    <span>Presence in Kolkata & Bihar</span>
                </div>

                <div class="header-contact">
                    <a href="tel:+918240629266">
                        <i class="fa-solid fa-phone-volume fa-beat fa-lg"></i>
                        <span>+91 82406 29266</span>
                    </a>
                    <a href="mailto:gyandeepak.ballygunge@gmail.com">
                        <i class="fa-solid fa-envelope fa-beat fa-lg"></i>
                        <span>gyandeepak.ballygunge@gmail.com</span>
                    </a>
                </div>

                <div class="header-social">
                    <a href="https://www.facebook.com/gyandeepakngo/" target="_blank" aria-label="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https:///www.instagram.com/gyandeepakngo" target="_blank" aria-label="Instagram">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/gyandeepakngo" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://wa.me/918240629266" target="_blank" aria-label="WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>

        </div>

        <div class="header-container">
            <!-- Logo Section -->
            <div class="logo-section">
                <a href="/" class="logo">
                    <img src="/assets/logo.gif" alt="Gyan Deepak Logo" class="logo-img">
                </a>
            </div>

            <!-- Mobile Menu Button with Animation -->
            <button class="mobile-menu-btn" aria-label="Toggle Menu">
                <span class="menu-icon">
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                </span>
            </button>

            <!-- Main Navigation -->
            <nav class="main-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="/" class="nav-link <?php echo empty($pageTitle) ? 'active' : ''; ?>">
                            <span class="nav-text">Home</span>
                        </a>
                    </li>

                    <!-- About Us with Dropdown -->
                    <li class="nav-item nav-dropdown">
                        <a href="/pages/about.php"
                            class="nav-link <?php echo (in_array($pageTitle, ['About Us', 'Our Team', 'Our Centers'])) ? 'active' : ''; ?>">
                            <span class="nav-text">About Us</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/pages/about.php#founder" class="dropdown-link">Founder's Message</a></li>
                            <li><a href="/pages/about.php#vision" class="dropdown-link">Mission & Vision</a></li>
                            <li><a href="/pages/about.php#team" class="dropdown-link">Our Team</a></li>
                            <li><a href="/pages/about.php#centers" class="dropdown-link">Our Centers</a></li>
                        </ul>
                    </li>

                    <!-- Our Projects with Dropdown -->
                    <li class="nav-item nav-dropdown">
                        <a href="/pages/projects.php"
                            class="nav-link <?php echo (in_array($pageTitle, ['Our Projects', 'Women Empowerment', 'Holistic Development'])) ? 'active' : ''; ?>">
                            <span class="nav-text">Our Projects</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/pages/projects.php#education" class="dropdown-link">Education</a></li>
                            <li><a href="/pages/projects.php#women" class="dropdown-link">Women's Training</a></li>
                            <li><a href="/pages/projects.php#holistic" class="dropdown-link">Holistic Development</a>
                            </li>
                            <li><a href="/pages/projects.php#community" class="dropdown-link">Community Projects</a>
                            </li>
                        </ul>
                    </li>

                    <!-- Our Events -->
                    <li class="nav-item">
                        <a href="/pages/events.php"
                            class="nav-link <?php echo $pageTitle === 'Our Events' ? 'active' : ''; ?>">
                            <span class="nav-text">Our Events</span>
                        </a>
                    </li>

                    <!-- Get Involved with Dropdown -->
                    <li class="nav-item nav-dropdown">
                        <a href="/pages/get-involved.php"
                            class="nav-link <?php echo (in_array($pageTitle, ['Get Involved', 'Volunteer', 'Donate'])) ? 'active' : ''; ?>">
                            <span class="nav-text">Get Involved</span>
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/pages/get-involved.php#volunteer" class="dropdown-link">Volunteer</a></li>
                            <li><a href="/pages/get-involved.php#careers" class="dropdown-link">Careers</a></li>
                            <li><a href="/pages/get-involved.php#donate" class="dropdown-link">Donate</a></li>
                        </ul>
                    </li>

                    <!-- Gallery -->
                    <li class="nav-item">
                        <a href="/pages/gallery.php"
                            class="nav-link <?php echo $pageTitle === 'Gallery' ? 'active' : ''; ?>">
                            <span class="nav-text">Gallery</span>
                        </a>
                    </li>

                    <!-- Contact -->
                    <li class="nav-item">
                        <a href="/pages/contact.php"
                            class="nav-link <?php echo $pageTitle === 'Contact' ? 'active' : ''; ?>">
                            <span class="nav-text">Contact</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- CTA Button -->
            <div class="header-cta">
                <a href="/pages/donate.php" class="btn btn-primary">
                    <span class="cta-icon"><i class="fas fa-hand-holding-heart"></i></span>
                    <span class="cta-text">Donate Now</span>
                </a>
            </div>
        </div>
    </header>
</body>