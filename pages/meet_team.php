<?php
include '../config.php';
include '../templates/header.php';
include '../php/db_config.php';

// Fetch team members from database
$query = "SELECT * FROM team_members ORDER BY created_at DESC";
$team_members = $conn->query($query);
?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Meet Our Team</h1>
            <p>The passionate individuals driving positive change in our communities</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="founder-message card shadow p-4 mb-5">
                <div class="grid">
                    <div class="col-12 col-sm-3">
                        <div class="founder-image">
                            <img src="<?= BASE_URL ?>images/logo.png" alt="Founder" class="rounded-circle shadow"
                                style="width: 200px; height: 200px; object-fit: cover;">
                        </div>
                    </div>
                    <div class="col-12 col-sm-9">
                        <h2 class="mb-3">Secretary/Founder's Message</h2>
                        <blockquote class="founder-quote">
                            <p>"Our journey is powered by the unwavering support and collaboration of individuals and
                                organizations who share our vision. Together, we continue to drive sustainable
                                development and transform lives for a brighter future."</p>
                            <footer class="mt-3">
                                <strong>&nbsp;Pramod Kumar Verma</strong>
                                <div class="text-muted">&nbsp;Secretary & Founder</div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            <div class="governing-body mb-5">
                <h2 class="mb-3">Governing Body</h2>
                <div class="card shadow p-4">
                    <p class="text-center mb-4">The Governing Body of JSVK comprises experienced professionals from
                        diverse fields. They provide strategic leadership and ensure that the organization operates
                        transparently and ethically, maintaining its commitment to the communities it serves.</p>

                    <div class="stats">
                        <div class="stat">
                            <div class="stat-number">15+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">12</div>
                            <div class="stat-label">Board Members</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">100+</div>
                            <div class="stat-label">Projects Overseen</div>
                        </div>
                    </div>
                </div>
            </div>

            <?php if ($team_members->num_rows > 0): ?>
                <h2 class="mb-3">Our Team Members</h2>
                <div class="team-grid">
                    <?php while ($member = $team_members->fetch_assoc()): ?>
                        <div class="team-member-card" data-aos="fade-up">
                            <?php
                            $media_stmt = $conn->prepare("SELECT * FROM team_media WHERE team_member_id = ? LIMIT 1");
                            $media_stmt->bind_param("i", $member['id']);
                            $media_stmt->execute();
                            $media = $media_stmt->get_result()->fetch_assoc();
                            ?>

                            <div class="member-image">
                                <?php if ($media): ?>
                                    <img src="<?= BASE_URL . $media['media_url'] ?>" alt="<?= htmlspecialchars($member['name']) ?>"
                                        loading="lazy">
                                <?php else: ?>
                                    <div class="placeholder-image">
                                        <i class="fas fa-user"></i>
                                    </div>
                                <?php endif; ?>
                            </div>

                            <div class="member-info">
                                <h3><?= htmlspecialchars($member['name']) ?></h3>
                                <div class="member-role"><?= htmlspecialchars($member['role']) ?></div>
                                <p class="member-message"><?= htmlspecialchars($member['message']) ?></p>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php else: ?>
                <div class="text-center">
                    <p>Team members will be added soon.</p>
                </div>
            <?php endif; ?>
        </section>
    </div>
</main>

<style>
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .team-member-card {
        background: var(--white);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .team-member-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .member-image {
        width: 100%;
        height: 300px;
        position: relative;
        overflow: hidden;
    }

    .member-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .team-member-card:hover .member-image img {
        transform: scale(1.05);
    }

    .placeholder-image {
        width: 100%;
        height: 100%;
        background: var(--gray-200);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        color: var(--gray-400);
    }

    .member-info {
        padding: 1.5rem;
        text-align: center;
    }

    .member-info h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--primary-color);
    }

    .member-role {
        color: var(--secondary-color);
        font-weight: 500;
        margin: 0.5rem 0 1rem;
    }

    .member-message {
        color: var(--gray-800);
        font-size: 0.95rem;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .member-social {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .social-icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: var(--gray-100);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        transition: var(--transition);
    }

    .social-icon:hover {
        background: var(--primary-color);
        color: var(--white);
        transform: translateY(-2px);
    }

    .founder-quote {
        font-style: italic;
        color: var(--gray-800);
        border-left: 4px solid var(--secondary-color);
        padding-left: 1.5rem;
        margin: 0;
    }

    .founder-quote p {
        font-size: 1.2rem;
        line-height: 1.8;
    }

    .founder-quote footer {
        margin-top: 1rem;
        font-style: normal;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .team-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .member-image {
            height: 250px;
        }

        .founder-message .grid {
            text-align: center;
        }

        .founder-image {
            margin-bottom: 2rem;
        }

        .founder-image img {
            margin: 0 auto;
        }
    }

    /* Animation classes */
    [data-aos="fade-up"] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    [data-aos="fade-up"].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });
    });
</script>

<?php
$conn->close();
include '../templates/footer.php';
?>