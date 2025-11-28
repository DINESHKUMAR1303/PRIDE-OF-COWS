import React from "react";
import "./PrivacyPolicy.css";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="policy-wrapper">
      
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">HOME</Link> / <span>PRIVACY POLICY</span>
      </div>

      <div className="policy-container">

        <h1 className="policy-title">Privacy Policy</h1>

        <p className="policy-desc">
          The Privacy Policy below governs your account and any information you provide on
          this site & Mobile App. Pride of Cows (“POC”) is committed to protecting your
          privacy and ensuring that your personal information is protected.
        </p>

        {/* =================== SECTION 1 =================== */}
        <h2 className="section-heading">Privacy Policy</h2>

        <p className="arrow-line">
          By consenting and agreeing to the terms of the Privacy Policy, you expressly
          consent to us processing your data in the manner set out in the Privacy Policy.
          This Privacy Policy describes the information we collect and how we use it.  
          Pride of Cows takes the privacy of your personal information very seriously and 
          will use your information only in accordance with this Privacy Policy.
        </p>

        <p className="arrow-line">
          This Privacy Policy applies to personal information collected by the POC in
          connection with services we offer. Learn more at{" "}
          {/* <a href="https://www.prideofcows.com/about-us/" target="_blank" rel="noreferrer">
            https://www.prideofcows.com/about-us/
          </a>. This Privacy Policy forms part of the Terms & Conditions of POC services. */}
        </p>

        {/* =================== SECTION 2 =================== */}
        <h2 className="section-heading">Notification of Changes</h2>

        <p className="arrow-line">
          This policy may be revised over time as new features are added or as we receive
          suggestions from customers. We may amend this Privacy Policy anytime by posting an
          updated version on our website.
        </p>

        <p className="arrow-line">
          Please check the Pride of Cows website at{" "}
          {/* <a href="https://www.prideofcows.com/" target="_blank" rel="noreferrer">
            https://www.prideofcows.com/
          </a>{" "} */}
          regularly for the most updated version.
        </p>

        <p className="arrow-line">
          This Privacy Policy does not apply to information collected by third-party
          websites, platforms, or applications (“Third Party Sites”). These sites have their
          own privacy policies, and we encourage you to read them before use.
        </p>

        {/* =================== SECTION 3 =================== */}
        <h2 className="section-heading">Your Consent</h2>

        <p className="arrow-line">
          POC will not collect, use or disclose your personal information without your
          consent. In some cases, consent may be inferred from your actions.
        </p>

        <p className="arrow-line">
          You may be asked for additional consent if your information is used for purposes
          not covered by this policy. Without such consent, some services may not be
          available to you.
        </p>

        <p className="arrow-line">
          If you do not receive milk, please contact +91 22 - 68156815 between 8:00 AM to
          12:00 PM.
        </p>

        {/* =================== SECTION 4 =================== */}
        <h2 className="section-heading">What Information Do We Collect?</h2>

        <p>
          “Personal information” includes details that identify you such as:
        </p>

        <ul className="bullet-list">
          <li>Name</li>
          <li>Address</li>
          <li>Email address</li>
          <li>User name</li>
          <li>Telephone number</li>
          <li>Credit card or payment information</li>
          <li>Age, Gender, Date of birth</li>
          <li>User-generated content</li>
          <li>Other voluntarily provided information</li>
        </ul>

        <p>
          Automatically collected data may include IP address, browsing behavior,
          preferences, and technical device information.
        </p>

        <h3 className="sub-heading">Information from Other Sources</h3>

        <p>
          We may receive personal information from trusted external sources such as public
          databases, marketing partners, and data aggregators.
        </p>

        <ul className="bullet-list">
          <li>Name</li>
          <li>Street address</li>
          <li>Age</li>
          <li>Shopping habits</li>
          <li>Publicly available online content</li>
        </ul>

        {/* =================== SECTION 5 =================== */}
        <h2 className="section-heading">How Do We Use Your Personal Information?</h2>

        <p className="arrow-line">Provide requested services and customer support</p>
        <p className="arrow-line">Customize and improve your experience</p>
        <p className="arrow-line">Send marketing messages (with consent)</p>
        <p className="arrow-line">Prevent fraud and illegal activities</p>
        <p className="arrow-line">Verify information through third parties</p>
        <p className="arrow-line">Respond to your queries</p>

        {/* =================== SECTION 6 =================== */}
        <h2 className="section-heading">Expanded Use of Information</h2>

        <p>
          With your consent, POC may use your information for advertising, market research,
          newsletters, and personalized recommendations.
        </p>

        <p>You may withdraw this consent anytime through our website.</p>

        {/* =================== SECTION 7 =================== */}
        <h2 className="section-heading">Customer Service Correspondence</h2>

        <p>
          We store customer support messages to improve service quality, prevent fraud, and
          maintain service records. These may be deleted periodically as allowed by law.
        </p>

        {/* =================== SECTION 8 =================== */}
        <h2 className="section-heading">Questionnaires, Surveys & Profile Data</h2>

        <p>
          Surveys are optional and are used to improve our services. When surveys collect
          personal information, the purpose will always be clearly stated.
        </p>

        {/* =================== SECTION 9 =================== */}
        <h2 className="section-heading">How Do We Share Your Personal Information?</h2>

        <p className="arrow-line">Marketing agencies (with your consent)</p>
        <p className="arrow-line">Delivery partners for order fulfillment</p>
        <p className="arrow-line">Government authorities when required by law</p>
        <p className="arrow-line">Third-party service providers (payment, analytics, hosting)</p>

        <p>
          POC does not sell your personal information except during merger, acquisition,
          or restructuring scenarios.
        </p>

        {/* =================== SECTION 10 =================== */}
        <h2 className="section-heading">Information Security</h2>

        <p>
          We use strong security systems, encrypted databases, and limited access policies.
          You must protect your password — we never ask for it.
        </p>

        {/* =================== SECTION 11 =================== */}
        <h2 className="section-heading">Accessing & Changing Your Information</h2>

        <p>
          You can update your profile, change preferences, or delete your account anytime by
          logging in to your Pride of Cows account.
        </p>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
