<?php
include '../config.php';
include '../templates/header.php';
include '../php/db_config.php';

// Fetch articles with pagination
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$per_page = 9;
$offset = ($page - 1) * $per_page;

// Get total articles count
$total_query = "SELECT COUNT(*) as total FROM articles";
$total_result = $conn->query($total_query);
$total_articles = $total_result->fetch_assoc()['total'];
$total_pages = ceil($total_articles / $per_page);

// Fetch articles for current page
$query = "SELECT * FROM articles ORDER BY created_at DESC LIMIT ? OFFSET ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $per_page, $offset);
$stmt->execute();
$articles = $stmt->get_result();

if (!$articles) {
    die("Error fetching articles: " . $conn->error);
}
?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Articles & Media</h1>
            <p>Explore our collection of articles, stories, and media that highlight our work and impact</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <?php if ($articles->num_rows === 0): ?>
                <div class="text-center">
                    <h2>No articles found</h2>
                    <p>Check back later for new content!</p>
                </div>
            <?php else: ?>
                <div class="articles-grid">
                    <?php while ($article = $articles->fetch_assoc()): ?>
                        <article class="article-container">
                            <div class="article-content">
                                <h2 class="article-title"><?= htmlspecialchars($article['title']) ?></h2>
                                <p class="article-text"><?= nl2br(htmlspecialchars(substr($article['content'], 0, 200))) ?>...
                                </p>

                                <div class="article-meta">
                                    <span><i class="fas fa-folder"></i>
                                        <?= ucfirst(htmlspecialchars($article['type'])) ?></span>
                                    <span><i class="fas fa-calendar"></i>
                                        <?= date('M d, Y', strtotime($article['created_at'])) ?></span>
                                </div>
                            </div>

                            <?php
                            // Fetch media for this article
                            $media_stmt = $conn->prepare("SELECT * FROM media_article WHERE article_id = ?");
                            $media_stmt->bind_param("i", $article['id']);
                            $media_stmt->execute();
                            $media = $media_stmt->get_result();

                            if ($media->num_rows > 0):
                                ?>
                                <div class="media-gallery">
                                    <?php while ($item = $media->fetch_assoc()):
                                        $media_url = htmlspecialchars(BASE_URL . $item['media_url']);
                                        $is_video = $item['media_type'] === 'video';
                                        ?>
                                        <div class="media-item <?= $is_video ? 'video' : '' ?>"
                                            onclick="openModal('<?= $media_url ?>', '<?= $item['media_type'] ?>')">
                                            <?php if ($is_video): ?>
                                                <video src="<?= $media_url ?>" muted></video>
                                            <?php else: ?>
                                                <img src="<?= $media_url ?>" alt="Article media">
                                            <?php endif; ?>
                                        </div>
                                    <?php endwhile; ?>
                                </div>
                            <?php endif; ?>
                        </article>
                    <?php endwhile; ?>
                </div>

                <?php if ($total_pages > 1): ?>
                    <div class="pagination d-flex justify-content-center gap-2 mt-4">
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

<script>
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

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);

        // Stop video when modal is closed
        if (type === 'video') {
            modalVideo.play();
        }
    }

    function closeModal() {
        const modal = document.getElementById('mediaModal');
        const modalVideo = document.getElementById('modalVideo');

        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }, 300);
    }

    // Close modal on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Lazy load videos
    document.addEventListener('DOMContentLoaded', function () {
        const videos = document.querySelectorAll('.media-item.video video');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.getAttribute('data-src');
                    observer.unobserve(entry.target);
                }
            });
        });

        videos.forEach(video => observer.observe(video));
    });
</script>

<?php
$conn->close();
include '../templates/footer.php';
?>