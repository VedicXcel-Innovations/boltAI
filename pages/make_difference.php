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
                            <a href="#registrationForm" class="btn btn-primary mt-3">Volunteer Now</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="feature-icon me-3"><i class="fas fa-briefcase"></i></div>
                                <h3 class="mb-0">&nbsp;Careers</h3>
                            </div>
                            <p>Explore rewarding roles in program management, field coordination, and advocacy. Become
                                part of a dynamic team committed to meaningful change.</p>
                            <ul class="mt-3">
                                <li>Program Coordinators</li>
                                <li>Field Officers</li>
                                <li>Community Mobilizers</li>
                                <li>Administrative Support</li>
                            </ul>
                            <a href="#registrationForm" class="btn btn-primary mt-3">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="registrationForm">
            <h2>Registration</h2>
            <div class="card shadow p-4">
                <form id="registrationForm" onsubmit="submitRegistrationForm(event)">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="contact_no" class="form-label">Contact No</label>
                        <input type="tel" id="contact_no" name="contact_no" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="scope" class="form-label">Choose Scope</label>
                        <select id="scope" name="scope" class="form-control" required onchange="updateAreaOptions()">
                            <option value="">Select scope...</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Career">Career</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="area" class="form-label">Area of Interest</label>
                        <select id="area" name="area" class="form-control" required onchange="toggleOtherArea()">
                            <option value="">Select an option</option>
                        </select>
                    </div>

                    <div class="mb-3" id="otherAreaContainer" style="display: none;">
                        <label for="other_area" class="form-label">Specify Area of Interest</label>
                        <input type="text" id="other_area" name="other_area" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">Why do you want to join us?</label>
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
    function updateAreaOptions() {
        const scope = document.getElementById('scope').value;
        const areaSelect = document.getElementById('area');
        const options = [];

        if (scope === 'Volunteer') {
            options.push(
                { value: 'Field Volunteer', label: 'Field Volunteer' },
                { value: 'Education', label: 'Education' },
                { value: 'Health', label: 'Health' },
                { value: 'Environment', label: 'Environment' },
                { value: 'Event Management', label: 'Event Management' },
                { value: 'Others', label: 'Others' }
            );
        } else if (scope === 'Career') {
            options.push(
                { value: 'Field Officer', label: 'Field Officer' },
                { value: 'Program Coordinators', label: 'Program Coordinators' },
                { value: 'Community Mobilizers', label: 'Community Mobilizers' },
                { value: 'Administrative Support', label: 'Administrative Support' },
                { value: 'Others', label: 'Others' }
            );
        }

        areaSelect.innerHTML = '<option value="">Select an option</option>';

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            areaSelect.appendChild(optionElement);
        });

        toggleOtherArea();
    }

    function toggleOtherArea() {
        const area = document.getElementById('area').value;
        const otherAreaContainer = document.getElementById('otherAreaContainer');
        const otherAreaInput = document.getElementById('other_area');

        if (area === 'Others') {
            otherAreaContainer.style.display = 'block';
            otherAreaInput.required = true;
        } else {
            otherAreaContainer.style.display = 'none';
            otherAreaInput.required = false;
            otherAreaInput.value = '';
        }
    }

    function submitRegistrationForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        fetch(window.location.origin + '/php/save_application.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you! Your application has been submitted successfully.');
                    form.reset();
                    updateAreaOptions();
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