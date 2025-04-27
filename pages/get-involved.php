<?php
$pageTitle = "Get Involved";
include '../includes/header.php';
?>

<!-- Get Involved Page Content -->
<section class="page-header">
    <div class="container">
        <h1>Get Involved</h1>
        <p>Join us in making a difference through various opportunities</p>
    </div>
</section>

<!-- Volunteer Section -->
<section class="involve-section" id="volunteer">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Opportunity</span>
            <h2 class="section-title">Become a Volunteer</h2>
        </div>
        
        <div class="involve-content">
            <div class="involve-text">
                <h3>Make a Direct Impact</h3>
                <p>Volunteering with Gyan Deepak Foundation is a rewarding experience that allows you to contribute directly to our mission of empowering children and women through education and training.</p>
                
                <div class="opportunities-list">
                    <h4>Volunteer Opportunities:</h4>
                    <ul>
                        <li>Teaching assistance at our centers</li>
                        <li>Event organization and support</li>
                        <li>Mentoring students</li>
                        <li>Administrative support</li>
                        <li>Fundraising initiatives</li>
                        <li>Community outreach programs</li>
                    </ul>
                </div>
                
                <a href="#" class="btn btn-primary">Apply to Volunteer</a>
            </div>
            <div class="involve-image">
                <img src="/assets/images/volunteer.jpg" alt="Volunteer Opportunities">
            </div>
        </div>
    </div>
</section>

<!-- Build Your Career -->
<section class="involve-section alt-bg" id="careers">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Opportunity</span>
            <h2 class="section-title">Build Your Career</h2>
        </div>
        
        <div class="involve-content reverse">
            <div class="involve-text">
                <h3>Join Our Team</h3>
                <p>Gyan Deepak Foundation offers various career opportunities for passionate individuals looking to make a difference in the field of education and community development.</p>
                
                <div class="career-options">
                    <div class="option">
                        <h4>Fellowship at GDF</h4>
                        <p>A structured program for recent graduates to gain hands-on experience in the social sector while contributing to our mission.</p>
                    </div>
                    <div class="option">
                        <h4>Internship</h4>
                        <p>Short-term opportunities for students to apply their academic knowledge in a real-world setting.</p>
                    </div>
                    <div class="option">
                        <h4>Full-time Positions</h4>
                        <p>Join our team of dedicated professionals working to create lasting change in education.</p>
                    </div>
                </div>
                
                <a href="#" class="btn btn-primary">View Open Positions</a>
            </div>
            <div class="involve-image">
                <img src="/assets/images/career.jpg" alt="Career Opportunities">
            </div>
        </div>
    </div>
</section>

<!-- Donate Section -->
<section class="involve-section" id="donate">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Support</span>
            <h2 class="section-title">Be a Philanthropist</h2>
        </div>
        
        <div class="involve-content">
            <div class="involve-text">
                <h3>Support Our Mission</h3>
                <p>Your generous donations help us continue and expand our programs, reaching more children and women in need of education and empowerment.</p>
                
                <div class="donation-options">
                    <div class="donation-option">
                        <h4>One-time Donation</h4>
                        <p>Make a single contribution to support our ongoing programs.</p>
                    </div>
                    <div class="donation-option">
                        <h4>Monthly Giving</h4>
                        <p>Become a sustaining donor with automatic monthly contributions.</p>
                    </div>
                    <div class="donation-option">
                        <h4>Sponsor a Child</h4>
                        <p>Directly support a child's education and holistic development.</p>
                    </div>
                </div>
                
                <div class="donation-methods">
                    <h4>Ways to Donate:</h4>
                    <ul>
                        <li>Online through our secure portal</li>
                        <li>Bank transfer</li>
                        <li>UPI payment</li>
                        <li>Cheque/DD in favor of "Gyan Deepak Foundation"</li>
                    </ul>
                </div>
                
                <a href="/pages/donate.php" class="btn btn-primary">Donate Now</a>
            </div>
            <div class="involve-image">
                <img src="/assets/images/donate.jpg" alt="Donation Opportunities">
            </div>
        </div>
    </div>
</section>

<!-- Impact Stories -->
<section class="impact-stories">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Testimonials</span>
            <h2 class="section-title">Volunteer & Donor Stories</h2>
        </div>
        
        <div class="stories-grid">
            <!-- Story 1 -->
            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/volunteer-story-1.jpg" alt="Volunteer Story">
                </div>
                <div class="story-content">
                    <h3>Aditi's Journey</h3>
                    <p class="story-excerpt">"Volunteering at GDF changed my perspective on education. Seeing the impact we can make on these children's lives is incredibly rewarding."</p>
                    <a href="#" class="read-more">Read Full Story <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            
            <!-- Story 2 -->
            <div class="story-card">
                <div class="story-image">
                    <img src="/assets/images/donor-story-1.jpg" alt="Donor Story">
                </div>
                <div class="story-content">
                    <h3>Corporate Partnership</h3>
                    <p class="story-excerpt">"Our company has been supporting GDF for 3 years. The transparency and impact of their work is truly commendable."</p>
                    <a href="#" class="read-more">Read Full Story <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
            
            <!-- Add more stories as needed -->
        </div>
    </div>
</section>

<!-- Call to Action -->
<section class="cta-section alt-cta">
    <div class="container">
        <div class="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Choose how you'd like to get involved and start your journey with Gyan Deepak Foundation today.</p>
            <div class="cta-buttons">
                <a href="#" class="btn btn-primary">Volunteer</a>
                <a href="#" class="btn btn-secondary">Donate</a>
                <a href="#" class="btn btn-tertiary">Careers</a>
            </div>
        </div>
    </div>
</section>

<?php include '../includes/footer.php'; ?>