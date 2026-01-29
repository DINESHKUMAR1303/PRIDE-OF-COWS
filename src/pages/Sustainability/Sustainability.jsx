import React, { useState } from 'react';
import './Sustainability.css';

// Import Images
import headImg from './images/head.jpg';

// Idea Assets
import ideaIcon1 from './images/idea.icon1.png';
import ideaIcon2 from './images/idea.icon2.png';
import ideaIcon3 from './images/idea.icon3.png';
import ideaImg1 from './images/idea.image1.jpg';
import ideaImg2 from './images/idea.image2.jpg';

// Innovation Assets
import innovationIcon1 from './images/innovation.icon1.png';
import innovationIcon2 from './images/innovation.icon2.png';
import innovationIcon3 from './images/innovation.icon3.png';
import innovationImg1 from './images/innovation.image1.jpg';
import innovationImg2 from './images/innovation.image2.jpg';

// Impact Assets
import impactIcon1 from './images/impact.icon1.png';
import impactIcon2 from './images/impact.icon2.png';
import impactIcon3 from './images/impact.icon3.png';
import impactImg1 from './images/impact.image1.jpg';
import impactImg2 from './images/impact.image2.jpg';

const Sustainability = () => {
    const [activeTab, setActiveTab] = useState('idea');

    const contentData = {
        idea: {
            items: [
                {
                    icon: ideaIcon1,
                    title: "Ultra-Convenience",
                    description: "Single Origin subscription dairy delivered to your doorstep"
                },
                {
                    icon: ideaIcon2,
                    title: "Cow Comfort at our Bhagyalaxmi Dairy Farms",
                    description: "Comprehensive cow care meeting global health standards"
                },
                {
                    icon: ideaIcon3,
                    title: "Reduce Carbon Footprint in Dairy Practices",
                    description: "Environmental commitment: Reduce carbon footprint, control greenhouse emissions, water conservation, and energy-saving practices."
                }
            ],
            images: [ideaImg1, ideaImg2]
        },
        innovation: {
            items: [
                {
                    icon: innovationIcon2, // Swapped based on likely visual look, matching file names to content best guess
                    title: "Superior Distribution Network for Rich Milk",
                    description: "Regular quality checks, automated milking, and dedicated logistics for superior milk delivery"
                },
                {
                    icon: innovationIcon1,
                    title: "International Cow Care & Enriching Experience",
                    description: "Enriched the existing milking system with an international rotary milking parlor and packaging specialists from France"
                },
                {
                    icon: innovationIcon3,
                    title: "Global Best Dairy Practices",
                    description: "Upgraded dairy farming: recycled water, tamper-proof PET bottles, and automated systems for optimal resource utilization"
                }
            ],
            images: [innovationImg1, innovationImg2]
        },
        impact: {
            items: [
                {
                    icon: impactIcon1,
                    title: "Consistent Premium Milk for Happy Consumers",
                    description: "Overhauling our approach for future-ready Pride of Cows milk products."
                },
                {
                    icon: impactIcon2,
                    title: "Keep Our Promise",
                    description: "Global dairy practices: Premium products, superior service."
                },
                {
                    icon: impactIcon3,
                    title: "Energy Efficient & Protecting the Local Ecosystem",
                    description: "Natural feed, efficient energy & water utilization for streamlined operations."
                }
            ],
            images: [impactImg1, impactImg2]
        }
    };

    const activeContent = contentData[activeTab];

    return (
        <div className="sustainability-page">
            {/* Hero Section */}
            <div className="sus-hero">
                <img src={headImg} alt="Sustainability Banner" className="sus-hero-img" />
            </div>

            {/* New Action Section */}
            <div className="sus-action-section">
                <div className="sus-action-container">
                    <span className="sus-action-subtitle">What We Do</span>
                    <h2 className="sus-action-title">Partner for a Safer, Clean & Green Earth</h2>
                    <div className="sus-action-text">
                        <p>Pride of Cows offers premium dairy products that prioritize health and the environment. Our products promote a positive impact on the environment, combining traditional practices with modern methods.</p>
                        <p>We reduce water consumption and use recycled water. 30% of our water usage is sourced from recycled water.</p>
                        <p>We control pollutants by checking excess air from boilers for contaminants. We conserve energy through solar power and efficient heat recovery systems. Our CSR activities support farmers, biodiversity, and sustainability while providing premium milk products.</p>
                        <p>We prioritize the well-being of our cows and have invested in a large biogas digester that converts waste into electricity and natural gas.</p>
                    </div>
                </div>
            </div>

            {/* Intro Text */}
            <div className="sus-intro">
                <h2>Doing Well By Doing Good</h2>
            </div>

            {/* Tabs Navigation */}
            <div className="sus-tabs-container">
                <div className="sus-tabs">
                    {['idea', 'innovation', 'impact'].map((tab) => (
                        <div
                            key={tab}
                            className={`sus-tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            <h3 className="sus-tab-label">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                            <div className="sus-tab-dot"></div>
                        </div>
                    ))}
                </div>
                <div className="sus-tabs-line"></div>
            </div>

            <div className="sus-content">
                <div className="sus-content-left">
                    {activeContent.items.map((item, index) => (
                        <div key={index} className="sus-item">
                            <div className="sus-item-icon-wrapper">
                                <img src={item.icon} alt={item.title} className="sus-item-icon" />
                            </div>
                            <div className="sus-item-text">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sus-content-right">
                    <div className="sus-collage">
                        {/* Using a specific layout for the 2 images based on the reference */}
                        <img src={activeContent.images[0]} alt="Sustainability 1" className={`sus-img-main ${activeTab}`} />
                        <img src={activeContent.images[1]} alt="Sustainability 2" className={`sus-img-sub ${activeTab}`} />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Sustainability;
