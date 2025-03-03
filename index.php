<?php include 'config.php'; ?>
<?php include 'templates/header.php'; ?>

<main>
    <section class="hero">
        <div class="container">
            <h1>Welcome to Jan Sahbhagi Vikas Kendra</h1>
            <p>Empowering communities and transforming lives across Jharkhand through sustainable development
                initiatives.</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <a href="<?= BASE_URL ?>pages/about.php" class="btn btn-outline">Learn More</a>
                <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-accent">Make a Difference</a>
            </div>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <h2 class="text-center mb-4">Our Mission</h2>
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
                    <p>Our mission is to advance community well-being by ensuring child protection, providing access to
                        quality education, promoting skill training, fostering sustainable livelihoods, improving
                        healthcare, and championing environmental stewardship through collaboration and innovation.</p>
                </div>
                <div class="col-12 col-sm-6">
                    <p>We envision a society where every child is safe, educated, and empowered, and communities thrive
                        through sustainable livelihoods and environmental conservation.</p>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="text-center mb-4">Our Focus Areas</h2>
            <div class="features">
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-child"></i></div>
                    <h3>Child Protection</h3>
                    <p>Ensuring the safety, education, and well-being of vulnerable children through our Child Care
                        Institutions.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-hands"></i></div>
                    <h3>Livelihood Programs</h3>
                    <p>Empowering communities with sustainable income opportunities through skill development and market
                        linkages.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-seedling"></i></div>
                    <h3>Environmental Action</h3>
                    <p>Promoting eco-friendly practices and conservation efforts to protect our natural resources.</p>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="text-center mb-4">Our Impact</h2>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">200+</div>
                    <div class="stat-label">Children Rehabilitated</div>
                </div>
                <div class="stat">
                    <div class="stat-number">150+</div>
                    <div class="stat-label">Women Artisans Trained</div>
                </div>
                <div class="stat">
                    <div class="stat-number">20000+</div>
                    <div class="stat-label">Trees Planted</div>
                </div>
                <div class="stat">
                    <div class="stat-number">5000+</div>
                    <div class="stat-label">Households Supported</div>
                </div>
            </div>
            <div class="text-center mt-4">
                <a href="<?= BASE_URL ?>pages/impact.php" class="btn btn-primary">See Full Impact</a>
            </div>
        </section>

        <section class="section">
            <h2 class="text-center mb-4">Get Involved</h2>
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-hand-holding-heart"></i> Support Our Cause</h3>
                        <p>Your contributions drive change. Donate to support education, healthcare, livelihood
                            programs, and environmental conservation.</p>
                        <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-accent">Donate Now</a>
                    </div>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-users"></i> Join Our Team</h3>
                        <p>Lend your time and skills to our projects. Volunteers are vital in expanding the reach and
                            impact of our initiatives.</p>
                        <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-primary">Volunteer</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<?php include 'templates/footer.php'; ?>