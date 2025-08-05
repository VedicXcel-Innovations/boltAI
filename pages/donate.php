<?php
$pageTitle = "Donation";
include '../includes/header.php';
?>

<!-- Donate Page Content -->
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

<section id="donate-now" class="donation-section">
    <div class="donation-container">
        <div class="donation-card">
            <div class="donation-header">
                <h2>Make Your Contribution</h2>
                <p>Every donation makes a difference in a child's life</p>
            </div>

            <form class="donation-form" id="donationForm">
                <div class="amount-selector">
                    <label>Select Amount (₹)</label>
                    <div class="amount-grid">
                        <button type="button" class="amount-btn" data-amount="500">₹500</button>
                        <button type="button" class="amount-btn" data-amount="1000">₹1,000</button>
                        <button type="button" class="amount-btn" data-amount="2500">₹2,500</button>
                        <button type="button" class="amount-btn" data-amount="5000">₹5,000</button>
                        <button type="button" class="amount-btn" data-amount="5000">₹7,500</button>
                        <button type="button" class="amount-btn" data-amount="10000">₹10,000</button>
                        <button type="button" class="amount-btn custom-amount">Custom</button>
                    </div>
                    <div class="custom-amount-input" style="display: none;">
                        <input type="number" id="customAmount" placeholder="Enter amount" min="100">
                    </div>
                </div>

                <div class="donation-type">
                    <label>Payment Method</label>
                    <div class="type-toggle">
                        <button type="button" class="type-btn active" data-type="online">Online Payment</button>
                        <button type="button" class="type-btn" data-type="bank">Bank Transfer</button>
                        <button type="button" class="type-btn" data-type="cheque">Cheque Deposit</button>
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone No</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="pan">PAN Details</label>
                        <input type="text" id="pan" name="pan">
                    </div>
                </div>

                <button type="submit" class="donate-btn">
                    <span class="btn-content">
                        <i class="fas fa-heart"></i>
                        <span>Donate Now</span>
                    </span>
                </button>

                <div class="secure-badge">
                    <i class="fas fa-lock"></i>
                    <span>100% Secure Payment</span>
                </div>
            </form>
        </div>

        <div class="donation-info">
            <div class="info-card">
                <h3>Why Donate?</h3>
                <ul class="benefits-list">
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>80G tax benefits available</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Regular updates on impact</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>100% of funds reach beneficiaries</span>
                    </li>
                </ul>
            </div>

            <div class="bank-details">
                <h3>Bank Account Details</h3>
                <div class="bank-info">
                    <div class="bank-row">
                        <span class="label">Account Name:</span>
                        <span class="value">Gyan Deepak Foundation</span>
                    </div>
                    <div class="bank-row">
                        <span class="label">Account Number:</span>
                        <span class="value">1234567890</span>
                    </div>
                    <div class="bank-row">
                        <span class="label">IFSC Code:</span>
                        <span class="value">SBIN0123456</span>
                    </div>
                    <div class="bank-row">
                        <span class="label">Bank Name:</span>
                        <span class="value">State Bank of India</span>
                    </div>
                    <div class="bank-row">
                        <span class="label">Branch:</span>
                        <span class="value">Gariahat, Kolkata</span>
                    </div>
                    <div class="bank-row">
                        <span class="label">Account Type:</span>
                        <span class="value">Current Account</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .donation-section {
        padding: 60px 0;
    }

    .donation-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 30px;
    }

    .donation-card {
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        padding: 40px;
    }

    .donation-header {
        text-align: center;
        margin-bottom: 30px;
    }

    .donation-header h2 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .donation-header p {
        color: #666;
    }

    .amount-selector {
        margin-bottom: 30px;
    }

    .amount-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 10px;
    }

    .amount-btn {
        padding: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        background: white;
        color: #333;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .amount-btn:hover,
    .amount-btn.active {
        background: #F6910E;
        color: white;
        border-color: #F6910E;
    }

    .custom-amount-input {
        margin-top: 15px;
    }

    .custom-amount-input input {
        width: 100%;
        padding: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 1rem;
    }

    .donation-type {
        margin-bottom: 30px;
    }

    .type-toggle {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 10px;
    }

    .type-btn {
        padding: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        background: white;
        color: #333;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .type-btn.active {
        background: #F6910E;
        color: white;
        border-color: #F6910E;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .form-group label {
        color: #333;
        font-weight: 500;
    }

    .form-group input {
        padding: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .form-group input:focus {
        border-color: #F6910E;
        outline: none;
    }

    .donate-btn {
        width: 100%;
        padding: 18px;
        background: #521706;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .donate-btn:hover {
        background: #3a1103;
        transform: translateY(-2px);
    }

    .btn-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .secure-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 20px;
        color: #666;
        font-size: 0.9rem;
    }

    .donation-info {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .info-card {
        background: white;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .info-card h3 {
        color: #333;
        margin-bottom: 20px;
    }

    .benefits-list {
        list-style: none;
        padding: 0;
    }

    .benefits-list li {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        color: #666;
    }

    .benefits-list i {
        color: #FDD831;
    }

    .bank-details {
        background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .bank-details h3 {
        color: #333;
        margin-bottom: 20px;
    }

    .bank-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .bank-row {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    .bank-row:last-child {
        border-bottom: none;
    }

    .bank-row .label {
        color: #666;
        font-weight: 500;
    }

    .bank-row .value {
        color: #333;
        font-weight: 600;
    }

    @media (max-width: 992px) {
        .donation-container {
            grid-template-columns: 1fr;
        }

        .form-grid {
            grid-template-columns: 1fr;
        }

        .amount-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .type-toggle {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 576px) {
        .donation-card {
            padding: 20px;
        }

        .amount-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.querySelector('.custom-amount-input');
        const typeBtns = document.querySelectorAll('.type-btn');

        // Amount button handling
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (btn.classList.contains('custom-amount')) {
                    customAmountInput.style.display = 'block';
                } else {
                    customAmountInput.style.display = 'none';
                }
            });
        });

        // Payment type handling
        typeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                typeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
</script>

<?php include '../includes/footer.php'; ?>