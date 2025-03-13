<?php include '../config.php'; ?>
<?php include '../templates/header.php'; ?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Make a Difference</h1>
            <p>Join us in our mission to create positive change in communities across Jharkhand</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <h2>Join Us</h2>
            <p>At JSVK, we believe that everyone can contribute to creating a better world. Join us as a volunteer or
                through one of our professional opportunities.</p>

            <div class="grid mt-4">
                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="feature-icon me-3"><i class="fas fa-hands-helping"></i></div>
                                <h3 class="mb-0">&nbsp;Volunteer</h3>
                            </div>
                            <p>Lend your time and skills to our projects, whether in education, community engagement, or
                                environmental conservation. Volunteers are vital in expanding the reach and impact of
                                our initiatives.</p>
                            <ul class="mt-3">
                                <li>Field volunteers for community programs</li>
                                <li>Skill-sharing in arts, crafts, and education</li>
                                <li>Event organization and management</li>
                                <li>Documentation and content creation</li>
                            </ul>
                            <a href="#volunteerForm" class="btn btn-primary mt-3">Volunteer Now</a>
                        </div>
                    </div>
                </div>
        </section>

        <section class="section">
            <h2>Career Opportunities</h2>
            <div class="grid mt-4">
                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow p-4 mb-4">
                        <h3>Program Coordinator - Child Protection</h3>
                        <p><strong>Location:</strong> Ranchi, Jharkhand</p>
                        <p><strong>Experience:</strong> 3-5 years in child welfare or related field</p>
                        <p>We are looking for a dedicated Program Coordinator to oversee our Child Protection
                            initiatives. The
                            ideal candidate will have experience in child welfare programs and strong project
                            management skills.
                        </p>
                        <a href="#" class="btn btn-outline">Apply Now</a>
                    </div>

                    <div class="card shadow p-4 mb-4">
                        <h3>Field Officer - Livelihood Programs</h3>
                        <p><strong>Location:</strong> Gumla, Jharkhand</p>
                        <p><strong>Experience:</strong> 2-3 years in community development</p>
                        <p>Join our team as a Field Officer to implement livelihood enhancement programs in
                            rural communities.
                            The role involves community mobilization, training coordination, and impact
                            assessment.</p>
                        <a href="#" class="btn btn-outline">Apply Now</a>
                    </div>

                    <div class="card shadow p-4">
                        <h3>Administrative Assistant</h3>
                        <p><strong>Location:</strong> Ranchi, Jharkhand</p>
                        <p><strong>Experience:</strong> 1-2 years in office administration</p>
                        <p>We are seeking an Administrative Assistant to support our operations team.
                            Responsibilities include
                            documentation, correspondence, and general administrative tasks.</p>
                        <a href="#" class="btn btn-outline">Apply Now</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="volunteerForm">
            <h2>Volunteer Registration</h2>
            <div class="card shadow p-4">
                <form id="volunteerForm" onsubmit="submitVolunteerForm(event)">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="tel" id="phone" name="phone" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="area" class="form-label">Area of Interest</label>
                        <select id="area" name="area" class="form-control" required>
                            <option value="">Select an option</option>
                            <option value="education">Education</option>
                            <option value="health">Health</option>
                            <option value="environment">Environment</option>
                            <option value="livelihood">Livelihood</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">Why do you want to volunteer?</label>
                        <textarea id="message" name="message" class="form-control" rows="4" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Submit Application</button>
                </form>
            </div>
        </section>

        <section class="section">
            <h2>Support Us</h2>
            <p>Your contributions drive change. Donate to support education, healthcare, livelihood programs, and
                environmental conservation. We ensure every donation is used effectively to maximize impact.</p>

            <div class="card shadow p-4 mt-4">
                <h3 class="text-center mb-4">Make a Donation</h3>
                <div class="grid">
                    <div class="col-12 col-sm-6">
                        <div class="mb-4">
                            <h4>How Your Donation Helps</h4>
                            <ul>
                                <li>₹1,000 provides educational materials for 5 children</li>
                                <li>₹5,000 supports vocational training for 1 woman</li>
                                <li>₹10,000 funds a health camp for a village</li>
                                <li>₹25,000 enables the planting of 1000 trees</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Donation Methods</h4>
                            <p>You can donate through bank transfer, online payment, or by cheque.</p>
                            <div class="d-flex gap-2 mt-3">
                                <button class="btn btn-accent">Bank Transfer</button>
                                <button class="btn btn-primary">Online Payment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<style>
    html {
        scroll-behavior: smooth;
    }

    .form-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    .form-control {
        border: 1px solid var(--gray-300);
        transition: all 0.3s ease;
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
    }

    .form-control:focus {
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 0.2rem rgba(15, 170, 175, 0.25);
    }

    @media (max-width: 576px) {
        .card {
            padding: 1rem;
        }

        .form-control {
            padding: 0.4rem;
        }
    }
</style>

<script>
    function submitVolunteerForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        fetch('<?= BASE_URL ?>php/save_volunteer.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you! Your volunteer application has been submitted successfully.');
                    form.reset();
                } else {
                    alert('Error submitting application. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting application. Please try again.');
            });
    }
</script>

<?php include '../templates/footer.php'; ?>