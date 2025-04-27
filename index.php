<?php
$pageTitle = "Home";
include 'includes/header.php';
?>

<!-- Hero Section (keep as is) -->
<section class="hero">
    <div class="hero-video">
        <video autoplay muted loop playsinline poster="/assets/images/hero-poster.jpg">
            <source src="/assets/videos/hero-video.mp4" type="video/mp4">
            <img src="/assets/images/hero-fallback.jpg" alt="Gyan Deepak Foundation">
        </video>
    </div>
    <div class="hero-content">
        <h1 class="hero-title">Empowering Children's Dreams</h1>
        <p class="hero-text">Join us in creating a world where every child has the opportunity to thrive, learn, and grow. Together, we can make a difference.</p>
        <div class="hero-buttons">
            <a href="/pages/donate.php" class="btn btn-primary">Make a Donation</a>
            <a href="/pages/about.php" class="btn btn-secondary">Learn More</a>
        </div>
    </div>
</section>

<!-- What We Do Section -->
<section class="what-we-do">
    <div class="container">
        <span class="section-subtitle">Our Focus Areas</span>
        <h2 class="section-title">What We Do</h2>
        
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <h3>Empower Through Education</h3>
                <p>Providing quality education to every child, reducing dropout rates through after-school programs and dedicated mentorship.</p>
            </div>
            
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-apple-alt"></i>
                </div>
                <h3>Health & Nutrition for All</h3>
                <p>Ensuring students receive fresh, nutritious fruits to support their health and academic performance.</p>
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

<!-- Statistics Section -->
<section class="statistics">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number" data-count="450">0</div>
                <div class="stat-label">Students Impacted</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-count="80">0</div>
                <div class="stat-label">Homemakers Empowered</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-count="6">0</div>
                <div class="stat-label">Centers Across India</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-count="100">0</div>
                <div class="stat-label">Active Team Members</div>
            </div>
        </div>
    </div>
</section>

<!-- Alumni Success Stories -->
<section class="alumni-stories">
    <div class="container">
        <span class="section-subtitle">Success Stories</span>
        <h2 class="section-title">GDF Alumni</h2>
        
        <div class="stories-slider">
            <!-- Story 1 -->
            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/alumni-1.jpg" alt="Alumni Success Story">
                </div>
                <div class="story-content">
                    <h3>Debashis Das</h3>
                    <p class="alumni-info">BCOM, St. Xavier's College</p>
                    <blockquote>
                        "Gyandeepak for me is a beacon of hope, always supporting me when I needed help. The support that the administration and teachers bestow upon us is formidable. Gyandeepak changed my life in the most beautiful way possible."
                    </blockquote>
                </div>
            </div>
            
            <!-- Story 2 -->
            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/alumni-2.jpg" alt="Alumni Success Story">
                </div>
                <div class="story-content">
                    <h3>Junaid Ali</h3>
                    <p class="alumni-info">Class 10 Graduate</p>
                    <blockquote>
                        "I want to thank the teachers of Gyandeepak from my heart. They have helped me in everything. Even during the lockdown, they did not close the classes and started conducting online classes. They also distributed ration. They helped us even in bad times."
                    </blockquote>
                </div>
            </div>
            
            <!-- Add more stories as needed -->
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials">
    <div class="container">
        <span class="section-subtitle">What People Say</span>
        <h2 class="section-title">Testimonials</h2>
        
        <div class="testimonial-grid">
            <!-- Testimonial 1 -->
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Congratulations on the fantastic work being done by the team of GDF. Look forward to also visiting your projects during the next visit to Kolkata."</p>
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
            
            <!-- Testimonial 2 -->
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Gyan Deepak is an honest effort by modest homemakers; it is a frugal organisation with good impact, focused and knows their strengths & weaknesses, are cautious but ambitious too; it has been a good experience working with them."</p>
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
            
            <!-- Add more testimonials as needed -->
        </div>
    </div>
</section>

<!-- Who We Are Section -->
<section class="who-we-are">
    <div class="container">
        <div class="who-we-are-content">
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
            <div class="who-we-are-text">
                <h2>Who We Are</h2>
                <p>We are advocates for children's literacy, committed to ending the literacy crisis. With deep ties to our target communities across New York City, we are personally invested in the wellbeing of our children. When a child reads, a community succeeds!</p>
                <div class="who-we-are-buttons">
                    <a href="/pages/campaigns.php" class="btn btn-primary">Learn More</a>
                    <a href="/pages/get-involved.php" class="btn btn-secondary">Get Involved</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Partners Section -->
<section class="partners">
    <div class="container">
        <span class="section-subtitle">Collaboration</span>
        <h2 class="section-title">Partners in Change</h2>
        
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
            <!-- Add more partner logos as needed -->
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
document.addEventListener('DOMContentLoaded', function() {
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