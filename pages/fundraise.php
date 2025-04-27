<?php
$pageTitle = "Support Our Cause | Fundraiser";
$pageDescription = "Join us in making a difference. Donate to our fundraiser and help us create positive change in our community.";
include '../includes/header.php';
?>

<div class="new-fundraiser-hero">
    <div class="new-hero-overlay">
        <div class="new-hero-content">
            <h1>Help Us Build a Better Future</h1>
            <p>Your donation today can transform lives tomorrow</p>
            <a href="#donate-now" class="new-donate-button">Donate Now</a>
        </div>
    </div>
</div>

<div class="new-fundraiser-container">
    <section class="new-campaign-section">
        <div class="new-section-header">
            <h2>Our Current Campaign</h2>
            <div class="new-progress-container">
                <div class="new-progress-bar">
                    <div class="new-progress-fill" style="width: 65%;"></div>
                </div>
                <div class="new-progress-stats">
                    <span class="new-amount-raised">₹1,95,000 raised</span>
                    <span class="new-goal-amount">of ₹3,00,000 goal</span>
                </div>
            </div>
        </div>

        <div class="new-campaign-content">
            <div class="new-campaign-image">
                <img src="/assets/images/fundraiser-children.jpg" alt="Children benefiting from our programs">
            </div>
            <div class="new-campaign-text">
                <h3>Education for Underprivileged Children</h3>
                <p>We're on a mission to provide quality education to 200 children in rural areas who currently have no access to schools. Your support will help us:</p>
                <ul class="new-campaign-list">
                    <li>Build a new school with proper facilities</li>
                    <li>Provide books and learning materials</li>
                    <li>Train local teachers</li>
                    <li>Offer nutritious midday meals</li>
                    <li>Support children's transportation</li>
                </ul>
                <p>Every contribution, no matter how small, brings us closer to our goal of breaking the cycle of poverty through education.</p>
            </div>
        </div>
    </section>

    <section class="new-impact-section">
        <h2>Your Impact</h2>
        <div class="new-impact-grid">
            <div class="new-impact-card">
                <div class="new-impact-icon">
                    <img src="/assets/images/icon-education.png" alt="Education icon">
                </div>
                <div class="new-impact-text">
                    <h3>₹500</h3>
                    <p>Provides school supplies for one child for a year</p>
                </div>
            </div>
            <div class="new-impact-card">
                <div class="new-impact-icon">
                    <img src="/assets/images/icon-meal.png" alt="Meal icon">
                </div>
                <div class="new-impact-text">
                    <h3>₹1,000</h3>
                    <p>Feeds a child nutritious meals for a month</p>
                </div>
            </div>
            <div class="new-impact-card">
                <div class="new-impact-icon">
                    <img src="/assets/images/icon-school.png" alt="School icon">
                </div>
                <div class="new-impact-text">
                    <h3>₹5,000</h3>
                    <p>Sponsors a child's education for an entire year</p>
                </div>
            </div>
            <div class="new-impact-card">
                <div class="new-impact-icon">
                    <img src="/assets/images/icon-teacher.png" alt="Teacher icon">
                </div>
                <div class="new-impact-text">
                    <h3>₹10,000</h3>
                    <p>Supports teacher training for better education</p>
                </div>
            </div>
        </div>
    </section>

    <section class="new-gallery-section">
        <h2>See Our Work in Action</h2>
        <div class="new-gallery-grid">
            <div class="new-gallery-item">
                <img src="/assets/images/gallery-1.jpg" alt="Children in classroom">
                <div class="new-gallery-caption">Our current temporary learning center</div>
            </div>
            <div class="new-gallery-item">
                <img src="/assets/images/gallery-2.jpg" alt="Teacher with students">
                <div class="new-gallery-caption">Dedicated teachers making a difference</div>
            </div>
            <div class="new-gallery-item">
                <img src="/assets/images/gallery-3.jpg" alt="Happy children">
                <div class="new-gallery-caption">Students who benefit from your support</div>
            </div>
            <div class="new-gallery-item">
                <img src="/assets/images/gallery-4.jpg" alt="School construction">
                <div class="new-gallery-caption">Progress on our new school building</div>
            </div>
        </div>
    </section>

    <section class="new-testimonial-section">
        <h2>Stories of Change</h2>
        <div class="new-testimonial-slider">
            <div class="new-testimonial-card">
                <div class="new-testimonial-content">
                    <p>"Because of supporters like you, my daughter Priya can now read and write. She dreams of becoming a doctor someday."</p>
                </div>
                <div class="new-testimonial-author">
                    <img src="/assets/images/testimonial-1.jpg" alt="Ramesh Kumar">
                    <div class="new-author-info">
                        <h4>Ramesh Kumar</h4>
                        <p>Parent, Village Elder</p>
                    </div>
                </div>
            </div>
            <div class="new-testimonial-card">
                <div class="new-testimonial-content">
                    <p>"I've seen firsthand how education transforms these children's lives. They're more confident and hopeful about their futures."</p>
                </div>
                <div class="new-testimonial-author">
                    <img src="/assets/images/testimonial-2.jpg" alt="Anita Sharma">
                    <div class="new-author-info">
                        <h4>Anita Sharma</h4>
                        <p>Volunteer Teacher</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="donate-now" class="new-donation-section">
        <div class="new-donation-form-container">
            <h2>Make a Difference Today</h2>
            <form class="new-donation-form">
                <div class="new-form-group">
                    <label for="amount">Select Donation Amount (₹)</label>
                    <div class="new-amount-options">
                        <button type="button" class="new-amount-option">500</button>
                        <button type="button" class="new-amount-option">1,000</button>
                        <button type="button" class="new-amount-option">2,000</button>
                        <button type="button" class="new-amount-option">5,000</button>
                        <button type="button" class="new-amount-option">10,000</button>
                    </div>
                    <div class="new-custom-amount">
                        <input type="number" id="amount" name="amount" placeholder="Or enter custom amount">
                    </div>
                </div>
                <div class="new-form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="new-form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="new-form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="new-form-group">
                    <label>
                        <input type="checkbox" name="recurring"> Make this a monthly donation
                    </label>
                </div>
                <button type="submit" class="new-submit-button">Donate Now</button>
            </form>
        </div>
        <div class="new-donation-info">
            <h3>Other Ways to Support</h3>
            <ul class="new-support-options">
                <li>
                    <h4>Bank Transfer</h4>
                    <p>Account Name: Gyan Deepak Foundation<br>
                    Account Number: 1234567890<br>
                    IFSC Code: ABCD0123456<br>
                    Bank: State Bank of India</p>
                </li>
                <li>
                    <h4>Cheque/Demand Draft</h4>
                    <p>Payable to "Gyan Deepak Foundation"<br>
                    Mail to: 123 Gyan Deepak Avenue, Mumbai, India</p>
                </li>
                <li>
                    <h4>Volunteer</h4>
                    <p>Give your time and skills to support our mission</p>
                </li>
                <li>
                    <h4>Corporate Partnerships</h4>
                    <p>Explore how your company can make an impact</p>
                </li>
            </ul>
        </div>
    </section>

    <section class="new-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="new-faq-accordion">
            <div class="new-faq-item">
                <button class="new-faq-question">How will my donation be used?</button>
                <div class="new-faq-answer">
                    <p>Your donation will directly support our Education for Underprivileged Children program. Funds are allocated to school construction (40%), educational materials (30%), teacher salaries (20%), and administrative costs (10%). We publish annual financial reports for complete transparency.</p>
                </div>
            </div>
            <div class="new-faq-item">
                <button class="new-faq-question">Is my donation tax-deductible?</button>
                <div class="new-faq-answer">
                    <p>Yes, Gyan Deepak Foundation is registered under Section 80G of the Income Tax Act. Donations are eligible for 50% tax exemption. You will receive a receipt with our 80G certification for your tax records.</p>
                </div>
            </div>
            <div class="new-faq-item">
                <button class="new-faq-question">Can I visit the projects I support?</button>
                <div class="new-faq-answer">
                    <p>Absolutely! We encourage donors to see their impact firsthand. Contact us to arrange a visit to our education centers. We organize donor visits quarterly.</p>
                </div>
            </div>
            <div class="new-faq-item">
                <button class="new-faq-question">How can I get updates on the project?</button>
                <div class="new-faq-answer">
                    <p>All donors receive monthly email updates with photos and progress reports. You can also follow us on social media for regular updates or contact our donor relations team anytime.</p>
                </div>
            </div>
        </div>
    </section>
</div>

<?php include '../includes/footer.php'; ?>