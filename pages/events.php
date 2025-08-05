<?php
$pageTitle = "Our Events";
include '../includes/header.php';
?>

<!-- Events Page Content -->
<section class="page-header">
    <div class="container">
        <h1>Our Events</h1>
        <p>Celebrations, gatherings, and activities that bring our community together</p>
    </div>
</section>

<!-- Events Section -->
<section class="events-section">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Activities</span>
            <h2 class="section-title">Upcoming & Past Events</h2>
        </div>

        <div class="events-filter">
            <button class="filter-btn active" data-filter="all">All Events</button>
            <button class="filter-btn" data-filter="upcoming">Upcoming</button>
            <button class="filter-btn" data-filter="past">Past Events</button>
        </div>

        <div class="events-grid">
            <div class="event-card" data-category="past">
                <div class="event-image">
                    <img src="/assets/images/event-prize-day.jpg" alt="Annual Prize Day">
                    <div class="event-date">
                        <span class="date-day">15</span>
                        <span class="date-month">Dec</span>
                        <span class="date-year">2023</span>
                    </div>
                </div>
                <div class="event-content">
                    <h3>Annual Prize Day</h3>
                    <p class="event-excerpt">Celebration of academic excellence rewarding top-performing students with
                        school fee sponsorships from generous donors.</p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>


            <div class="event-card" data-category="past">
                <div class="event-image">
                    <img src="/assets/images/event-teachers-day.jpg" alt="Teachers' Day Celebration">
                    <div class="event-date">
                        <span class="date-day">05</span>
                        <span class="date-month">Sep</span>
                        <span class="date-year">2023</span>
                    </div>
                </div>
                <div class="event-content">
                    <h3>Teachers' Day Celebration</h3>
                    <p class="event-excerpt">Honoring the dedication and contributions of our educators with special
                        performances and student-led activities.</p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>


            <div class="event-card" data-category="upcoming">
                <div class="event-image">
                    <img src="/assets/images/event-childrens-day.jpg" alt="Children's Day">
                    <div class="event-date">
                        <span class="date-day">14</span>
                        <span class="date-month">Nov</span>
                        <span class="date-year">2023</span>
                    </div>
                </div>
                <div class="event-content">
                    <h3>Children's Day</h3>
                    <p class="event-excerpt">A day of fun, games, and bonding activities across all centers to make our
                        children feel special and celebrated.</p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>


            <div class="event-card" data-category="upcoming">
                <div class="event-image">
                    <img src="/assets/images/event-winter-carnival.jpg" alt="Winter Carnival">
                    <div class="event-date">
                        <span class="date-day">23</span>
                        <span class="date-month">Dec</span>
                        <span class="date-year">2023</span>
                    </div>
                </div>
                <div class="event-content">
                    <h3>Winter Carnival</h3>
                    <p class="event-excerpt">A joyful gathering with games, food, and cultural performances to bring
                        together students, parents, and the local community.</p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Event Categories -->
<section class="event-categories">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Types</span>
            <h2 class="section-title">Our Regular Events</h2>
        </div>

        <div class="categories-grid">
            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>Annual Prize Day</h3>
                <p>Celebrating academic achievements and rewarding meritorious students.</p>
            </div>

            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h3>Teachers' Day</h3>
                <p>Honoring our dedicated educators with special programs.</p>
            </div>

            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-child"></i>
                </div>
                <h3>Children's Day</h3>
                <p>A fun-filled day dedicated to our students' happiness.</p>
            </div>

            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-snowflake"></i>
                </div>
                <h3>Winter Carnival</h3>
                <p>Community gathering with games and performances.</p>
            </div>

            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-bus"></i>
                </div>
                <h3>Educational Excursions</h3>
                <p>Trips to places like Shantiniketan for cultural exposure.</p>
            </div>

            <div class="category-card">
                <div class="category-icon">
                    <i class="fas fa-heartbeat"></i>
                </div>
                <h3>Health Camps</h3>
                <p>Free medical checkups and awareness programs.</p>
            </div>
        </div>
    </div>
</section>

<?php include '../includes/footer.php'; ?>