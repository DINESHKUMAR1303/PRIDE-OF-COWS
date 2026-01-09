import React, { useState } from "react";
import {
    Type,
    DollarSign,
    CheckCircle,
    Upload,
    X,
    Scale,
    Image as ImageIcon
} from "lucide-react";
import { addProduct } from "../../api/product";
import "./AddProduct.css";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        productName: "",
        weight: "",
        price: "",
        mrp: ""
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setShowSuccess(false);

        try {
            if (!image) throw new Error("Please upload an image");

            const payload = new FormData();
            payload.append("productName", formData.productName);
            payload.append("weight", formData.weight);
            payload.append("price", formData.price);
            payload.append("mrp", formData.mrp);
            payload.append("image", image);

            await addProduct(payload);

            setShowSuccess(true);
            setFormData({
                productName: "",
                weight: "",
                price: "",
                mrp: ""
            });
            setImage(null);
            setPreview(null);
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ap-container">
            <div className="ap-card">
                <div className="ap-header">
                    <div className="ap-header-content">
                        <h2 className="ap-title">Add New Product</h2>
                        <p className="ap-subtitle">Fill in the details to add a new item to your inventory.</p>
                    </div>
                    <div className="ap-icon-badge">
                        <Type size={24} color="#16c784" />
                    </div>
                </div>

                {showSuccess && (
                    <div className="ap-alert ap-alert-success">
                        <CheckCircle size={20} />
                        <span>Product added successfully!</span>
                        <button className="ap-alert-close" onClick={() => setShowSuccess(false)}>
                            <X size={18} />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="ap-alert ap-alert-error">
                        <X size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="ap-form">

                    {/* Row 1: Name & Weight */}
                    <div className="ap-form-row">
                        <div className="ap-input-group">
                            <label className="ap-label">Product Name</label>
                            <div className="ap-input-wrapper">
                                <Type className="ap-input-icon" size={18} />
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="e.g. Farm Fresh Milk"
                                    className="ap-input"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="ap-input-group">
                            <label className="ap-label">Weight / Section</label>
                            <div className="ap-input-wrapper">
                                <Scale className="ap-input-icon" size={18} />
                                <input
                                    type="text"
                                    name="weight"
                                    placeholder="e.g. 1L or 500g"
                                    className="ap-input"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Price & MRP */}
                    <div className="ap-form-row">
                        <div className="ap-input-group">
                            <label className="ap-label">Selling Price (₹)</label>
                            <div className="ap-input-wrapper">
                                <DollarSign className="ap-input-icon" size={18} />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    className="ap-input"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="ap-input-group">
                            <label className="ap-label">MRP (₹)</label>
                            <div className="ap-input-wrapper">
                                <DollarSign className="ap-input-icon" size={18} />
                                <input
                                    type="number"
                                    name="mrp"
                                    placeholder="0.00"
                                    className="ap-input"
                                    value={formData.mrp}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="ap-input-group">
                        <label className="ap-label">Product Image</label>
                        <div className={`ap-upload-area ${preview ? 'has-image' : ''}`}>
                            {!preview ? (
                                <label className="ap-upload-label">
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <div className="ap-upload-placeholder">
                                        <div className="ap-upload-icon-circle">
                                            <Upload size={24} />
                                        </div>
                                        <span className="ap-upload-primary-text">Click to upload image</span>
                                        <span className="ap-upload-secondary-text">SVG, PNG, JPG or GIF (max 3MB)</span>
                                    </div>
                                </label>
                            ) : (
                                <div className="ap-image-preview-container">
                                    <img src={preview} alt="Preview" className="ap-preview-img" />
                                    <div className="ap-preview-actions">
                                        <button
                                            type="button"
                                            onClick={() => { setPreview(null); setImage(null); }}
                                            className="ap-remove-image-btn"
                                        >
                                            <X size={16} /> Remove
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ap-actions">
                        <button type="button" className="ap-btn-cancel" onClick={() => window.history.back()}>
                            Cancel
                        </button>
                        <button type="submit" className="ap-btn-submit" disabled={loading}>
                            {loading ? "Saving..." : (
                                <>
                                    <CheckCircle size={18} />
                                    Save Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
