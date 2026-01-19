import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Type,
    IndianRupee,
    CheckCircle,
    Upload,
    X,
    Scale,
    Image as ImageIcon
} from "lucide-react";
import { addProduct, updateProduct } from "../../api/product";
import "./AddProduct.css";

const AddProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const editProduct = location.state?.editProduct;

    console.log("[AddProduct] Component mounted", { editProduct });

    const [formData, setFormData] = useState({
        productName: editProduct?.productName || "",
        weight: editProduct?.weight || "",
        price: editProduct?.price || "",
        mrp: editProduct?.mrp || ""
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(editProduct ? `http://localhost:5000${editProduct.image}` : null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");

    // Add error boundary
    useEffect(() => {
        console.log("[AddProduct] Form data:", formData);
        console.log("[AddProduct] Edit mode:", !!editProduct);
    }, [formData, editProduct]);

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
        console.log("[AddProduct] Form submitted", { editProduct: !!editProduct });
        setLoading(true);
        setError("");
        setShowSuccess(false);

        try {
            if (!editProduct && !image) throw new Error("Please upload an image");

            const payload = new FormData();
            payload.append("productName", formData.productName);
            payload.append("weight", formData.weight);
            payload.append("price", formData.price);
            payload.append("mrp", formData.mrp);
            if (image) {
                payload.append("image", image);
            }

            console.log("[AddProduct] Payload created:", {
                productName: formData.productName,
                weight: formData.weight,
                price: formData.price,
                mrp: formData.mrp,
                hasImage: !!image
            });

            if (editProduct) {
                console.log("[AddProduct] Updating product with ID:", editProduct._id);
                const response = await updateProduct(editProduct._id, payload);
                console.log("[AddProduct] Update response:", response);
                setShowSuccess(true);
                setTimeout(() => {
                    console.log("[AddProduct] Navigating to /admin/products/manage");
                    navigate('/admin/products/manage');
                }, 1500);
            } else {
                console.log("[AddProduct] Adding new product");
                const response = await addProduct(payload);
                console.log("[AddProduct] Add response:", response);
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
            }

        } catch (err) {
            console.error("[AddProduct] Error:", err);
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ap-container">
            {/* Top Header */}
            <div className="ap-top-header">
                <div className="ap-top-header-left">
                    <h1>Product Management</h1>
                    <div className="ap-breadcrumb">
                        Product Modules <span>›</span> <strong>{editProduct ? "Edit Product" : "Add Product"}</strong>
                    </div>
                </div>
                <div className="ap-top-header-right">
                    <div className="ap-header-bell">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <div className="ap-bell-dot"></div>
                    </div>
                </div>
            </div>

            <div className="ap-card">
                <div className="ap-card-title">
                    <h2>{editProduct ? "Edit Product" : "Add New Product"}</h2>
                    <div className="ap-title-icon">
                        <CheckCircle size={24} />
                    </div>
                </div>

                {showSuccess && (
                    <div className="ap-alert ap-alert-success">
                        <CheckCircle size={20} />

                        <span>{editProduct ? "Product updated successfully!" : "Product added successfully!"}</span>
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
                                    placeholder="e.g. 1L , 100ml , 500g"
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
                                <IndianRupee className="ap-input-icon" size={18} />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Selling Price"
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
                                <IndianRupee className="ap-input-icon" size={18} />
                                <input
                                    type="number"
                                    name="mrp"
                                    placeholder="MRP"
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
                                    {editProduct ? "Update Product" : "Save Product"}
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
