<?php
$pageTitle = "Home";
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-video">
        <video autoplay muted loop playsinline poster="/assets/hero-poster.jpg">
            <source src="/assets/hero-video.mp4" type="video/mp4">
            <img src="/assets/hero-fallback.jpg" alt="Gyan Deepak Foundation">
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

<!-- Who We Are Section -->
<section class="who-we-are">
    <div class="container">
        <span class="section-subtitle center-text">About Us</span>
        <div class="who-we-are-content">
            <div class="who-we-are-text">
                <h2>Who We Are</h2>
                <p>We are advocates for children's literacy, committed to ending the literacy crisis. With deep ties to
                    our target communities across New York City, we are personally invested in the wellbeing of our
                    children. When a child reads, a community succeeds!</p>
            </div>

            <div class="who-we-are-stats">
                <div class="stat-item">
                    <div class="stat-number">90</div>
                    <div class="stat-label">Parents Engaged</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">450</div>
                    <div class="stat-label">Students Impacted</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">80</div>
                    <div class="stat-label">Homemakers Empowered</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">6</div>
                    <div class="stat-label">Centers Across India</div>
                </div>
            </div>
        </div>

        <div class="who-we-are-buttons center-text">
            <a href="/pages/campaigns.php" class="btn btn-primary">Learn More</a>
            <a href="/pages/get-involved.php" class="btn btn-secondary">Get Involved</a>
        </div>
    </div>
</section>

<!-- What We Do Section -->
<section class="what-we-do">
    <div class="container">
        <span class="section-subtitle">Our Focus Areas</span>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h3>Empower Through Education</h3>
                <p>Providing quality education to every child, reducing dropout rates through after-school programs and
                    dedicated mentorship.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-apple-alt"></i>
                </div>
                <h3>Health & Nutrition for All</h3>
                <p>Ensuring students receive fresh, nutritious fruits to support their health and academic performance.
                </p>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-hands-helping"></i>
                </div>
                <h3>Holistic Growth</h3>
                <p>Naitik Shiksha (moral education) and extracurricular activities for comprehensive development.</p>
            </div>

            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-female"></i>
                </div>
                <h3>Training Women for Change</h3>
                <p>Empowering homemakers through training and employment opportunities within the foundation.</p>
            </div>
        </div>
    </div>
</section>

<!-- Alumni Success Stories -->
<section class="alumni-stories">
    <div class="container">
        <span class="section-subtitle">Success Stories</span>

        <div class="stories-slider">
            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/alumni-1.jpg" alt="Alumni Success Story">
                </div>
                <div class="story-content">
                    <h3>Debashis Das</h3>
                    <p class="alumni-info">BCOM, St. Xavier's College</p>
                    <blockquote class="collapsed" id="aansQuote">
                        Aanshu Kumari, a bright Grade 8 student at Gyan Deepak Foundation’s Ganghara Center, has
                        transformed her academic journey since enrolling in 2020. With dedication and support from her
                        teachers, she rose from struggling to scoring an impressive 84.80% in her board exams. Inspired
                        by Dr. Savitribai Phule, Aanshu dreams of becoming a doctor to serve society. She
                        balances her studies with simple joys like playing Ludo. Coming from a humble background, her
                        parents work hard to support Aanshu and her two sisters, all pursuing education despite
                        financial challenges. Her story is a powerful example of
                        resilience, hope, and empowerment in rural India.
                    </blockquote>

                    <button class="read-more-btn" onclick="toggleReadMore(this, 'aansQuote')">Read More</button>
                </div>
            </div>

            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/alumni-2.jpg" alt="Alumni Success Story">
                </div>
                <div class="story-content">
                    <h3>Junaid Ali</h3>
                    <p class="alumni-info">Class 10 Graduate</p>
                    <blockquote class="collapsed" id="aanshQuote">
                        Aanshu Kumari, a bright Grade 8 student at Gyan Deepak Foundation’s Ganghara Center, has
                        transformed her academic journey since enrolling in 2020. With dedication and support from her
                        teachers, she rose from struggling to scoring an impressive 84.80% in her board exams. Inspired
                        by Dr. Savitribai Phule, Aanshu dreams of becoming a doctor to serve society. She
                        balances her studies with simple joys like playing Ludo. Coming from a humble background, her
                        parents work hard to support Aanshu and her two sisters, all pursuing education despite
                        financial challenges. Her story is a powerful example of
                        resilience, hope, and empowerment in rural India.
                    </blockquote>

                    <button class="read-more-btn" onclick="toggleReadMore(this, 'aanshQuote')">Read More</button>
                </div>
            </div>

            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/alumni-2.jpg" alt="Alumni Success Story">
                </div>
                <div class="story-content">
                    <h3>Aanshu Kumari</h3>
                    <p class="alumni-info">From Roots to Success</p>
                    <blockquote class="collapsed" id="aanshuQuote">
                        Aanshu Kumari, a bright Grade 8 student at Gyan Deepak Foundation’s Ganghara Center, has
                        transformed her academic journey since enrolling in 2020. With dedication and support from her
                        teachers, she rose from struggling to scoring an impressive 84.80% in her board exams. Inspired
                        by Dr. Savitribai Phule, Aanshu dreams of becoming a doctor to serve society. She
                        balances her studies with simple joys like playing Ludo. Coming from a humble background, her
                        parents work hard to support Aanshu and her two sisters, all pursuing education despite
                        financial challenges. Her story is a powerful example of
                        resilience, hope, and empowerment in rural India.
                    </blockquote>

                    <button class="read-more-btn" onclick="toggleReadMore(this, 'aanshuQuote')">Read More</button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Founder's Message -->
<section class="founder-message" id="founder">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Founder's Message</span>
        </div>

        <div class="founder-content">
            <div class="founder-image">
                <img src="/assets/images/founder.jpg" alt="Priti Agarwal, Founder">
            </div>
            <div class="founder-text">
                <blockquote>
                    Gyan Deepak Foundation began in 2014 with one child, one fire-exit corner, and the simple wish of a
                    homemaker to teach. What started as a small act of kindness soon became a movement to address one of
                    India's deepest educational challenges, i.e. poor foundational learning.
                </blockquote>
                <div class="founder-name">
                    <h3>Priti Agarwal</h3>
                    <p>Founder, Gyan Deepak Foundation</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials">
    <div class="container">
        <span class="section-subtitle">What People's Say</span>
        <div class="testimonial-grid">
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <blockquote>
                        Congratulations on the fantastic work being done by the team of GDF. Look forward to also
                        visiting your projects during the next visit to Kolkata.
                    </blockquote>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="/assets/images/testimonial-1.jpg" alt="DAV Group Representative">
                    </div>
                    <div class="author-info">
                        <h4>DAV Group of Schools</h4>
                        <p>Chennai</p>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="testimonial-content">
                    <blockquote>
                        Gyan Deepak is an honest effort by modest homemakers; it is a frugal organisation with good
                        impact, focused and knows their strengths & weaknesses, are cautious but ambitious too; it has
                        been a good experience working with them.
                    </blockquote>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="/assets/images/testimonial-2.jpg" alt="Nimesh Samati">
                    </div>
                    <div class="author-info">
                        <h4>Nimesh Samati</h4>
                        <p>Caring Friends, Mumbai</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Partners Section -->
<section class="partners">
    <div class="container">
        <span class="section-subtitle">Collaboration</span>

        <div class="partners-slider">
            <div class="partner-logo">
                <img src="/assets/images/partner-1.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-2.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-3.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-4.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-1.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-2.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-3.png" alt="Partner Logo">
            </div>
            <div class="partner-logo">
                <img src="/assets/images/partner-4.png" alt="Partner Logo">
            </div>
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="cta-section">
    <div class="container">
        <div class="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join us in our mission to empower children and women through education and training.</p>
            <div class="cta-buttons">
                <a href="/pages/volunteer.php" class="btn btn-primary">Become a Volunteer</a>
                <a href="/pages/donate.php" class="btn btn-secondary">Donate Now</a>
            </div>
        </div>
    </div>
</section>

<script>
    // Function to handle the Read More / Show Less toggle
    function toggleReadMore(button, quoteId) {
        const blockquote = document.getElementById(quoteId);
        blockquote.classList.toggle('collapsed');
        button.textContent = blockquote.classList.contains('collapsed') ? 'Read More' : 'Show Less';
    }

    // Function to rotate stats in the "who-we-are-stats" container
    document.addEventListener('DOMContentLoaded', function () {
        const statItemsContainer = document.querySelector('.who-we-are-stats');
        if (!statItemsContainer) return;

        const statItems = Array.from(statItemsContainer.querySelectorAll('.stat-item'));
        if (statItems.length === 0) return;

        // Set first item as active initially
        statItems[0].classList.add('active');

        let currentIndex = 0;
        const intervalTime = 3000; // 3 seconds

        function rotateStats() {
            const currentItem = statItems[currentIndex];

            // Mark current item as exiting
            currentItem.classList.remove('active');
            currentItem.classList.add('exiting');

            // Move to next item (loop back to 0 if at end)
            currentIndex = (currentIndex + 1) % statItems.length;

            // Add active class to new current item
            statItems[currentIndex].classList.add('active');

            // Remove exiting class after transition completes
            setTimeout(() => {
                currentItem.classList.remove('exiting');
            }, 500); // Match this with your transition duration
        }

        // Start the rotation
        let rotationInterval = setInterval(rotateStats, intervalTime);

        // Optional: Pause rotation on hover
        statItemsContainer.addEventListener('mouseenter', () => {
            clearInterval(rotationInterval);
        });

        statItemsContainer.addEventListener('mouseleave', () => {
            rotationInterval = setInterval(rotateStats, intervalTime);
        });
    });
</script>

<?php include 'includes/footer.php'; ?>