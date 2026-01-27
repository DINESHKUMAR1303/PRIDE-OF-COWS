import React from 'react';
import './AboutUs.css';

// Import Images
import heroImg from './images/aboutus.jpg';
import childImg from './images/child.png';
// import familyCaringImg from './images/familt caring.html'; // REMOVED: Causing Vite error
import smitaImg from './images/smita.jpg';
// Assuming "familt caring_files" contains the image or "smita.jpg", let's use placeholders if file types are wrong.
// Based on file list:
import familyCaringImg from './images/family_caring.jpg';
import cultureImg from './images/culture.jpg';
import philosophyImg from './images/philosophy.jpeg';
import partner1 from './images/partners1.jpg';
import partner2 from './images/partners2.jpg';
import partner3 from './images/partners3.jpg';

// Note: "familt caring.html" and "planning.html" are not images.
// I will use a solid color or placeholder for banners if image is missing, 
// or maybe 'culture.jpg' / 'aboutus.jpg' reused if appropriate.
// Let's use 'aboutus.jpg' as hero.

const AboutUs = () => {
    return (
        <div className="au-wrapper">

            {/* 1. HERO SECTION */}
            <div className="au-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="au-hero-overlay">
                    {/* <h1>About Us</h1>  -- Removed text to match clean image look if desired, or keep it. Keeping for now. */}
                </div>
            </div>

            {/* 2. FARMING ETHOS */}
            <div className="au-text-section">
                <span className="au-sub-title">FROM OUR FAMILY TO YOURS</span>
                <h2 className="au-title">Farming Ethos: Back To The Farm</h2>
                <p className="au-paragraph">
                    Pride of Cows is a brand of Parag Milk Foods, a company that is passionate about milk and committed to quality.
                    Our "Farm to Home" philosophy ensures that the milk you receive is fresh, pure, and untouched by human hands.
                    We believe in the happiness of our cows, and that happy cows give the best milk.
                </p>
                <p className="au-paragraph">
                    Our state-of-the-art farm is home to the finest breed of Holstein Friesian cows, pampered with love and care.
                    Every drop of milk is instantly pasteurized, chilled, and packaged to retain its natural goodness.
                </p>
            </div>

            {/* 3. IMAGES OF BETTER HEALTH */}
            <section className="au-health-section">
                <div className="au-health-container">
                    <div className="au-health-text">
                        <span className="au-sub-title">OUR PROMISE TO YOU</span>
                        <h2 className="au-title">We Are The Imagery Of<br />Better Health</h2>

                        <ul className="au-health-list">
                            <li className="au-health-item">
                                <div className="au-health-icon">01</div>
                                <div className="au-health-desc">
                                    <h4>Purity Guaranteed</h4>
                                    <p>Our milk is untouched by human hands, ensuring 100% purity and hygiene from milking to bottling.</p>
                                </div>
                            </li>
                            <li className="au-health-item">
                                <div className="au-health-icon">02</div>
                                <div className="au-health-desc">
                                    <h4>Nutrient Rich</h4>
                                    <p>Packed with natural proteins and vitamins essential for a healthy lifestyle for you and your family.</p>
                                </div>
                            </li>
                            <li className="au-health-item">
                                <div className="au-health-icon">03</div>
                                <div className="au-health-desc">
                                    <h4>Fresh Delivery</h4>
                                    <p>We ensure that the milk reaches your doorstep within hours of milking, maintaining its freshness.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Child Image */}
                    <div className="au-health-image-box">
                        <img src={childImg} className="au-health-img" alt="Healthy Child" />
                    </div>
                </div>
            </section>



            {/* 5. OUR PARTNERS */}
            <section className="au-partners-section">
                <h2 className="au-title">Our Partners(Process)</h2>
                <div className="au-partners-grid">
                    <div className="au-partner-card">
                        <img src={partner1} className="au-partner-img" alt="Fleet" />
                        <div className="au-partner-info">
                            <h4>The Fleet</h4>
                            <p>Our specialized cold-chain logistics ensure the milk stays at 4°C until it reaches you.</p>
                        </div>
                    </div>
                    <div className="au-partner-card">
                        <img src={partner2} className="au-partner-img" alt="Barn" />
                        <div className="au-partner-info">
                            <h4>The Barn</h4>
                            <p>Where our cows live in comfort, with specialized cooling systems and nutritious feed.</p>
                        </div>
                    </div>
                    <div className="au-partner-card">
                        <img src={partner3} className="au-partner-img" alt="Tech" />
                        <div className="au-partner-info">
                            <h4>The Technology</h4>
                            <p>Automated milking parlors and tracking provided real-time health monitoring.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PHILOSOPHY & CULTURE */}
            <section className="au-philosophy-section">
                <h2 className="au-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Our Philosophy</h2>
                <div className="au-split-container">
                    <div className="au-split-text">
                        {/* Philosophy Icons Grid */}
                        <div className="au-philosophy-grid">
                            <div className="au-philo-item">
                                <div className="au-philo-icon">🌿</div>
                                <span>100% Natural</span>
                            </div>
                            <div className="au-philo-item">
                                <div className="au-philo-icon">🚫</div>
                                <span>No Antibiotics</span>
                            </div>
                            <div className="au-philo-item">
                                <div className="au-philo-icon">💧</div>
                                <span>Pure Water</span>
                            </div>
                            <div className="au-philo-item">
                                <div className="au-philo-icon">❤️</div>
                                <span>Caring Staff</span>
                            </div>
                        </div>
                        <p className="au-paragraph" style={{ marginTop: '30px' }}>
                            We believe that giving back to nature what we take helps in maintaining a sustainable ecosystem.
                        </p>
                    </div>
                    <img src={philosophyImg} className="au-split-img" alt="Philosophy" />
                </div>
            </section>

            <section className="au-culture-section">
                <h2 className="au-title" style={{ textAlign: 'center', marginBottom: '50px' }}>Our Culture</h2>
                <div className="au-split-container"> {/* Standard row direction: Image Left, Text Right */}
                    <img src={cultureImg} className="au-split-img" alt="Culture" />
                    <div className="au-split-text">
                        <ul className="au-culture-list">
                            <li>
                                <strong>Integrity & Trust:</strong> We build relationships based on transparency and honesty.
                            </li>
                            <li>
                                <strong>Passion for Quality:</strong> We never compromise on the purity of our products.
                            </li>
                            <li>
                                <strong>Community First:</strong> We thrive when our farmers and community thrive.
                            </li>
                            <li>
                                <strong>Sustainability:</strong> Protecting our environment is at the heart of what we do.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 7. FAMILY CARING BANNER (Bottom) */}
            < div className="au-family-banner" style={{ backgroundImage: `url('${familyCaringImg}')` }}>
                <h2>Family Caring, Community Strong.</h2>
            </div >

            {/* 8. FOUNDER S SECTION (Know Us) */}
            <section className="au-founder-section">
                <h2 className="au-title" style={{ textAlign: 'center' }}>Know Us</h2>
                <div className="au-founder-card">
                    <img src={smitaImg} className="au-founder-img" alt="Ms. Akshali Shah" />
                    <div className="au-founder-content">
                        <span className="au-founder-label">Founder</span>
                        <div className="au-founder-name-bar">Ms. Akshali Shah</div>

                        <div className="au-founder-scrollable">
                            <p>
                                Meet Akshali Shah: The Creative Genius Behind Single-Origin Pride of Cows Milk
                            </p>
                            <p>
                                In the world of dairy, where quality and authenticity are paramount, Akshali Shah stands as a beacon of innovation and purity. As the driving force behind Pride of Cows' single-origin milk, her journey is one marked by passion, dedication, and an unwavering commitment to delivering the finest milk to your doorstep.
                            </p>
                            <h4>A Journey Rooted in Excellence</h4>
                            <p>
                                Her journey into the world of dairy excellence began with a simple yet profound realization – the purity and quality of milk should never be compromised. With this vision, she embarked on a quest to transform the dairy industry, elevating the standards of what milk could and should be.
                            </p>
                            <h4>The Single-Origin Revelation</h4>
                            <p>
                                Her revolutionary idea was to introduce the concept of "single-origin" milk. Unlike traditional milk, where multiple sources are blended, single-origin milk is produced at a single farm, ensuring a level of consistency and quality that is unparalleled. This concept was a game-changer, and Pride of Cows became the torchbearer of this philosophy, ensuring that every drop of milk can be traced back to its source.
                            </p>
                            <p>
                                Under her leadership, the brand has grown not just in size but in stature, earning the trust of thousands of families who value health and quality above all else. Her focus on technology and hygiene has ensured that the milk remains untouched by human hands, from milking to bottling, preserving its natural goodness.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
};

export default AboutUs;
