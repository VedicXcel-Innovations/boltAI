<?php
$pageTitle = "Home";
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-video">
        <video autoplay muted loop playsinline poster="/assets/images/hero-poster.jpg">
            <source src="/assets/videos/hero-video.mp4" type="video/mp4">
            <img src="/assets/images/hero-fallback.jpg" alt="Gyan Deepak Foundation">
        </video>
    </div>
    <div class="hero-content">
        <h1 class="hero-title">Empowering Children's Dreams</h1>
        <p class="hero-text">Join us in creating a world where every child has the opportunity to thrive, learn, and
            grow. Together, we can make a difference.</p>
        <div class="hero-buttons">
            <a href="/pages/donate.php" class="btn btn-primary">Make a Donation</a>
            <a href="/pages/about.php" class="btn btn-secondary">Learn More</a>
        </div>
    </div>
</section>

<!-- Impact Counter Section -->
<section class="impact-counter">
    <div class="container">
        <div class="impact-grid">
            <div class="impact-tile" data-count="2500000">
                <div class="tile-content">
                    <h3>2.5M+</h3>
                    <p>Children Impacted</p>
                </div>
            </div>
            <div class="impact-tile" data-count="850">
                <div class="tile-content">
                    <h3>850+</h3>
                    <p>Villages Reached</p>
                </div>
            </div>
            <div class="impact-tile" data-count="42">
                <div class="tile-content">
                    <h3>42</h3>
                    <p>Years of Service</p>
                </div>
            </div>
            <div class="impact-tile" data-count="19">
                <div class="tile-content">
                    <h3>19</h3>
                    <p>States Across India</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- About Section -->
<section class="about">
    <div class="container">
        <div class="about-content">
            <div class="about-text">
                <span class="section-subtitle">About US</span>
                <h2>Transforming Lives Through Child Rights</h2>
                <p>For over four decades, Gyan Deepak has been at the forefront of child rights advocacy in India. We
                    believe in
                    creating lasting change by addressing the root causes of issues affecting children's well-being.</p>
                <div class="about-features">
                    <div class="feature">
                        <i class="fas fa-graduation-cap"></i>
                        <h3>Education</h3>
                        <p>Ensuring quality education for every child</p>
                    </div>
                    <div class="feature">
                        <i class="fas fa-heart"></i>
                        <h3>Healthcare</h3>
                        <p>Providing essential healthcare services</p>
                    </div>
                    <div class="feature">
                        <i class="fas fa-shield-alt"></i>
                        <h3>Protection</h3>
                        <p>Safeguarding children's rights and safety</p>
                    </div>
                </div>
                <a href="/pages/about.php" class="btn btn-primary">Discover Our Story</a>
            </div>
            <div class="about-img">
                <img src="/assets/images/about-img.jpg" alt="About Gyan Deepak" loading="lazy">
            </div>
        </div>
    </div>
</section>

<!-- Campaigns Section -->
<section class="campaigns">
    <div class="container">
        <span class="section-subtitle">Our Initiatives</span>
        <h2 class="section-title">Current Campaigns</h2>
        <div class="campaign-grid">
            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-education.jpg" alt="Education for All" loading="lazy">
                    <div class="campaign-badge">Education</div>
                </div>
                <div class="campaign-info">
                    <h3>Education for All</h3>
                    <p>Supporting quality education for underprivileged children across India.</p>
                    <div class="campaign-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: 75%"></div>
                        </div>
                        <div class="progress-stats">
                            <span>₹15,00,000 raised</span>
                            <span>75%</span>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary btn-block">Support Now</a>
                </div>
            </div>

            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-health.jpg" alt="Healthy Childhood" loading="lazy">
                    <div class="campaign-badge">Healthcare</div>
                </div>
                <div class="campaign-info">
                    <h3>Healthy Childhood</h3>
                    <p>Ensuring proper healthcare and nutrition for children in need.</p>
                    <div class="campaign-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: 60%"></div>
                        </div>
                        <div class="progress-stats">
                            <span>₹12,00,000 raised</span>
                            <span>60%</span>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary btn-block">Support Now</a>
                </div>
            </div>

            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-protection.jpg" alt="Child Protection" loading="lazy">
                    <div class="campaign-badge">Protection</div>
                </div>
                <div class="campaign-info">
                    <h3>Child Protection</h3>
                    <p>Protecting children from abuse, exploitation and violence.</p>
                    <div class="campaign-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: 45%"></div>
                        </div>
                        <div class="progress-stats">
                            <span>₹9,00,000 raised</span>
                            <span>45%</span>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary btn-block">Support Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Call to Action Section (Donation) -->
<section class="cta-section">
    <div class="container">
        <div class="cta-content">
            <span class="section-subtitle">Make a Difference</span>
            <h2>Ready to Change Lives?</h2>
            <p>Your support can help us reach more children and create lasting change in their lives.</p>
            <div class="cta-buttons">
                <a href="/pages/donate.php" class="btn btn-primary">Donate Now</a>
                <a href="/pages/contact.php" class="btn btn-secondary">Contact Us</a>
            </div>
        </div>
    </div>
</section>

<!-- Latest Updates Section -->
<section class="updates-section">
    <div class="container">
        <span class="section-subtitle">Stay Informed</span>
        <h2 class="section-title">Latest Updates</h2>
        <div class="updates-grid">
            <div class="update-card">
                <div class="update-img">
                    <img src="/assets/images/update1.jpg" alt="Latest Update" loading="lazy">
                </div>
                <div class="update-content">
                    <span class="update-date">June 15, 2023</span>
                    <h3>New Education Center Opens in Rural Maharashtra</h3>
                    <p>Bringing quality education to 200+ children in remote villages.</p>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            <div class="update-card">
                <div class="update-img">
                    <img src="/assets/images/update2.jpg" alt="Latest Update" loading="lazy">
                </div>
                <div class="update-content">
                    <span class="update-date">June 10, 2023</span>
                    <h3>Healthcare Camp Successfully Conducted</h3>
                    <p>Over 500 children received free health check-ups and medicines.</p>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>