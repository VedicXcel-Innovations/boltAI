<?php
include '../config.php';
include '../templates/header.php';
include '../php/db_config.php';

// Fetch products from database
$query = "SELECT * FROM products ORDER BY created_at DESC";
$products = $conn->query($query);
?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Our Products</h1>
            <p>Discover our handcrafted collection of eco-friendly jute products</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="products-filters mb-4">
                <div class="search-box">
                    <input type="text" id="searchInput" class="form-control" placeholder="Search products...">
                    <i class="fas fa-search"></i>
                </div>
                <div class="sort-options">
                    <select id="sortSelect" class="form-select">
                        <option value="default">Default Sorting</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            <?php if ($products->num_rows === 0): ?>
                <div class="text-center p-5">
                    <div class="mb-4">
                        <i class="fas fa-box-open fa-3x text-gray-300"></i>
                    </div>
                    <h3>No Products Found</h3>
                    <p class="text-gray">Check back later for our latest products!</p>
                </div>
            <?php else: ?>
                <div class="products-grid">
                    <?php while ($product = $products->fetch_assoc()): ?>
                        <div class="product-card" data-price="<?= $product['rate'] ?>"
                            data-date="<?= strtotime($product['created_at']) ?>">
                            <?php
                            // Fetch product media
                            $media_stmt = $conn->prepare("SELECT * FROM product_media WHERE product_id = ? LIMIT 1");
                            $media_stmt->bind_param("i", $product['id']);
                            $media_stmt->execute();
                            $media = $media_stmt->get_result()->fetch_assoc();
                            ?>

                            <div class="product-image">
                                <?php if ($media): ?>
                                    <?php if ($media['media_type'] === 'photo'): ?>
                                        <img src="<?= BASE_URL . $media['media_url'] ?>" alt="<?= htmlspecialchars($product['name']) ?>"
                                            loading="lazy">
                                    <?php else: ?>
                                        <video src="<?= BASE_URL . $media['media_url'] ?>" muted loop></video>
                                    <?php endif; ?>
                                <?php else: ?>
                                    <div class="placeholder-image">
                                        <i class="fas fa-image"></i>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="product-info">
                                <h3><?= htmlspecialchars($product['name']) ?></h3>
                                <div class="product-price">₹<?= number_format($product['rate'], 2) ?></div>
                                <p class="product-description"><?= htmlspecialchars($product['description']) ?></p>

                                <?php
                                // Prepare WhatsApp message
                                $message = "Hi, I'm interested in purchasing *" . $product['name'] . "* (₹" . number_format($product['rate'], 2) . "). Please provide more details.";
                                $whatsapp_url = "https://wa.me/919831343210?text=" . urlencode($message);
                                ?>

                                <a href="<?= $whatsapp_url ?>" class="btn btn-secondary buy-now-btn" target="_blank">
                                    <i class="fab fa-whatsapp"></i> Buy Now
                                </a>
                            </div>

                            <?php
                            // Fetch all product media for gallery
                            $gallery_stmt = $conn->prepare("SELECT * FROM product_media WHERE product_id = ?");
                            $gallery_stmt->bind_param("i", $product['id']);
                            $gallery_stmt->execute();
                            $gallery = $gallery_stmt->get_result();

                            if ($gallery->num_rows > 1):
                                ?>
                                <div class="product-gallery">
                                    <?php while ($item = $gallery->fetch_assoc()): ?>
                                        <div class="gallery-item"
                                            onclick="openModal('<?= BASE_URL . $item['media_url'] ?>', '<?= $item['media_type'] ?>')">
                                            <?php if ($item['media_type'] === 'photo'): ?>
                                                <img src="<?= BASE_URL . $item['media_url'] ?>" alt="Product view" loading="lazy">
                                            <?php else: ?>
                                                <div class="video-thumbnail">
                                                    <i class="fas fa-play"></i>
                                                    <video src="<?= BASE_URL . $item['media_url'] ?>"></video>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    <?php endwhile; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php endif; ?>
        </section>

        <section class="section text-center">
            <div class="custom-order">
                <h2>Looking for Custom Orders?</h2>
                <p>We can create custom jute products tailored to your specific needs.</p>
                <?php
                $custom_message = "Hi, I'm interested in placing a custom order for jute products. Can you help me with the details?";
                $custom_whatsapp_url = "https://wa.me/919831343210?text=" . urlencode($custom_message);
                ?>
                <a href="<?= $custom_whatsapp_url ?>" class="btn btn-accent" target="_blank">
                    <i class="fab fa-whatsapp"></i> Contact for Custom Orders
                </a>
            </div>
        </section>
    </div>
</main>

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
    .products-filters {
        display: flex;
        gap: 1rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .search-box {
        flex: 1;
        min-width: 250px;
        position: relative;
    }

    .search-box input {
        padding-right: 2.5rem;
    }

    .search-box i {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--gray-800);
    }

    .sort-options {
        width: 200px;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .product-card {
        background: var(--white);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .product-image {
        width: 100%;
        height: 300px;
        position: relative;
        overflow: hidden;
        background: var(--gray-100);
    }

    .product-image img,
    .product-image video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img,
    .product-card:hover .product-image video {
        transform: scale(1.05);
    }

    .placeholder-image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: var(--gray-300);
    }

    .product-info {
        padding: 1.5rem;
        text-align: center;
    }

    .product-info h3 {
        margin: 0 0 0.5rem;
        font-size: 1.25rem;
        color: var(--primary-color);
    }

    .product-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary-color);
        margin-bottom: 1rem;
    }

    .product-description {
        color: var(--gray-800);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .buy-now-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .product-gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
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

    .custom-order {
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        padding: 4rem 2rem;
        border-radius: var(--border-radius);
        color: var(--white);
        margin-top: 4rem;
    }

    .custom-order h2 {
        color: var(--white);
        margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
        .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .product-image {
            height: 250px;
        }

        .product-gallery {
            grid-template-columns: repeat(3, 1fr);
        }

        .products-filters {
            flex-direction: column;
            align-items: stretch;
        }

        .sort-options {
            width: 100%;
        }
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('searchInput');
        const productCards = document.querySelectorAll('.product-card');

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('.product-description').textContent.toLowerCase();

                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        const sortSelect = document.getElementById('sortSelect');

        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            const productsGrid = document.querySelector('.products-grid');
            const products = Array.from(productCards);

            products.sort((a, b) => {
                switch (sortValue) {
                    case 'price-low':
                        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                    case 'price-high':
                        return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                    case 'newest':
                        return parseInt(b.dataset.date) - parseInt(a.dataset.date);
                    default:
                        return 0;
                }
            });

            products.forEach(product => productsGrid.appendChild(product));
        });

        const videos = document.querySelectorAll('.product-image video');
        videos.forEach(video => {
            video.addEventListener('mouseover', function () {
                this.play();
            });
            video.addEventListener('mouseout', function () {
                this.pause();
                this.currentTime = 0;
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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

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