<?php
include '../config.php';
include '../templates/header.php';
include '../php/db_config.php';

// Fetch supporters from database
$query = "SELECT * FROM supporters ORDER BY created_at DESC";
$supporters = $conn->query($query);
?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Our Valued Supporters</h1>
            <p>Together, we're creating lasting impact and transforming communities</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="impact-numbers">
                <div class="impact-grid">
                    <div class="impact-card">
                        <div class="impact-icon">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="impact-value">40+</div>
                        <div class="impact-label">Corporate Partners</div>
                    </div>
                    <div class="impact-card">
                        <div class="impact-icon">
                            <i class="fas fa-building-columns"></i>
                        </div>
                        <div class="impact-value">15+</div>
                        <div class="impact-label">Government Collaborations</div>
                    </div>
                    <div class="impact-card">
                        <div class="impact-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="impact-value">1000+</div>
                        <div class="impact-label">Individual Donors</div>
                    </div>
                </div>
            </div>

            <?php if ($supporters->num_rows > 0): ?>
                <div class="supporters-container">
                    <!-- <div class="supporters-filter">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="Organization">Organizations</button>
                        <button class="filter-btn" data-filter="Individual">Individuals</button>
                    </div> -->

                    <div class="supporters-grid">
                        <?php while ($supporter = $supporters->fetch_assoc()): ?>
                            <div class="supporter-item" data-category="<?= htmlspecialchars($supporter['type']) ?>">
                                <div class="supporter-content">
                                    <?php
                                    // Fetch supporter's logo
                                    $logo_url = $supporter['logo'] ? BASE_URL . $supporter['logo'] : null;
                                    ?>
                                    <div class="supporter-header">
                                        <?php if ($logo_url): ?>
                                            <div class="supporter-logo">
                                                <img src="<?= $logo_url ?>" alt="<?= htmlspecialchars($supporter['name']) ?> logo" loading="lazy">
                                            </div>
                                        <?php endif; ?>
                                        <div class="supporter-info">
                                            <h3><?= htmlspecialchars($supporter['name']) ?></h3>
                                            <span class="supporter-type"><?= htmlspecialchars($supporter['type']) ?></span>
                                        </div>
                                    </div>

                                    <div class="supporter-body">
                                        <p><?= htmlspecialchars($supporter['description']) ?></p>
                                        
                                        <?php if ($supporter['website']): ?>
                                            <a href="<?= htmlspecialchars($supporter['website']) ?>" class="website-link" target="_blank" rel="noopener noreferrer">
                                                <i class="fas fa-globe"></i> Visit Website
                                            </a>
                                        <?php endif; ?>
                                    </div>

                                    <?php
                                    // Fetch supporter's media
                                    $media_stmt = $conn->prepare("SELECT * FROM supporter_media WHERE supporter_id = ?");
                                    $media_stmt->bind_param("i", $supporter['id']);
                                    $media_stmt->execute();
                                    $media_result = $media_stmt->get_result();
                                    
                                    if ($media_result->num_rows > 0):
                                    ?>
                                        <div class="supporter-gallery">
                                            <?php while ($media = $media_result->fetch_assoc()): ?>
                                                <div class="gallery-item" onclick="openModal('<?= BASE_URL . $media['media_url'] ?>', '<?= $media['media_type'] ?>')">
                                                    <?php if ($media['media_type'] === 'photo'): ?>
                                                        <img src="<?= BASE_URL . $media['media_url'] ?>" alt="Support activity" loading="lazy">
                                                    <?php else: ?>
                                                        <div class="video-thumbnail">
                                                            <i class="fas fa-play"></i>
                                                            <video src="<?= BASE_URL . $media['media_url'] ?>"></video>
                                                        </div>
                                                    <?php endif; ?>
                                                </div>
                                            <?php endwhile; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endwhile; ?>
                    </div>
                </div>
            <?php else: ?>
                <div class="text-center mt-5">
                    <p>Supporters will be added soon.</p>
                </div>
            <?php endif; ?>
        </section>

        <section class="section text-center">
            <div class="become-supporter">
                <h2>Become a Supporter</h2>
                <p>Join us in our mission to create positive change and transform lives across Jharkhand.</p>
                <div class="d-flex justify-content-center gap-3 mt-4">
                    <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-primary">Support Our Cause</a>
                    <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-accent">Contact Us</a>
                </div>
            </div>
        </section>
    </div>
</main>

<!-- Modal for media preview -->
<div class="modal" id="mediaModal">
    <div class="modal-close" onclick="closeModal()">
        <i class="fas fa-times"></i>
    </div>
    <div class="modal-content">
        <img id="modalImage" style="display: none;">
        <video id="modalVideo" controls style="display: none;"></video>
    </div>
</div>

<style>
.impact-numbers {
    margin-bottom: 4rem;
}

.impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.impact-card {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.impact-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
}

.impact-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.impact-icon {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.impact-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.impact-label {
    color: var(--gray-800);
    font-size: 1.1rem;
}

.supporters-filter {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--primary-color);
    background: transparent;
    color: var(--primary-color);
    border-radius: 50px;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary-color);
    color: var(--white);
}

.supporters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

.supporter-item {
    opacity: 1;
    transform: scale(1);
    transition: all 0.4s ease;
}

.supporter-item.hidden {
    opacity: 0;
    transform: scale(0.8);
    position: absolute;
    pointer-events: none;
}

.supporter-content {
    background: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.supporter-content:hover {
    box-shadow: var(--shadow-lg);
}

.supporter-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 1px solid var(--gray-200);
}

.supporter-logo {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
}

.supporter-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.supporter-info h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--primary-color);
}

.supporter-type {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: var(--light-color);
    color: var(--primary-color);
    border-radius: 50px;
    font-size: 0.85rem;
    margin-top: 0.5rem;
}

.supporter-body {
    padding: 1.5rem;
}

.website-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--secondary-color);
    text-decoration: none;
    margin-top: 1rem;
    font-weight: 500;
}

.website-link:hover {
    text-decoration: underline;
}

.supporter-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--gray-100);
}

.gallery-item {
    aspect-ratio: 1;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
}

.gallery-item img,
.gallery-item video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover img,
.gallery-item:hover video {
    transform: scale(1.1);
}

.video-thumbnail {
    position: relative;
    width: 100%;
    height: 100%;
}

.video-thumbnail i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-size: 1.5rem;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.show {
    opacity: 1;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90vh;
}

.modal-content img,
.modal-content video {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: var(--white);
    font-size: 2rem;
    cursor: pointer;
    z-index: 1001;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transition: var(--transition);
}

.modal-close:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: rotate(90deg);
}

.become-supporter {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    padding: 4rem 2rem;
    border-radius: var(--border-radius);
    color: var(--white);
    margin-top: 4rem;
}

.become-supporter h2 {
    color: var(--white);
    margin-bottom: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .supporters-grid {
        grid-template-columns: 1fr;
    }

    .impact-grid {
        grid-template-columns: 1fr;
    }

    .supporter-header {
        flex-direction: column;
        text-align: center;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const supporterItems = document.querySelectorAll('.supporter-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-filter');
            supporterItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// Modal functionality
function openModal(src, type) {
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');

    modalImage.style.display = 'none';
    modalVideo.style.display = 'none';

    if (type === 'photo') {
        modalImage.src = src;
        modalImage.style.display = 'block';
    } else {
        modalVideo.src = src;
        modalVideo.style.display = 'block';
    }

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.getElementById('mediaModal');
    const modalVideo = document.getElementById('modalVideo');

    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    }, 300);
}

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on outside click
document.getElementById('mediaModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
</script>

<?php
$conn->close();
include '../templates/footer.php';
?>