import React from "react";
import "./TermsConditions.css";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="terms-wrapper">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">HOME</Link> / <span>TERMS & CONDITIONS</span>
      </div>

      <div className="terms-container">

        <h1 className="terms-title">Terms & Conditions</h1>

        <p className="terms-desc">
          If you continue to browse and use this website and Pride of Cows mobile app, 
          you are agreeing to comply with the following terms of use, which together with 
          our Privacy Policy govern the Pride of Cows (Bhagyalaxmi Dairy Farms Pvt. Ltd.) 
          relationship with you in relation to this website / Mobile app.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Ordering From Us</h2>

        <p className="arrow-line">
          Before an order can be placed, you must complete the registration form using our online service.
        </p>

        <p className="arrow-line">
          Once your registration form is submitted, the order will be deemed to have been placed.
          Our Customer Service Department will confirm your registration through the method you selected.
        </p>

        <p className="arrow-line">
          Acceptance of the order takes place when we confirm receipt via email or phone.
        </p>

        <p className="arrow-line">
          Delivery will be carried out according to our fixed delivery pattern.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Pricing</h2>

        <p className="arrow-line">
          Cost of Pride of Cows Milk varies based on the state where it is sold.
        </p>

        <p className="arrow-line">
          Prices are reviewed periodically and can change without prior notice.
        </p>

        <p className="arrow-line">All prices mentioned are inclusive of taxes.</p>

        <p className="arrow-line">
          Ghee, Yogurt, Paneer, and Curd are manufactured by Parag Milk Foods.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Payment / Collection</h2>

        <p className="arrow-line">
          Payments can be made online at 
          <a href="https://www.prideofcows.in/poc/customer/" target="_blank">
            www.prideofcows.in/poc/customer/
          </a>{" "}
          or through the mobile app.
        </p>

        <p className="arrow-line">
          Payment can also be made by cheque handed to our Collection Executive.
          Cheques must be issued in favour of Bhagyalaxmi Dairy Farms Pvt. Ltd.
        </p>

        <p className="arrow-line">
          Physical payment collection (Cash/Cheque) will be charged ₹100 per invoice.
        </p>

        <p className="arrow-line">
          If a cheque bounces due to insufficient funds or signature mismatch, a penalty 
          fee of ₹250 will be charged.
        </p>

        <p className="arrow-line">
          We are not liable for technical payment failures.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Cancellations / Rescheduling Orders</h2>

        <p className="arrow-line">
          If you no longer require milk, please call 022-68156815 or email
          bookings@prideofcows.com. Outstanding payments must be settled within 10 working days.
        </p>

        <p className="arrow-line">
          For rescheduling, notify us at least 24 hours prior through:
        </p>

        <ul className="bullet-list">
          <li>Pride of Cows Mobile App</li>
          <li>www.prideofcows.com</li>
          <li>Call: +91 022-68156815</li>
          <li>Email: bookings@prideofcows.com</li>
        </ul>

        <p className="arrow-line">
          Please do NOT use digital platforms like Facebook, Twitter, Instagram for rescheduling orders.
        </p>

        <p className="arrow-line">
          If you don’t receive milk, call +91 22-68156815 between 8 AM to 12 Noon on the same day.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Service Access</h2>

        <p className="arrow-line">
          We strive to keep our website running smoothly, but we are not liable if unavailable.
        </p>

        <p className="arrow-line">
          Access may be suspended temporarily for maintenance or reasons beyond our control.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Registration</h2>

        <p className="arrow-line">
          Each registration is for a single user only. Do not share your username/password.
        </p>

        <p className="arrow-line">
          If you suspect someone else knows your password, contact us immediately.
        </p>

        <p className="arrow-line">
          We may suspend or cancel registration for misuse or violation of terms.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Disclaimer</h2>

        <p className="arrow-line">
          While we try to ensure information is correct, we do not guarantee accuracy or completeness.
        </p>

        <p className="arrow-line">
          Product details, prices, and availability may change without prior notice.
        </p>

        <p className="arrow-line">
          NOTHING IN THESE TERMS AFFECTS YOUR STATUTORY RIGHTS.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Liability</h2>

        <p className="arrow-line">
          Nothing in these terms limits liability for:
        </p>

        <ul className="bullet-list">
          <li>Death or personal injury caused by negligence</li>
          <li>Fraud</li>
          <li>Misrepresentation</li>
          <li>Any liability that cannot be excluded under law</li>
        </ul>

        <p className="arrow-line">
          You are responsible for costs related to repairing equipment or data loss from using this website.
        </p>

        <p className="arrow-line">
          You agree to indemnify Pride of Cows for losses arising from breach of terms or misuse.
        </p>

        {/* ===================================================== */}
        <h2 className="section-heading">Wallet Offer</h2>

        <ul className="bullet-list">
          <li>Prepaid and limited-time offer</li>
          <li>Postpaid customers availing the offer become prepaid members</li>
          <li>No return or refund applicable</li>
          <li>Wallet must be used within 1 year; no partial redemption</li>
          <li>Pride of Cows reserves right to modify terms anytime</li>
          <li>Wallet can be used only for Single Origin products</li>
          <li>Offer only applies after clearing outstanding payments</li>
          <li>Wallet can be recharged multiple times separately</li>
          <li>Product/Offer prices may change anytime</li>
        </ul>

        {/* ===================================================== */}
        <h2 className="section-heading">Refer & Earn</h2>

        <ul className="bullet-list">
          <li>Referrer & referee cannot share the same address</li>
          <li>Referrer must purchase or recharge at least ₹2000</li>
          <li>No refunds applicable</li>
          <li>Cannot be combined with other offers</li>
          <li>
            Once referee completes ₹2000 purchase, both receive ₹500 coupon
          </li>
          <li>
            If referee doesn’t apply coupon, referrer won’t get ₹500 coupon
          </li>
          <li>Referrer must have purchased in last 6 months</li>
          <li>
            Referee must add referrer’s mobile number for valid referral
          </li>
          <li>Coupon valid for 1 month</li>
          <li>
            App requires access to contacts for referral — data is stored locally, never shared
          </li>
        </ul>

        {/* ===================================================== */}
        <h2 className="section-heading">Contact Us</h2>

        <p><strong>Email:</strong> bookings@prideofcows.com</p>
        <p><strong>Phone:</strong> +91-22-68156815</p>
        <p><strong>Address:</strong> Pride of Cows, 10th Floor, Nirmal Building, Nariman Point, Mumbai - 400021</p>

        <br />
        <p>© {new Date().getFullYear()} Pride of Cows. All rights reserved.</p>

      </div>
    </div>
  );
};

export default TermsConditions;
