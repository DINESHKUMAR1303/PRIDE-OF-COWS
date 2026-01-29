import React, { useEffect } from 'react';
import './OurProcess.css';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

// Images
// Images
import headImg from './images/head.jpg';
import processImg from './images/ourprocess.jpg';
import tech1 from './images/tech1.jpg';
import tech2 from './images/tech2.jpg';

const OurProcess = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="op-page">
            {/* SECTION 1: HERO */}
            <div className="op-hero">
                <img src={headImg} alt="Our Process Banner" className="op-hero-img" />
            </div>

            {/* SECTION 2: OUR BELIEF (Text Only) */}
            <div className="op-belief-section">
                <div className="op-belief-container">
                    <span className="op-belief-subtitle">Our Belief–One Source, One Promise</span>
                    <h2 className="op-title">Our Belief</h2>
                    <p>
                        Premium Single Origin milk and milk products from our certified Bhagyalaxmi Dairy farm, where our elite consumers trust us for nutrient-rich, 100% unadulterated milk that boosts bone and brain health.
                    </p>
                    <p>
                        It meets daily protein needs, provides essential amino acids, strengthens immunity, and comes from happy cows receiving mindful care, balanced nutrition (from automated Total Meal Ration), and natural homeopathic and naturopathy treatments.
                    </p>
                    <p>
                        Our commitment to complete cattle care ensures a happy herd and a superior milk experience as part of your daily wholesome diet.
                    </p>
                </div>
            </div>

            {/* SECTION 3: OUR TECHNOLOGY (Text + Stacked Images) */}
            <div className="op-tech-section">
                <div className="op-tech-container">
                    {/* Left: Text Content */}
                    <div className="op-tech-text">
                        <h2 className="op-title">Our Technology</h2>
                        <p>
                            Finest international technology for milking process with our 50-point automated rotary milking parlour.
                        </p>
                        <p>
                            Automated, state-of-the-art dairy farm ensures low bacterial count, untouched, antibiotic-free milk with high nutritional value at 4 degrees Celsius at all stages of the milking process delivered in Tamper-proof PET bottles (global packaging expert, Serac, France).
                        </p>
                        <p>
                            We support farmers with contact farming, organic manures, and training workshops for high-quality green fodder and modern dairy practices.
                        </p>
                        <p>
                            Innovation - Pride of Cows, a premium dairy provider under Parag Milk Foods, aimed to break the tradition of middlemen and fulfill the market demand for 100% pure and fresh milk.
                        </p>
                        <p>
                            With a decade-long vision, we brought state-of-the-art technology to India, scaling production to deliver authentic, unadulterated, and delicious single-origin milk for you and your family.
                        </p>
                    </div>

                    {/* Right: Images Stack */}
                    <div className="op-tech-images-stack">
                        <img src={tech1} className="op-tech-img-1" alt="Rotary Milking Parlour" />
                        <img src={tech2} className="op-tech-img-2" alt="Bottling Line" />
                    </div>
                </div>
            </div>

            {/* SECTION 4: OUR PROCESS (SPLIT LAYOUT) */}
            <div className="op-process-section">
                <div className="op-header-center">
                    <span className="op-subtitle">THE BEST AT WHAT WE DO</span>
                    <h2 className="op-title">Our Process</h2>
                </div>

                <div className="op-process-container">
                    {/* Left: Main Feature Image */}
                    <div className="op-process-left-img">
                        <img src={processImg} alt="Our Process - Vet Checking Cow" />
                    </div>

                    {/* Right: Scrollable Steps */}
                    <div className="op-process-right-content">
                        <div className="op-step-item">
                            <h3>Step 1: Pampering Our Cows</h3>
                            <p>
                                Complete cow comfort keep cows relaxed and in good health, which releases good hormones and keep them happy that leads to a good outcome.
                            </p>
                            <p>
                                Continuous monitoring of cow health and regular checks on automated systems.
                            </p>
                            <p>
                                Expert team allotted to keep cows in good health all the time.
                            </p>
                            <p>
                                Cleanliness is our top priority in keeping cows in the best of health.
                            </p>
                        </div>

                        <div className="op-step-item">
                            <h3>Step 2: Milking</h3>
                            <p>
                                Milking is through automated systems, ensuring zero human contact to maintain absolute purity and hygiene.
                            </p>
                            <p>
                                The milk is instantly chilled to 4°C within minutes of milking to seize bacterial growth and lock in freshness.
                            </p>
                        </div>

                        <div className="op-step-item">
                            <h3>Step 3: Quality Testing</h3>
                            <p>
                                Every batch undergoes rigorous testing in our state-of-the-art laboratories to ensure it meets the highest standards of safety and nutrition.
                            </p>
                            <p>
                                We test for adulteration, antibiotics, and nutritional consistency before bottling.
                            </p>
                        </div>

                        <div className="op-step-item">
                            <h3>Step 4: Bottling & Delivery</h3>
                            <p>
                                The milk is bottled in tamper-proof, eco-friendly bottles and sealed automatically.
                            </p>
                            <p>
                                Delivered to your doorstep in refrigerated vans, ensuring the Cold Chain is never broken from farm to home.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 4: PRODUCTS */}
            <div className="op-product-section">
                {/* ProductCarousel already has its own heading/styles, we just wrap it if needed */}
                <ProductCarousel />
            </div>

        </div>
    );
};

export default OurProcess;
