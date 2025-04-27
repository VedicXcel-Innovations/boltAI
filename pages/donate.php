<?php
$pageTitle = "Donate";
include '../includes/header.php';
?>

<section class="donation">
    <div class="container">
        <h1 class="section-title">Make a Donation</h1>

        <div class="donation-container">
            <div class="donation-header">
                <h2>Support Our Cause</h2>
                <p>Your contribution will help us reach more children in need across India.</p>
            </div>

            <form class="donation-form">
                <h3>Select Donation Amount</h3>
                <div class="donation-options">
                    <div class="amount-option" data-amount="500">₹500</div>
                    <div class="amount-option" data-amount="1000">₹1000</div>
                    <div class="amount-option" data-amount="2000">₹2000</div>
                    <div class="amount-option" data-amount="5000">₹5000</div>
                </div>

                <div class="form-group">
                    <label for="custom-amount">Or enter your amount (₹)</label>
                    <input type="number" id="custom-amount" name="amount" min="100" placeholder="Enter amount">
                </div>

                <h3>Personal Information</h3>
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your full name">
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="Your email address">
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your phone number">
                </div>

                <h3>Payment Method</h3>
                <div class="form-group">
                    <select name="payment-method" required>
                        <option value="">Select payment method</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="net-banking">Net Banking</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>

                <div class="form-group">
                    <input type="checkbox" id="recurring" name="recurring">
                    <label for="recurring">Make this a monthly recurring donation</label>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Donate Now</button>
            </form>

            <div class="donation-impact">
                <h3>How Your Donation Helps</h3>
                <ul>
                    <li>₹500 provides school supplies for 1 child</li>
                    <li>₹1000 supports a child's nutrition for a month</li>
                    <li>₹2000 helps educate a child for 6 months</li>
                    <li>₹5000 provides healthcare for 5 children</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<?php include '../includes/footer.php'; ?>