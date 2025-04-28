<?php
$pageTitle = "Contact Us";
include '../includes/header.php';
?>

<!-- Contact Page Content -->
<section class="page-header">
    <div class="container">
        <h1>Get In Touch</h1>
        <p>We would love to hear from you</p>
    </div>
</section>

<section class="contact-section">
    <div class="container">
        <div class="contact-container">
            <div class="contact-info">
                <h2>Contact Information</h2>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>123 CRY Avenue, Mumbai, Maharashtra 400001, India</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone"></i>
                    <p>+91 1234567890</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <p>info@cry.org</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="map-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755837752808!2d72.8282143153771!3d19.02798725863492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee7b3f3c0a1%3A0x8a7e5b7e5b7e5b7e!2sCRY%20-%20Child%20Rights%20and%20You!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
</section>

<section>
    <div class="contact-form">
        <h2>Send Us a Message</h2>
        <form action="/submit-contact" method="POST">
            <div class="form-group">
                <input type="text" name="name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <input type="tel" name="phone" placeholder="Your Phone">
            </div>
            <div class="form-group">
                <select name="subject" required>
                    <option value="">Select Subject</option>
                    <option value="donation">Donation Query</option>
                    <option value="volunteer">Volunteer Opportunity</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
    </div>
</section>

<?php include '../includes/footer.php'; ?>