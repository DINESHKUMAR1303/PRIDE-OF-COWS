import React, { useState, useEffect } from "react";
import "./Settings.css";
import { User, Lock, Bell, Globe, Save } from "lucide-react";

/* --- SUBCOMPONENTS --- */

const ProfileSettings = () => {
    const [user, setUser] = useState({ name: "", email: "", designation: "" });

    useEffect(() => {
        try {
            const stored = localStorage.getItem("admin_user");
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } else {
                // Fallback mock
                setUser({ name: "Admin User", email: "admin@prideofcows.com", designation: "Administrator" });
            }
        } catch (e) {
            console.error("Error parsing admin user", e);
        }
    }, []);

    return (
        <div>
            <h2 className="settings-section-title">Profile Settings</h2>
            <div className="st-form-group">
                <label>Full Name</label>
                <input type="text" className="st-input" value={user.name || ""} readOnly disabled style={{ background: "#f1f5f9" }} />
            </div>
            <div className="st-form-group">
                <label>Email Address</label>
                <input type="email" className="st-input" value={user.email || "admin@prideofcows.com"} readOnly disabled style={{ background: "#f1f5f9" }} />
                <small style={{ display: "block", marginTop: 8, color: "#94a3b8" }}>
                    * Profile details are managed by the Super Admin. Contact support to update.
                </small>
            </div>
            <div className="st-form-group">
                <label>Designation</label>
                <input type="text" className="st-input" value={user.designation || ""} readOnly disabled style={{ background: "#f1f5f9" }} />
            </div>
        </div>
    );
};

const SecuritySettings = () => {
    return (
        <div>
            <h2 className="settings-section-title">Security</h2>
            <p style={{ marginBottom: 20, color: "#64748b", fontSize: "14px" }}>Ensure your account is secure by using a strong password.</p>

            <div className="st-form-group">
                <label>Current Password</label>
                <input type="password" className="st-input" placeholder="Enter current password" />
            </div>
            <div className="st-form-group">
                <label>New Password</label>
                <input type="password" className="st-input" placeholder="Enter new password" />
            </div>
            <div className="st-form-group">
                <label>Confirm New Password</label>
                <input type="password" className="st-input" placeholder="Confirm new password" />
            </div>
            <button className="st-btn" onClick={() => alert("Password update feature coming soon!")}>Update Password</button>
        </div>
    )
}

const GeneralSettings = () => {
    return (
        <div>
            <h2 className="settings-section-title">General Configuration</h2>
            <div className="st-form-group">
                <label>Site Title</label>
                <input type="text" className="st-input" defaultValue="Pride of Cows" />
            </div>
            <div className="st-form-group">
                <label>Support Email</label>
                <input type="email" className="st-input" defaultValue="support@prideofcows.com" />
            </div>
            <div className="st-form-group">
                <label>Support Phone</label>
                <input type="text" className="st-input" defaultValue="+91 98765 43210" />
            </div>

            <div style={{ height: 1, background: "#e2e8f0", margin: "24px 0" }}></div>

            <h3 style={{ fontSize: 16, marginBottom: 16, color: "#1a3b5d" }}>Ecommerce Values</h3>

            <div className="st-form-group">
                <label>Standard Delivery Fee (₹)</label>
                <input type="number" className="st-input" defaultValue="40" />
            </div>
            <div className="st-form-group">
                <label>Tax Rate (%)</label>
                <input type="number" className="st-input" defaultValue="5" />
            </div>
            <button className="st-btn" onClick={() => alert("Settings Saved!")}>
                <Save size={16} style={{ marginRight: 8, display: "inline-block", verticalAlign: "middle" }} />
                Save Changes
            </button>
        </div>
    )
}

const NotificationSettings = () => {
    const [toggles, setToggles] = useState({
        order: true,
        user: false,
        stock: true
    });

    const toggle = (key) => setToggles({ ...toggles, [key]: !toggles[key] });

    return (
        <div>
            <h2 className="settings-section-title">Notifications</h2>

            <div className="st-toggle-row">
                <div className="st-toggle-info">
                    <h4>Order Alerts</h4>
                    <p>Get notified via email when a new order is placed.</p>
                </div>
                <div className={`st-toggle-switch ${toggles.order ? "active" : ""}`} onClick={() => toggle('order')}>
                    <div className="st-toggle-knob"></div>
                </div>
            </div>

            <div className="st-toggle-row">
                <div className="st-toggle-info">
                    <h4>New User Signups</h4>
                    <p>Get notified when a new customer registers on the app.</p>
                </div>
                <div className={`st-toggle-switch ${toggles.user ? "active" : ""}`} onClick={() => toggle('user')}>
                    <div className="st-toggle-knob"></div>
                </div>
            </div>

            <div className="st-toggle-row">
                <div className="st-toggle-info">
                    <h4>Low Stock Warning</h4>
                    <p>Receive an alert when product stock drops below 10 units.</p>
                </div>
                <div className={`st-toggle-switch ${toggles.stock ? "active" : ""}`} onClick={() => toggle('stock')}>
                    <div className="st-toggle-knob"></div>
                </div>
            </div>
        </div>
    )
}

/* --- MAIN COMPONENT --- */

const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account preferences and system configurations</p>
            </div>

            <div className="settings-layout">
                <aside className="settings-sidebar">
                    <button
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        <User size={18} /> Profile
                    </button>
                    <button
                        className={activeTab === "security" ? "active" : ""}
                        onClick={() => setActiveTab("security")}
                    >
                        <Lock size={18} /> Security
                    </button>
                    <button
                        className={activeTab === "general" ? "active" : ""}
                        onClick={() => setActiveTab("general")}
                    >
                        <Globe size={18} /> General
                    </button>
                    <button
                        className={activeTab === "notifications" ? "active" : ""}
                        onClick={() => setActiveTab("notifications")}
                    >
                        <Bell size={18} /> Notifications
                    </button>
                </aside>

                <main className="settings-content">
                    {activeTab === "profile" && <ProfileSettings />}
                    {activeTab === "security" && <SecuritySettings />}
                    {activeTab === "general" && <GeneralSettings />}
                    {activeTab === "notifications" && <NotificationSettings />}
                </main>
            </div>
        </div>
    );
};

export default Settings;
