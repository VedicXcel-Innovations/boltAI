<?php 
include '../config.php'; 
include '../templates/header.php'; 
include '../php/db_config.php';

$query = "SELECT * FROM articles ORDER BY created_at DESC";
$result = $conn->query($query);

if (!$result) {
    die("Error fetching articles: " . $conn->error);
}
?>

<main>
    <section>
        <h1>Articles</h1>
        <p>Explore our collection of articles that highlight our work, impact, and the stories of the communities we serve.</p>
<link rel="stylesheet" href="<?= BASE_URL ?>css/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/items.css">
    <link rel="shortcut icon" href="<?= BASE_URL ?>images/favicon.ico">
     <?php while ($article = $result->fetch_assoc()): ?>
    <div class="article-container">
        <h2><?php echo htmlspecialchars($article['title']); ?></h2>
        <p><?php echo htmlspecialchars($article['content']); ?></p>
        <p><strong>Type:</strong> <?php echo htmlspecialchars($article['type']); ?></p>
        <p><strong>Date:</strong> <?php echo htmlspecialchars($article['created_at']); ?></p>
        <?php
        $stmt = $conn->prepare("SELECT * FROM media_article WHERE article_id = ?");
        $stmt->bind_param("i", $article['id']);
        $stmt->execute();
        $media = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        ?>
        <div class="media-scroll">
            <?php foreach ($media as $item): ?>
                <?php $mediaUrl = htmlspecialchars(BASE_URL . 'uploads/' . basename($item['media_url'])); ?>
                
                <?php if ($item['media_type'] === 'photo'): ?>
                    <img src="<?php echo $mediaUrl; ?>" 
                        class="media-item"
                        onclick="openModal('<?php echo $mediaUrl; ?>', 'image')">
                <?php elseif ($item['media_type'] === 'video'): ?>
                    <video class="media-item" onclick="openModal('<?php echo $mediaUrl; ?>', 'video')">
                        <source src="<?php echo $mediaUrl; ?>" type="video/mp4">
                    </video>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
<?php endwhile; ?>
    </section>
    <div id="mediaModal" class="modal">
    <span class="close" onclick="closeModal()">&times;</span>
    <img id="modalImage" class="modal-content">
    <video id="modalVideo" class="modal-content" controls>
        <source src="" type="video/mp4">
    </video>
</div>
</main>

<script>
    function openModal(src, type) {
        const modal = document.getElementById("mediaModal");
        const modalImage = document.getElementById("modalImage");
        const modalVideo = document.getElementById("modalVideo");

        // Hide both initially
        modalImage.style.display = "none";
        modalVideo.style.display = "none";

        if (type === "image") {
            modalImage.src = src;
            modalImage.style.display = "block";
        } else if (type === "video") {
            modalVideo.src = src;
            modalVideo.style.display = "block";
        }

        modal.style.display = "flex";
    }

    function closeModal() {
        const modal = document.getElementById("mediaModal");
        const modalImage = document.getElementById("modalImage");
        const modalVideo = document.getElementById("modalVideo");

        modal.style.display = "none";
        modalImage.src = "";
        modalVideo.src = "";
    }
</script>

<?php include '../templates/footer.php'; ?>
