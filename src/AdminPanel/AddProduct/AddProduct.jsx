import React, { useState } from "react";
import {
    Type,
    DollarSign,
    CheckCircle,
    Upload,
    X,
    Scale
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
            // Reset form
            setFormData({
                productName: "",
                weight: "",
                price: "",
                mrp: ""
            });
            setImage(null);
            setPreview(null);

            // Auto-hide alert
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addproduct-card">
            <div className="addproduct-top-header">
                <div>
                    <h2 className="addproduct-title">Add New Product</h2>
                    <p className="addproduct-subtitle">Create a new product for the inventory.</p>
                </div>
            </div>

            {showSuccess && (
                <div className="addproduct-alert">
                    <CheckCircle size={20} />
                    <span>Product added successfully!</span>
                    <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "inherit" }} onClick={() => setShowSuccess(false)}>
                        <X size={18} />
                    </button>
                </div>
            )}

            {error && (
                <div className="addproduct-alert" style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#b91c1c" }}>
                    <X size={20} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="addproduct-form-grid">

                    {/* Product Name */}
                    <div className="addproduct-input-group addproduct-full-width">
                        <label className="addproduct-label">Product Name</label>
                        <div className="addproduct-input-wrapper">
                            <Type size={18} className="addproduct-icon" />
                            <input
                                type="text"
                                name="productName"
                                placeholder="e.g. Full Cream Milk"
                                className="addproduct-input"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Weight/Volume */}
                    <div className="addproduct-input-group">
                        <label className="addproduct-label">Weight / Volume</label>
                        <div className="addproduct-input-wrapper">
                            <Scale size={18} className="addproduct-icon" />
                            <input
                                type="text"
                                name="weight"
                                placeholder="e.g. 1L, 200ml, 500g"
                                className="addproduct-input"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Selling Price */}
                    <div className="addproduct-input-group">
                        <label className="addproduct-label">Selling Price (₹)</label>
                        <div className="addproduct-input-wrapper">
                            <DollarSign size={18} className="addproduct-icon" />
                            <input
                                type="number"
                                name="price"
                                placeholder="0.00"
                                className="addproduct-input"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    {/* MRP */}
                    <div className="addproduct-input-group">
                        <label className="addproduct-label">MRP (₹)</label>
                        <div className="addproduct-input-wrapper">
                            <DollarSign size={18} className="addproduct-icon" />
                            <input
                                type="number"
                                name="mrp"
                                placeholder="0.00"
                                className="addproduct-input"
                                value={formData.mrp}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Spacer to align grid or keep empty */}
                    <div className="addproduct-input-group"></div>

                    {/* Image Upload */}
                    <div className="addproduct-input-group addproduct-full-width">
                        <label className="addproduct-label">Product Image</label>

                        {!preview ? (
                            <label className="addproduct-upload-box">
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <Upload className="addproduct-upload-icon" />
                                <div className="addproduct-upload-text">Click to upload image</div>
                                <div className="addproduct-upload-subtext">SVG, PNG, JPG or GIF (max. 3MB)</div>
                            </label>
                        ) : (
                            <div className="addproduct-upload-box" style={{ padding: "10px" }}>
                                <img src={preview} alt="Preview" className="addproduct-preview-img" />
                                <button
                                    type="button"
                                    onClick={() => { setPreview(null); setImage(null); }}
                                    className="addproduct-btn-cancel"
                                    style={{ marginTop: "12px", width: "auto" }}
                                >
                                    Change Image
                                </button>
                            </div>
                        )}
                    </div>

                </div>

                <div className="addproduct-actions">
                    <button type="button" className="addproduct-btn-cancel" onClick={() => window.history.back()}>
                        Cancel
                    </button>
                    <button type="submit" className="addproduct-btn-submit" disabled={loading}>
                        {loading ? "Saving..." : (
                            <>
                                <CheckCircle size={18} />
                                Submit
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
