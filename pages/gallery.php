<?php
$pageTitle = "Gallery";
include '../includes/header.php';
?>

<!-- Gallery Page Content -->
<section class="page-header">
    <div class="container">
        <h1>Gallery</h1>
        <p>Visual stories of our journey, events, and impact</p>
    </div>
</section>

<!-- Gallery Section -->
<section class="gallery-section">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Moments</span>
            <h2 class="section-title">Our Photo Gallery</h2>
        </div>
        
        <div class="gallery-filter">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="events">Events</button>
            <button class="filter-btn" data-filter="classes">Classes</button>
            <button class="filter-btn" data-filter="community">Community</button>
            <button class="filter-btn" data-filter="achievements">Achievements</button>
        </div>
        
        <div class="gallery-grid">
            <!-- Image 1 -->
            <div class="gallery-item" data-category="events">
                <img src="/assets/images/gallery-event-1.jpg" alt="Annual Prize Day">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Annual Prize Day</h3>
                        <p>Celebrating academic excellence</p>
                        <a href="/assets/images/gallery-event-1.jpg" data-lightbox="gallery" data-title="Annual Prize Day" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Image 2 -->
            <div class="gallery-item" data-category="classes">
                <img src="/assets/images/gallery-class-1.jpg" alt="Classroom Learning">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Classroom Session</h3>
                        <p>Students engaged in learning</p>
                        <a href="/assets/images/gallery-class-1.jpg" data-lightbox="gallery" data-title="Classroom Learning" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Image 3 -->
            <div class="gallery-item" data-category="community">
                <img src="/assets/images/gallery-community-1.jpg" alt="Community Program">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Health Camp</h3>
                        <p>Free medical checkup for community</p>
                        <a href="/assets/images/gallery-community-1.jpg" data-lightbox="gallery" data-title="Health Camp" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Image 4 -->
            <div class="gallery-item" data-category="achievements">
                <img src="/assets/images/gallery-achievement-1.jpg" alt="Student Achievement">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Student Recognition</h3>
                        <p>Award ceremony for top performers</p>
                        <a href="/assets/images/gallery-achievement-1.jpg" data-lightbox="gallery" data-title="Student Achievement" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Image 5 -->
            <div class="gallery-item" data-category="events">
                <img src="/assets/images/gallery-event-2.jpg" alt="Teachers' Day">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Teachers' Day</h3>
                        <p>Honoring our educators</p>
                        <a href="/assets/images/gallery-event-2.jpg" data-lightbox="gallery" data-title="Teachers' Day" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Image 6 -->
            <div class="gallery-item" data-category="classes">
                <img src="/assets/images/gallery-class-2.jpg" alt="Extracurricular Activity">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>Art Class</h3>
                        <p>Students expressing creativity</p>
                        <a href="/assets/images/gallery-class-2.jpg" data-lightbox="gallery" data-title="Art Class" class="gallery-expand">
                            <i class="fas fa-expand"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Add more gallery items as needed -->
        </div>
    </div>
</section>

<!-- Video Gallery -->
<section class="video-gallery alt-bg">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Watch</span>
            <h2 class="section-title">Our Video Gallery</h2>
        </div>
        
        <div class="video-grid">
            <!-- Video 1 -->
            <div class="video-item">
                <div class="video-thumbnail">
                    <img src="/assets/images/video-thumb-1.jpg" alt="Video Thumbnail">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <h3>GDF Annual Report 2023</h3>
            </div>
            
            <!-- Video 2 -->
            <div class="video-item">
                <div class="video-thumbnail">
                    <img src="/assets/images/video-thumb-2.jpg" alt="Video Thumbnail">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <h3>Student Success Stories</h3>
            </div>
            
            <!-- Video 3 -->
            <div class="video-item">
                <div class="video-thumbnail">
                    <img src="/assets/images/video-thumb-3.jpg" alt="Video Thumbnail">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <h3>Teachers' Training Program</h3>
            </div>
            
            <!-- Add more video items as needed -->
        </div>
        
        <div class="view-more">
            <a href="https://www.youtube.com/@gyandeepakngo7337" target="_blank" class="btn btn-primary">
                View More on YouTube <i class="fab fa-youtube"></i>
            </a>
        </div>
    </div>
</section>

<?php include '../includes/footer.php'; ?>