<?php
$pageTitle = "Our Campaigns";
include '../includes/header.php';
?>

<section class="page-header">
    <div class="container">
        <h1>Our Campaigns</h1>
        <p>Discover how we're making a difference</p>
    </div>
</section>

<section class="campaigns-main">
    <div class="container">
        <div class="campaign-categories">
            <button class="category-btn active" data-category="all">All Campaigns</button>
            <button class="category-btn" data-category="education">Education</button>
            <button class="category-btn" data-category="health">Health</button>
            <button class="category-btn" data-category="protection">Protection</button>
        </div>

        <div class="campaigns-grid">
            <div class="campaign-card" data-category="education">
                <img src="/assets/images/campaign-education.jpg" alt="Education for All">
                <div class="campaign-info">
                    <span class="campaign-category">Education</span>
                    <h3>Education for All</h3>
                    <p>Ensuring access to quality education for underprivileged children across India.</p>
                    <a href="#" class="btn btn-primary">Learn More</a>
                </div>
            </div>

            <div class="campaign-card" data-category="health">
                <img src="/assets/images/campaign-health.jpg" alt="Healthy Childhood">
                <div class="campaign-info">
                    <span class="campaign-category">Health</span>
                    <h3>Healthy Childhood</h3>
                    <p>Providing healthcare and nutrition to children in need.</p>
                    <a href="#" class="btn btn-primary">Learn More</a>
                </div>
            </div>

            <div class="campaign-card" data-category="protection">
                <img src="/assets/images/campaign-protection.jpg" alt="Child Protection">
                <div class="campaign-info">
                    <span class="campaign-category">Protection</span>
                    <h3>Child Protection</h3>
                    <p>Protecting children from abuse, exploitation and violence.</p>
                    <a href="#" class="btn btn-primary">Learn More</a>
                </div>
            </div>

            <!-- Add more campaign cards as needed -->
        </div>
    </div>
</section>

<?php include '../includes/footer.php'; ?>