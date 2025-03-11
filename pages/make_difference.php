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
                                <h3 class="mb-0">Volunteer</h3>
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
                            <a href="#volunteer-form" class="btn btn-primary mt-3">Volunteer Now</a>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div class="feature-icon me-3"><i class="fas fa-briefcase"></i></div>
                                <h3 class="mb-0">Careers</h3>
                            </div>
                            <p>Explore rewarding roles in program management, field coordination, and advocacy. Become
                                part of a dynamic team committed to meaningful change.</p>
                            <ul class="mt-3">
                                <li>Program Coordinators</li>
                                <li>Field Officers</li>
                                <li>Community Mobilizers</li>
                                <li>Administrative Support</li>
                            </ul>
                            <a href="#career-opportunities" class="btn btn-primary mt-3">View Opportunities</a>
                        </div>
                    </div>
                </div>
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
                                <li>₹25,000 enables the planting of 100 trees</li>
                            </ul>
                        </div>

                        <div>
                            <h4>Donation Methods</h4>
                            <p>You can donate through bank transfer, online payment, or by check.</p>
                            <div class="d-flex gap-2 mt-3">
                                <button class="btn btn-accent">Bank Transfer</button>
                                <button class="btn btn-primary">Online Payment</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6">
                        <form id="donation-form" class="p-3 bg-light rounded">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" id="name" class="form-control" placeholder="Your Name" required>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" class="form-control" placeholder="Your Email" required>
                            </div>
                            <div class="mb-3">
                                <label for="amount" class="form-label">Donation Amount (₹)</label>
                                <input type="number" id="amount" class="form-control" placeholder="Amount" required>
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message (Optional)</label>
                                <textarea id="message" class="form-control" rows="3"
                                    placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-accent w-100">Donate Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="volunteer-form">
            <h2>Volunteer Registration</h2>
            <div class="card shadow p-4">
                <form>
                    <div class="grid">
                        <div class="col-12 col-sm-6 mb-3">
                            <label for="volunteer-name" class="form-label">Full Name</label>
                            <input type="text" id="volunteer-name" class="form-control" required>
                        </div>
                        <div class="col-12 col-sm-6 mb-3">
                            <label for="volunteer-email" class="form-label">Email</label>
                            <input type="email" id="volunteer-email" class="form-control" required>
                        </div>
                        <div class="col-12 col-sm-6 mb-3">
                            <label for="volunteer-phone" class="form-label">Phone</label>
                            <input type="tel" id="volunteer-phone" class="form-control" required>
                        </div>
                        <div class="col-12 col-sm-6 mb-3">
                            <label for="volunteer-area" class="form-label">Area of Interest</label>
                            <select id="volunteer-area" class="form-control" required>
                                <option value="">Select an option</option>
                                <option value="education">Education</option>
                                <option value="health">Health</option>
                                <option value="environment">Environment</option>
                                <option value="livelihood">Livelihood</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="col-12 mb-3">
                            <label for="volunteer-message" class="form-label">Why do you want to volunteer?</label>
                            <textarea id="volunteer-message" class="form-control" rows="4" required></textarea>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Submit Application</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>

        <section class="section" id="career-opportunities">
            <h2>Career Opportunities</h2>
            <div class="card shadow p-4 mb-4">
                <h3>Program Coordinator - Child Protection</h3>
                <p><strong>Location:</strong> Ranchi, Jharkhand</p>
                <p><strong>Experience:</strong> 3-5 years in child welfare or related field</p>
                <p>We are looking for a dedicated Program Coordinator to oversee our Child Protection initiatives. The
                    ideal candidate will have experience in child welfare programs and strong project management skills.
                </p>
                <a href="#" class="btn btn-outline">Apply Now</a>
            </div>

            <div class="card shadow p-4 mb-4">
                <h3>Field Officer - Livelihood Programs</h3>
                <p><strong>Location:</strong> Gumla, Jharkhand</p>
                <p><strong>Experience:</strong> 2-3 years in community development</p>
                <p>Join our team as a Field Officer to implement livelihood enhancement programs in rural communities.
                    The role involves community mobilization, training coordination, and impact assessment.</p>
                <a href="#" class="btn btn-outline">Apply Now</a>
            </div>

            <div class="card shadow p-4">
                <h3>Administrative Assistant</h3>
                <p><strong>Location:</strong> Ranchi, Jharkhand</p>
                <p><strong>Experience:</strong> 1-2 years in office administration</p>
                <p>We are seeking an Administrative Assistant to support our operations team. Responsibilities include
                    documentation, correspondence, and general administrative tasks.</p>
                <a href="#" class="btn btn-outline">Apply Now</a>
            </div>
        </section>
    </div>
</main>

<?php include '../templates/footer.php'; ?>