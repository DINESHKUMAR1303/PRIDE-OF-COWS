import React, { useEffect } from 'react';
import './OurProcess.css';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

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
            <div className="op-hero" style={{ backgroundImage: `url(${headImg})` }}>
                <div className="op-hero-overlay">
                    {/* <h1>Our Process</h1> */}
                </div>
            </div>

            {/* SECTION 2: INTRO / TECHNOLOGY */}
            <div className="op-intro-section">
                <div className="op-intro-content">
                    <span className="op-subtitle">OUR TECHNOLOGY & CARE</span>
                    <h2 className="op-title">State-of-the-Art Farming</h2>
                    <p>
                        At Pride of Cows, we believe that the best milk comes from the happiest cows.
                        Our farm is equipped with the latest technology to ensure that our cows are comfortable,
                        healthy, and well-cared for. From automated milking parlors to climate-controlled barns,
                        every detail is designed to maintain the highest standards of hygiene and quality.
                    </p>
                </div>
                <div className="op-intro-images">
                    <img src={tech1} alt="Technology 1" className="op-intro-img" />
                    <img src={tech2} alt="Technology 2" className="op-intro-img" />
                </div>
            </div>

            {/* SECTION 2.5: PROMISE / HEALTH (The 'Third' Section) */}
            <div className="op-promise-section">
                <div className="op-promise-grid">
                    <div className="op-promise-item">
                        <div className="op-promise-icon">01</div>
                        <h3>Purity Guaranteed</h3>
                        <p>Untouched by human hands, 100% pure.</p>
                    </div>
                    <div className="op-promise-item">
                        <div className="op-promise-icon">02</div>
                        <h3>Nutrient Rich</h3>
                        <p>Balanced diet for cows means better milk for you.</p>
                    </div>
                    <div className="op-promise-item">
                        <div className="op-promise-icon">03</div>
                        <h3>Fresh Delivery</h3>
                        <p>Delivered within hours of milking.</p>
                    </div>
                </div>
            </div>

            {/* SECTION 3: OUR PROCESS */}
            <div className="op-process-section">
                <div className="op-header-center">
                    <span className="op-subtitle">THE JOURNEY</span>
                    <h2 className="op-title">Our Process</h2>
                    <p className="op-process-desc">
                        From our farm to your doorstep, we ensure purity at every step.
                    </p>
                </div>

                <div className="op-process-visual">
                    {/* Using the provided process image as the main visual */}
                    <img src={processImg} alt="Our Process Diagram" className="op-process-main-img" />

                    {/* Fallback graphical representation if image serves as background or part of layout */}
                    <div className="op-steps-grid">
                        <div className="op-step">
                            <div className="op-step-number">01</div>
                            <h3>Milking</h3>
                            <p>Touch-free milking ensures zero contamination.</p>
                        </div>
                        <div className="op-step">
                            <div className="op-step-number">02</div>
                            <h3>Chilling</h3>
                            <p>Milk is instantly chilled to 4°C to retain freshness.</p>
                        </div>
                        <div className="op-step">
                            <div className="op-step-number">03</div>
                            <h3>Testing</h3>
                            <p>Rigorous quality checks for every batch.</p>
                        </div>
                        <div className="op-step">
                            <div className="op-step-number">04</div>
                            <h3>Bottling</h3>
                            <p>Automated bottling and sealing.</p>
                        </div>
                        <div className="op-step">
                            <div className="op-step-number">05</div>
                            <h3>Delivery</h3>
                            <p>Cold chain delivery to your doorstep.</p>
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
