<?php
$pageTitle = "Home";
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="hero">
    <div class="hero-video">
        <video muted loop playsinline poster="/assets/images/hero-poster.jpg">
            <source src="/assets/videos/hero-video.mp4" type="video/mp4">
            <img src="/assets/images/hero-fallback.jpg" alt="CRY Children's Rights">
        </video>
    </div>
    <div class="hero-content">
        <h1 class="hero-title">Help Us Change Children's Lives</h1>
        <p class="hero-text">Join CRY in our mission to restore underprivileged children's rights to health, education,
            and protection.</p>
        <a href="/pages/donate.php" class="btn btn-primary hero-btn">Donate Now</a>
    </div>
</section>

<!-- About Section -->
<section class="about">
    <div class="container">
        <h2 class="section-title">About CRY</h2>
        <div class="about-content">
            <div class="about-img">
                <img src="/assets/images/about-img.jpg" alt="About CRY">
            </div>
            <div class="about-text">
                <h2>We Believe in Every Child's Right to a Childhood</h2>
                <p>CRY - Child Rights and You is an Indian NGO that believes in every child's right to a childhood - to
                    live, learn, grow and play. For over 40 years, CRY and its partners have worked with parents and
                    communities to ensure Lasting Change in the lives of more than 3 million underprivileged children.
                </p>
                <p>We work to ensure children's rights in remote villages and urban slums across 19 states in India. Our
                    programs focus on education, healthcare, protection from harm and abuse, and child participation.
                </p>
                <a href="/pages/about.php" class="btn btn-secondary">Learn More</a>
            </div>
        </div>
    </div>
</section>

<!-- Impact Section -->
<section class="impact-section">
    <div class="container">
        <h2 class="section-title">Our Impact</h2>
        <div class="impact-grid">
            <div class="impact-tile">
                <div class="tile-image">
                    <img src="/assets/images/impact-children.jpg" alt="Children Impacted">
                </div>
                <div class="tile-content">
                    <h3>2.5M+</h3>
                    <p>Children Impacted</p>
                </div>
            </div>

            <div class="impact-tile">
                <div class="tile-image">
                    <img src="/assets/images/impact-villages.jpg" alt="Villages Reached">
                </div>
                <div class="tile-content">
                    <h3>850+</h3>
                    <p>Villages Reached</p>
                </div>
            </div>

            <div class="impact-tile">
                <div class="tile-image">
                    <img src="/assets/images/impact-years.jpg" alt="Years of Service">
                </div>
                <div class="tile-content">
                    <h3>42</h3>
                    <p>Years of Service</p>
                </div>
            </div>

            <div class="impact-tile">
                <div class="tile-image">
                    <img src="/assets/images/impact-states.jpg" alt="States Across India">
                </div>
                <div class="tile-content">
                    <h3>19</h3>
                    <p>States Across India</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Campaigns Section -->
<section class="campaigns">
    <div class="container">
        <h2 class="section-title">Our Campaigns</h2>
        <div class="campaign-grid">
            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-education.jpg" alt="Education for All">
                </div>
                <div class="campaign-info">
                    <h3>Education for All</h3>
                    <p>Ensuring access to quality education for underprivileged children across India.</p>
                    <a href="#" class="btn btn-primary">Support Now</a>
                </div>
            </div>

            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-health.jpg" alt="Healthy Childhood">
                </div>
                <div class="campaign-info">
                    <h3>Healthy Childhood</h3>
                    <p>Providing healthcare and nutrition to children in need.</p>
                    <a href="#" class="btn btn-primary">Support Now</a>
                </div>
            </div>

            <div class="campaign-card">
                <div class="campaign-img">
                    <img src="/assets/images/campaign-protection.jpg" alt="Child Protection">
                </div>
                <div class="campaign-info">
                    <h3>Child Protection</h3>
                    <p>Protecting children from abuse, exploitation and violence.</p>
                    <a href="#" class="btn btn-primary">Support Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Donation CTA Section -->
<section class="donation-cta">
    <div class="container">
        <div class="cta-content">
            <h2>Your Support Can Change Lives</h2>
            <p>Every donation helps us reach more children in need. Join us in our mission.</p>
            <div class="cta-buttons">
                <a href="/pages/donate.php" class="btn btn-primary">Donate Now</a>
                <a href="/pages/campaigns.php" class="btn btn-secondary">View Campaigns</a>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>