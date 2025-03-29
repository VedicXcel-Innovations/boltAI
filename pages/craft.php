<?php include '../config.php'; ?>
<?php include '../templates/header.php'; ?>

<main>
    <section class="hero bg-primary">
        <div class="container">
            <h1>Craft & Jute Creations</h1>
            <p>Empowering artisans and promoting sustainable livelihoods through eco-friendly crafts</p>
        </div>
    </section>

    <div class="container">
        <section class="section">
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
                    <h2>About Our Initiative</h2>
                    <p>Craft & Jute Creations is JSVK’s flagship initiative that combines livelihood promotion with
                        environmental sustainability. The unit focuses on empowering artisans and reducing plastic
                        pollution through the production of biodegradable jute products.</p>
                    <h2>Objective</h2>
                    <p>The initiative aims to create income opportunities for artisans, especially women and
                        marginalized groups, while promoting sustainable practices. By replacing plastic products with
                        jute alternatives, the program contributes to a healthier environment.</p>
                    <h2>Target Group</h2>
                    <p>The primary beneficiaries include women artisans, tribal communities, and rural youth seeking
                        skill development and economic independence.</p>
                    <div class="d-flex gap-3 mt-4">
                        <a href="<?= BASE_URL ?>pages/products.php" class="btn btn-accent">Our Products</a>
                        <a href="#training" class="btn btn-primary">Our Training</a>
                    </div>
                </div>
                <div class="col-12 col-sm-6">
                    <div class="card shadow p-4 bg-light">
                        <h3 class="text-center mb-3">Impact Highlights</h3>
                        <div class="stats">
                            <div class="stat">
                                <div class="stat-number">150+</div>
                                <div class="stat-label">Artisans Trained</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number">40+</div>
                                <div class="stat-label">Percent Income Increase</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number">50+</div>
                                <div class="stat-label">Products Created</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="training" class="section">
            <h2 class="text-center mb-4">Our Training Centers</h2>
            <div class="features">
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                    <h3>Skill Development</h3>
                    <p>Our comprehensive training programs equip artisans with essential skills in jute craftsmanship,
                        including stitching techniques, product design, and quality control.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-users"></i></div>
                    <h3>Community Empowerment</h3>
                    <p>We focus on empowering women and tribal communities by providing them with sustainable livelihood
                        opportunities and reducing dependence on seasonal work.</p>
                </div>
                <div class="feature">
                    <div class="feature-icon"><i class="fas fa-chart-line"></i></div>
                    <h3>Business Skills</h3>
                    <p>Beyond craftsmanship, we train artisans in basic business skills, marketing techniques, and
                        financial literacy to ensure long-term success.</p>
                </div>
            </div>
            <h2 class="text-center mb-4">Production & Sales</h2>
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <h3><i class="fas fa-industry me-2"></i> Production Center</h3>
                            <p>Our production center serves as a hub where trained artisans create high-quality jute
                                products. The center emphasizes quality control and innovation to meet market demands.
                            </p>
                            <p>We maintain strict quality standards while encouraging artisans to incorporate their
                                traditional designs and techniques, creating unique products that stand out in the
                                market.</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 mb-4">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <h3><i class="fas fa-store me-2"></i> Sales & Market Linkages</h3>
                            <p>Finished products are showcased and sold at dedicated retail outlets and online
                                platforms. JSVK also collaborates with e-commerce platforms to expand market access for
                                artisans.</p>
                            <p>We actively participate in exhibitions, craft fairs, and corporate events to promote our
                                products and secure bulk orders, ensuring steady income for our artisans.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="products" class="section">
            <h2 class="text-center mb-4">Our Products</h2>
            <p class="text-center mb-5">Our artisans create a wide range of eco-friendly jute products that combine
                traditional craftsmanship with contemporary designs.</p>

            <div class="d-flex flex-wrap">
                <div class="col-12 col-sm-3 mb-4 px-2" style="margin-left: 40px; margin-right: 40px;">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="feature-icon text-center mb-3"><i class="fas fa-shopping-bag"></i></div>
                            <h3 class="text-center">Bags & Totes</h3>
                            <ul class="mt-3">
                                <li>Shopping bags</li>
                                <li>Tote bags</li>
                                <li>Gift bags</li>
                                <li>Laptop sleeves</li>
                                <li>Backpacks</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 mb-4 px-2" style="margin-left: 40px; margin-right: 40px;">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="feature-icon text-center mb-3"><i class="fas fa-home"></i></div>
                            <h3 class="text-center">Home Décor</h3>
                            <ul class="mt-3">
                                <li>Table runners</li>
                                <li>Placemats</li>
                                <li>Wall hangings</li>
                                <li>Cushion covers</li>
                                <li>Floor mats</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-3 mb-4 px-2" style="margin-left: 40px; margin-right: 40px;">
                    <div class="card shadow h-100">
                        <div class="p-4">
                            <div class="feature-icon text-center mb-3"><i class="fas fa-gift"></i></div>
                            <h3 class="text-center">Accessories</h3>
                            <ul class="mt-3">
                                <li>Wallets</li>
                                <li>Jewelry boxes</li>
                                <li>Pen holders</li>
                                <li>File folders</li>
                                <li>Corporate gifts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-5">
                <a href="<?= BASE_URL ?>pages/products.php" class="btn btn-accent">View Product Catalog</a>
            </div>
        </section>

        <section class="section bg-light p-5 rounded">
            <div class="grid">
                <div class="col-12 col-sm-8">
                    <h2>Support Our Artisans</h2>
                    <p>By purchasing our jute products, you not only get eco-friendly, handcrafted items but also
                        support the livelihoods of rural artisans and contribute to environmental conservation.</p>
                    <p>We also welcome partnerships with businesses interested in sustainable corporate gifts or
                        bulk
                        orders of eco-friendly products.</p>
                </div>
                <div class="col-12 col-sm-4 d-flex align-items-center justify-content-center">
                    <a href="<?= BASE_URL ?>pages/make_difference.php" class="btn btn-accent btn-lg">Get
                        Involved</a>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="text-center mb-5">Testimonials</h2>
            <div class="grid">
                <div class="col-12 col-sm-6 mb-4">
                    <div class="testimonial">
                        <div class="testimonial-content">
                            "The training I received at JSVK's Craft & Jute Creations center has transformed my
                            life. I
                            can now earn a steady income while working from home, which allows me to take care of my
                            family. The skills I've learned are invaluable."
                        </div>
                        <div class="testimonial-author">- Sunita Devi, Artisan from Ranchi</div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 mb-4">
                    <div class="testimonial">
                        <div class="testimonial-content">
                            "As a tribal woman with limited opportunities, the jute crafting program opened new
                            doors
                            for me. I'm proud that my products are not only providing me with financial independence
                            but
                            also helping reduce plastic waste in our community."
                        </div>
                        <div class="testimonial-author">- Meena Oraon, Artisan from Gumla</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<?php include '../templates/footer.php'; ?>