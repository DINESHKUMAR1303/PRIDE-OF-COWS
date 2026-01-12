import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Trash2,
    Pencil,
    Eye,
    ChevronDown,
    X
} from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import { fetchProducts, deleteProduct, updateProductStatus, deleteBulkProducts } from "../../api/product";
import "./ManageProduct.css";

const ManageProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Bulk selection
    const [selectedIds, setSelectedIds] = useState([]);

    // ViewModal
    const [viewProduct, setViewProduct] = useState(null);

    console.log("[ManageProduct] Rendering with", { productCount: products.length, loading });

    // 1. Fetch Data
    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchProducts();
            console.log("Fetched Products Raw:", res);

            // Handle different response structures
            let productList = [];
            if (res && Array.isArray(res.data)) {
                productList = res.data;
            } else if (res && res.data && Array.isArray(res.data.data)) {
                productList = res.data.data;
            } else if (res && Array.isArray(res)) {
                productList = res;
            } else if (res && res.data) {
                // Fallback if data is the array
                productList = Array.isArray(res.data) ? res.data : [];
            }

            console.log("Parsed Product List:", productList);
            setProducts(productList);
        } catch (error) {
            console.error("Failed to load products", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 2. Filter Logic
    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products.filter(item => {
            if (!item || !item.productName) return false;
            return item.productName.toLowerCase().includes(search.toLowerCase());
        });
    }, [products, search]);

    // 3. Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedData = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Scroll to top on page change
    useEffect(() => {
        const adminContent = document.querySelector(".main-content");
        if (adminContent) adminContent.scrollTo({ top: 0, behavior: "instant" });
    }, [currentPage]);

    // 4. Handlers
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedData.map(p => p._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(itemId => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                loadData(); // Refresh
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected products?`)) {
            try {
                await deleteBulkProducts(selectedIds);
                setSelectedIds([]);
                loadData();
            } catch (error) {
                console.error("Bulk delete failed:", error);
                alert(error || "Failed to delete products");
            }
        }
    };

    const handleEditClick = (product) => {
        navigate("/admin/products/add", { state: { editProduct: product } });
    };

    // 5. Export Logic
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredProducts.map(p => ({
            Name: p.productName,
            Weight: p.weight,
            Price: p.price,
            MRP: p.mrp,
            CreatedDate: new Date(p.createdAt).toLocaleDateString()
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "Products_Report.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Product Inventory Report", 14, 15);
        autoTable(doc, {
            startY: 20,
            head: [["Name", "Weight", "Selling Price", "MRP"]],
            body: filteredProducts.map(p => [
                p.productName, p.weight, `₹${p.price}`, `₹${p.mrp}`
            ]),
        });
        doc.save("Products_Report.pdf");
    };

    // Safety check before rendering
    if (loading) {
        return (
            <div className="manage-product-page" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (!Array.isArray(products)) {
        console.error("[ManageProduct] Products is not an array:", products);
        return (
            <div className="manage-product-page" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Error loading products</h2>
                <button onClick={loadData}>Retry</button>
            </div>
        );
    }

    return (
        <div className="manage-product-page">

            {/* Header */}
            <div className="manage-header">
                <div className="manage-header-left">
                    <h1 className="manage-title">Manage Products</h1>
                    <div className="manage-breadcrumb">
                        <span>Dashboard</span>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-item active">Products</span>
                    </div>
                </div>

                {/* Bulk Delete */}
                {selectedIds.length > 0 && (
                    <button className="bulk-delete-btn" onClick={handleBulkDelete}>
                        <Trash2 size={16} /> Delete ({selectedIds.length})
                    </button>
                )}
            </div>

            <div className="manage-table-card">

                {/* Toolbar */}
                <div className="manage-toolbar">
                    <div className="toolbar-left">
                        <h2 className="toolbar-title">Product List</h2>
                        <p className="toolbar-subtitle">Manage your inventory items</p>
                    </div>

                    <div className="toolbar-right">

                        {/* Search */}
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        {/* Export */}
                        <div className="export-group">
                            <button className="export-btn pdf" onClick={exportToPDF} title="Export PDF">
                                <FaFilePdf size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn excel" onClick={exportToExcel} title="Export Excel">
                                <FaFileExcel size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn print" onClick={() => window.print()} title="Print">
                                <MdPrint size={20} />
                            </button>
                        </div>

                        {/* Items Per Page */}
                        <div className="items-per-page-wrapper" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <div className="custom-select-trigger">
                                {itemsPerPage} per page
                                <ChevronDown size={16} className={`custom-select-arrow ${isDropdownOpen ? 'open' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="custom-dropdown-menu items-per-page-menu">
                                    {[5, 10, 20, 50].map((num) => (
                                        <div
                                            key={num}
                                            className={`custom-dropdown-item ${itemsPerPage === num ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setItemsPerPage(num);
                                                setCurrentPage(1);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {num} per page
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="manage-table-wrapper">
                    <table className="manage-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                                    />
                                </th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Weight</th>
                                <th>Price (₹)</th>
                                <th>MRP (₹)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="8" className="no-data">Loading products...</td></tr>
                            ) : paginatedData.length === 0 ? (
                                <tr><td colSpan="8" className="no-data">No products found</td></tr>
                            ) : (
                                paginatedData.map((product) => {
                                    if (!product) return null;
                                    return (
                                        <tr key={product._id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(product._id)}
                                                    onChange={() => handleSelectRow(product._id)}
                                                />
                                            </td>
                                            <td>
                                                <div className="product-avatar">
                                                    <img
                                                        src={`http://localhost:5000${product.image}`}
                                                        alt={product.productName}
                                                        onError={(e) => e.target.src = "https://via.placeholder.com/48"}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="product-name">{product.productName}</div>
                                            </td>
                                            <td>
                                                <span className="category-badge">{product.weight}</span>
                                            </td>
                                            <td><strong>₹{product.price}</strong></td>
                                            <td style={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹{product.mrp}</td>
                                            <td>
                                                <div className="status-toggle-wrapper">
                                                    <div className="switch-container">
                                                        <label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={product.isActive !== false}
                                                                onChange={async (e) => {
                                                                    const newStatus = e.target.checked;
                                                                    // Optimistic update locally
                                                                    const updatedList = products.map(p =>
                                                                        p._id === product._id ? { ...p, isActive: newStatus } : p
                                                                    );
                                                                    setProducts(updatedList);

                                                                    try {
                                                                        console.log(`Sending status update for ${product._id}: ${newStatus}`);
                                                                        await updateProductStatus(product._id, newStatus);
                                                                        console.log("Status update success, reloading data...");
                                                                        await loadData(); // Verify persistence
                                                                    } catch (error) {
                                                                        console.error("Failed to update status", error);
                                                                        // Revert on failure
                                                                        loadData();
                                                                        alert("Failed to update status");
                                                                    }
                                                                }}
                                                            />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <span className={`status-text ${String(product.isActive) !== "false" ? "active" : "inactive"}`}>
                                                        {String(product.isActive) !== "false" ? "Enabled" : "Disabled"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn view" onClick={() => setViewProduct(product)} title="View">
                                                        <Eye size={16} />
                                                    </button>
                                                    <button className="btn edit" onClick={() => handleEditClick(product)} title="Edit">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button className="btn delete" onClick={() => handleDelete(product._id)} title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="table-footer">
                    <div className="showing-info">
                        Showing {paginatedData.length} of {filteredProducts.length} entries
                    </div>
                    <div className="page-info">
                        Page {currentPage} of {totalPages || 1}
                    </div>
                </div>
            </div>

            {/* View Modal */}
            {viewProduct && (
                <div className="modal-overlay" onClick={() => setViewProduct(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Product Details</h2>
                            <button onClick={() => setViewProduct(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <X size={24} color="#64748b" />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="view-product-grid">
                                <div className="product-photo-section">
                                    <img
                                        src={`http://localhost:5000${viewProduct.image}`}
                                        alt={viewProduct.productName}
                                        style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px" }}
                                    />
                                </div>
                                <div className="product-info-section">
                                    <div className="product-info-row">
                                        <div className="info-label">Product Name</div>
                                        <div className="info-val">{viewProduct.productName}</div>
                                    </div>
                                    <div className="product-info-row">
                                        <div className="info-label">Weight / Volume</div>
                                        <div className="info-val">{viewProduct.weight}</div>
                                    </div>
                                    <div className="product-info-row">
                                        <div className="info-label">Price</div>
                                        <div className="info-val">₹{viewProduct.price}</div>
                                    </div>
                                    <div className="product-info-row">
                                        <div className="info-label">MRP</div>
                                        <div className="info-val">₹{viewProduct.mrp}</div>
                                    </div>
                                    <div className="product-info-row">
                                        <div className="info-label">Created At</div>
                                        <div className="info-val">{new Date(viewProduct.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageProduct;
