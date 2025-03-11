<?php
include '../config.php';
include '../templates/header.php';
include '../php/db_config.php';

// Fetch media coverage with pagination
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$per_page = 6;
$offset = ($page - 1) * $per_page;

// Get total media coverage count
$total_query = "SELECT COUNT(*) as total FROM media_coverage";
$total_result = $conn->query($total_query);
$total_coverage = $total_result->fetch_assoc()['total'];
$total_pages = ceil($total_coverage / $per_page);

// Fetch media coverage for current page
$query = "SELECT * FROM media_coverage ORDER BY created_at DESC LIMIT ? OFFSET ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $per_page, $offset);
$stmt->execute();
$coverage_items = $stmt->get_result();
?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Media Coverage</h1>
            <p>Explore our journey through media highlights and coverage across various platforms</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="media-filters mb-4">
                <button class="btn btn-outline active" data-filter="all">All</button>
                <button class="btn btn-outline" data-filter="Print Media">Print Media</button>
                <button class="btn btn-outline" data-filter="Electronic Media">Electronic Media</button>
                <button class="btn btn-outline" data-filter="Online Media">Online Media</button>
            </div>

            <?php if ($coverage_items->num_rows === 0): ?>
                <div class="text-center p-5">
                    <div class="mb-4">
                        <i class="fas fa-newspaper fa-3x text-gray-300"></i>
                    </div>
                    <h3>No Media Coverage Found</h3>
                    <p class="text-gray">Check back later for updates on our media presence!</p>
                </div>
            <?php else: ?>
                <div class="media-grid">
                    <?php while ($coverage = $coverage_items->fetch_assoc()): ?>
                        <div class="media-card" data-type="<?= htmlspecialchars($coverage['type']) ?>">
                            <div class="media-card-header">
                                <span class="media-type">
                                    <i
                                        class="fas <?= $coverage['type'] === 'Print Media' ? 'fa-newspaper' : ($coverage['type'] === 'Electronic Media' ? 'fa-tv' : 'fa-globe') ?>"></i>
                                    <?= htmlspecialchars($coverage['type']) ?>
                                </span>
                                <span class="media-date">
                                    <i class="fas fa-calendar-alt"></i>
                                    <?= date('M d, Y', strtotime($coverage['created_at'])) ?>
                                </span>
                            </div>

                            <?php
                            $media_stmt = $conn->prepare("SELECT * FROM media_media_coverage WHERE media_coverage_id = ?");
                            $media_stmt->bind_param("i", $coverage['id']);
                            $media_stmt->execute();
                            $media = $media_stmt->get_result();
                            ?>

                            <div class="media-content">
                                <div class="media-gallery">
                                    <?php while ($item = $media->fetch_assoc()):
                                        $media_url = htmlspecialchars(BASE_URL . $item['media_url']);
                                        $is_video = $item['media_type'] === 'video';
                                        ?>
                                        <div class="media-item <?= $is_video ? 'video' : '' ?>"
                                            onclick="openModal('<?= $media_url ?>', '<?= $item['media_type'] ?>')">
                                            <?php if ($is_video): ?>
                                                <video src="<?= $media_url ?>" preload="metadata">
                                                    Your browser does not support the video tag.
                                                </video>
                                                <div class="play-icon">
                                                    <i class="fas fa-play"></i>
                                                </div>
                                            <?php else: ?>
                                                <img src="<?= $media_url ?>" alt="Media coverage">
                                            <?php endif; ?>
                                        </div>
                                    <?php endwhile; ?>
                                </div>
                                <div class="media-info">
                                    <div class="reference-id">
                                        <strong>Reference:</strong> <?= htmlspecialchars($coverage['reference_id']) ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>

                <?php if ($total_pages > 1): ?>
                    <div class="pagination d-flex justify-content-center gap-2 mt-5">
                        <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                            <a href="?page=<?= $i ?>" class="btn <?= $i === $page ? 'btn-primary' : 'btn-outline' ?>">
                                <?= $i ?>
                            </a>
                        <?php endfor; ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        </section>
    </div>

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
</main>

<style>
    .media-filters {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .media-filters .btn {
        transition: all 0.3s ease;
        border-radius: 50px;
        padding: 0.5rem 1.5rem;
    }

    .media-filters .btn.active {
        background-color: var(--secondary-color);
        color: white;
        transform: scale(1.05);
    }

    .media-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .media-card {
        background: white;
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
        opacity: 1;
        transform: translateY(0);
    }

    .media-card.hidden {
        display: none;
        opacity: 0;
        transform: translateY(20px);
    }

    .media-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .media-card-header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--gray-200);
    }

    .media-type {
        color: var(--secondary-color);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .media-date {
        color: var(--gray-800);
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .media-content {
        padding: 1rem;
    }

    .media-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .media-item {
        position: relative;
        aspect-ratio: 16/9;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--gray-200);
    }

    .media-item img,
    .media-item video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .media-item:hover img,
    .media-item:hover video {
        transform: scale(1.1);
    }

    .media-item.video::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .media-item.video .play-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-color);
        z-index: 1;
        transition: all 0.3s ease;
    }

    .media-item.video:hover .play-icon {
        transform: translate(-50%, -50%) scale(1.1);
        background: var(--secondary-color);
        color: white;
    }

    .media-info {
        padding-top: 1rem;
        border-top: 1px solid var(--gray-200);
    }

    .reference-id {
        color: var(--gray-800);
        font-size: 0.9rem;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .media-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
        }

        .media-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 1rem;
        }

        .media-filters::-webkit-scrollbar {
            height: 4px;
        }

        .media-filters::-webkit-scrollbar-thumb {
            background-color: var(--secondary-color);
            border-radius: 4px;
        }
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const filterButtons = document.querySelectorAll('.media-filters .btn');
        const mediaCards = document.querySelectorAll('.media-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                mediaCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-type') === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    });

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
            modalVideo.play();
        }

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);

        document.addEventListener('keydown', handleEscKey);
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

        document.removeEventListener('keydown', handleEscKey);
    }

    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    // Close modal when clicking outside
    document.getElementById('mediaModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
</script>

<?php
$conn->close();
include '../templates/footer.php';
?>