<?php include 'config.php'; ?>
<?php include 'templates/header.php'; ?>

<main>
    <!-- Image Carousel Section -->
    <div class="carousel-container">
        <div class="carousel">
            <?php
            for ($i = 1; $i <= 7; $i++) {
                echo "<div class='carousel-slide" . ($i === 1 ? " active" : "") . "'>";
                echo "<img src='" . BASE_URL . "images/carousel/carousel_" . $i . ".png' alt='Carousel Image " . $i . "'>";
                echo "</div>";
            }
            ?>
        </div>
        <button class="carousel-button prev" onclick="moveSlide(-1)">❮</button>
        <button class="carousel-button next" onclick="moveSlide(1)">❯</button>
        <div class="carousel-dots">
            <?php
            for ($i = 1; $i <= 7; $i++) {
                echo "<span class='dot" . ($i === 1 ? " active" : "") . "' onclick='currentSlide(" . $i . ")'></span>";
            }
            ?>
        </div>
    </div>

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
            </div>
        </section>

        <section class="section">
            <h2 class="text-center mb-4">Our Vision</h2>
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
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
                        <p>Lend your time and skills to our projects. Your contributions are vital in expanding the
                            reach and impact of our initiatives.</p>
                        <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-primary">Get Involved</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<style>
    /* Carousel Styles */
    .carousel-container {
        position: relative;
        max-width: 100%;
        margin: 0 auto;
        border-radius: 5px;
        overflow: hidden;
    }

    .carousel {
        position: relative;
        height: 500px;
    }

    .carousel-slide {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .carousel-slide.active {
        opacity: 1;
    }

    .carousel-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(21, 58, 111, 0.5);
        color: white;
        padding: 16px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        transition: background 0.3s;
    }

    .carousel-button:hover {
        background: rgba(21, 58, 111, 0.8);
    }

    .prev {
        left: 10px;
    }

    .next {
        right: 10px;
    }

    .carousel-dots {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }

    .dot {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.3s;
    }

    .dot.active {
        background: var(--secondary-color);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .carousel {
            height: 400px;
        }

        .carousel-button {
            padding: 12px;
            font-size: 16px;
        }
    }

    @media (max-width: 480px) {
        .carousel {
            height: 300px;
        }

        .carousel-button {
            padding: 8px;
            font-size: 14px;
        }

        .dot {
            width: 8px;
            height: 8px;
        }
    }
</style>

<script>
    let currentSlideIndex = 1;
    showSlides(currentSlideIndex);

    function moveSlide(n) {
        showSlides(currentSlideIndex += n);
    }

    function currentSlide(n) {
        showSlides(currentSlideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("carousel-slide");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
            currentSlideIndex = 1;
        }
        if (n < 1) {
            currentSlideIndex = slides.length;
        }

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }

        // Remove active class from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Show current slide and activate corresponding dot
        slides[currentSlideIndex - 1].classList.add("active");
        dots[currentSlideIndex - 1].classList.add("active");
    }

    // Auto advance slides
    setInterval(() => {
        moveSlide(1);
    }, 5000);
</script>

<?php include 'templates/footer.php'; ?>