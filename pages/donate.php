<?php
$pageTitle = "Donation";
include '../includes/header.php';
?>

<!-- Get Involved Page Content -->
<section class="page-header">
    <div class="container">
        <h1>Become a Philanthropist</h1>
        <p>Together, We Can Make a Difference</p>
    </div>
</section>

<section class="new-impact-section">
    <div class="section-header">
        <span class="section-subtitle">Your Impact</span>
    </div>
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
                <img src="/assets/images/icon-support.png" alt="Support icon">
            </div>
            <div class="new-impact-text">
                <h3>₹2,500</h3>
                <p>Provides health checkups and learning materials</p>
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
                <img src="/assets/images/icon-training.png" alt="Training icon">
            </div>
            <div class="new-impact-text">
                <h3>₹7,500</h3>
                <p>Equips a classroom with digital learning tools</p>
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
        </ul>
    </div>
</section>

<?php include '../includes/footer.php'; ?>