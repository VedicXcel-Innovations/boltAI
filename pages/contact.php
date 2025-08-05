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
        <div class="contact-wrapper">
            <!-- Contact Info -->
            <div class="contact-info-map">
                <div class="modern-contact-info">
                    <div class="contact-card">
                        <h2 class="contact-subtitle">Get in Touch</h2>

                        <div class="info-items">
                            <div class="info-item">
                                <div class="icon-circle">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Visit Us</h3>
                                    <p>55 Gariahat Road, 1st Floor, Suite No 10, Kolkata - 700019</p>
                                </div>
                            </div>

                            <div class="info-item">
                                <div class="icon-circle">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Call Us</h3>
                                    <p><a href="tel:+918240629266">+91 82406 29266</a></p>
                                </div>
                            </div>

                            <div class="info-item">
                                <div class="icon-circle">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Email Us</h3>
                                    <p><a
                                            href="mailto:gyandeepak.ballygunge@gmail.com">gyandeepak.ballygunge@gmail.com</a>
                                    </p>
                                </div>
                            </div>

                            <div class="info-item">
                                <div class="icon-circle">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="info-content">
                                    <h3>Working Hours</h3>
                                    <p>Monday - Friday : 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="modern-contact-form">
                <div class="form-card">
                    <h2 style="color: #333;">Send Us a Message</h2>
                    <p class="form-subtitle">We'll get back to you as soon as possible</p>

                    <form id="contactForm" onsubmit="sendEmail(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name" class="static-label">Name</label>
                                <input type="text" id="name" name="name" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label for="email" class="static-label">Email</label>
                                <input type="email" id="email" name="email" class="form-input" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone" class="static-label">Phone No</label>
                                <input type="tel" id="phone" name="phone" class="form-input">
                            </div>

                            <div class="form-group">
                                <label for="subject" class="static-label">Subject</label>
                                <select id="subject" name="subject" class="form-input" required>
                                    <option value="" selected disabled>Select Subject</option>
                                    <option value="donation">Donation Query</option>
                                    <option value="volunteer">Volunteer Opportunity</option>
                                    <option value="partnership">Partnership Inquiry</option>
                                    <option value="other">Others</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="message" class="static-label">Your Message</label>
                            <textarea id="message" name="message" class="form-input" rows="5" required></textarea>
                        </div>

                        <button type="submit" class="submit-button">
                            <span class="button-content">
                                <i class="fas fa-paper-plane"></i>
                                <span>Send Message</span>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Map Container -->
        <div class="map-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.400693299905!2d88.36330467475584!3d22.5266580346537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276d76cccbd73%3A0xa5a5b8434e7fa010!2sGyan%20Deepak%20Foundation!5e0!3m2!1sen!2sin!4v1745837745090!5m2!1sen!2sin"
                width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </div>
</section>

<style>
    /* Contact Page Styles */
    .contact-wrapper {
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        gap: 40px;
        margin: 60px 0;
    }

    /* Contact Info Card Styles */
    .contact-card {
        background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .contact-subtitle {
        color: #333;
        margin-bottom: 30px;
    }

    .info-items {
        display: grid;
        gap: 20px;
        margin-bottom: 20px;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .icon-circle {
        width: 50px;
        height: 50px;
        background: #f8f9fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #521706;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .info-item:hover .icon-circle {
        background: #521706;
        color: white;
        transform: scale(1.1);
    }

    .info-content h3 {
        color: #333;
        margin-bottom: 5px;
        font-size: 1.1rem;
    }

    .info-content p {
        color: #444;
        margin: 0;
    }

    .info-content a {
        color: #444;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .info-content a:hover {
        color: #521706;
    }

    /* Contact Form Styles */
    .form-card {
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
        border-radius: 20px;
        padding: 40px;
    }

    .form-subtitle {
        color: #666;
        margin-bottom: 30px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 10px;
    }

    .form-group {
        position: relative;
        margin-bottom: 10px;
    }

    .static-label {
        display: block;
        margin-bottom: 5px;
        color: #333;
        font-weight: 500;
    }

    .form-input {
        width: 100%;
        padding: 12px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 1rem;
        background: white;
    }

    select.form-input {
        cursor: pointer;
        appearance: none;
        padding-right: 30px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 16px;
    }

    .submit-button {
        width: 100%;
        padding: 15px 30px;
        background: #521706;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .submit-button:hover {
        background: #3a1103;
        transform: translateY(-2px);
    }

    .button-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* Map Container Styles */
    .map-container {
        width: 100%;
        margin-bottom: 50px;
        border: 2px solid #333;
        border-radius: 20px;
        overflow: hidden;
    }

    .map-container iframe {
        width: 100%;
        height: 400px;
        border: none;
    }

    /* Responsive Design */
    @media (max-width: 992px) {
        .contact-wrapper {
            grid-template-columns: 1fr;
        }

        .form-row {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 768px) {

        .contact-card,
        .form-card {
            padding: 30px;
        }

        .info-item {
            flex-direction: column;
            text-align: center;
        }
    }
</style>

<script>
    function sendEmail(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:gyandeepak.ballygunge@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}`
        )}`;

        window.location.href = mailtoLink;
    }
</script>

<?php include '../includes/footer.php'; ?>