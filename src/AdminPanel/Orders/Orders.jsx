import React, { useState, useEffect } from "react";
import {
    Search,
    Trash2,
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Eye
} from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { getAllOrders } from "../../api/order";
import "./Orders.css";

// Import images for mapping (matching OrdersPage.jsx logic)
import prod1 from "../../components/ProductCarousel/images/onelitermilk.png";
import prod2 from "../../components/ProductCarousel/images/purecurd.png";
import prod3 from "../../components/ProductCarousel/images/ghee.png";
import prod4 from "../../components/ProductCarousel/images/panner.png";
import prod5 from "../../components/ProductCarousel/images/proteinbar.png";
import prod6 from "../../components/ProductCarousel/images/proteinbarpack.png";

const productData = {
    1: { img: prod1, weight: "1L" },
    2: { img: prod2, weight: "320g" },
    3: { img: prod3, weight: "200ml" },
    4: { img: prod4, weight: "200g" },
    5: { img: prod5, weight: "40g" },
    6: { img: prod6, weight: "320g" }
};

const Orders = () => {
    // State
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);

    // Fetch Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                if (res.data?.success) {
                    const formatted = res.data.orders.map(order => ({
                        id: order._id,
                        displayId: `#${order._id.slice(-6).toUpperCase()}`,
                        customer: {
                            name: order.userId?.name || "Guest",
                            email: order.userId?.email || "N/A"
                        },
                        items: order.items.map(item => ({
                            name: item.name,
                            qty: item.quantity,
                            price: item.price,
                            img: productData[item.productId]?.img ? <img src={productData[item.productId].img} alt={item.name} width="24" height="24" style={{ objectFit: 'contain' }} /> : "📦",
                            weight: productData[item.productId]?.weight || ""
                        })),
                        totalAmount: order.totalAmount,
                        status: order.status || "Pending",
                        date: new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                        })
                    }));
                    setOrders(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Search Filter
    const filteredOrders = orders.filter(o =>
        o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    // Handlers
    const toggleSelectAll = () => {
        if (selectedIds.length === currentItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(currentItems.map(o => o.id));
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(Pid => Pid !== id) : [...prev, id]
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            setOrders(prev => prev.filter(o => o.id !== id));
            // In a real app, call delete API here
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedIds.length} items?`)) {
            setOrders(prev => prev.filter(o => !selectedIds.includes(o.id)));
            setSelectedIds([]);
        }
    };

    return (
        <div className="manage-booking-page">

            {/* Header */}
            <div className="manage-header">
                <div className="manage-header-left">
                    <h1 className="manage-title">Order Management</h1>
                    <div className="manage-breadcrumb">
                        <span>Dashboard</span>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-item active">Orders</span>
                    </div>
                </div>

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
                        <h2 className="toolbar-title">Orders List</h2>
                        <p className="toolbar-subtitle">Manage customer orders and status</p>
                    </div>

                    <div className="toolbar-right">

                        {/* Search */}
                        <div className="search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search by Order ID, Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Export Group */}
                        <div className="export-group">
                            <button className="export-btn pdf" title="Export PDF">
                                <FaFilePdf size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn excel" title="Export Excel">
                                <FaFileExcel size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn print" onClick={() => window.print()} title="Print">
                                <MdPrint size={20} />
                            </button>
                        </div>

                        {/* Items Per Page */}
                        <div className={`items-per-page-wrapper ${isPerPageDropdownOpen ? 'active' : ''}`}
                            onClick={() => setIsPerPageDropdownOpen(!isPerPageDropdownOpen)}>
                            <div className="custom-select-trigger">
                                <span>{itemsPerPage} per page</span>
                                <ChevronDown size={16} className={`custom-select-arrow ${isPerPageDropdownOpen ? 'open' : ''}`} />
                            </div>

                            {isPerPageDropdownOpen && (
                                <div className="custom-dropdown-menu">
                                    {[10, 20, 50].map(num => (
                                        <div
                                            key={num}
                                            className={`custom-dropdown-item ${itemsPerPage === num ? 'selected' : ''}`}
                                            onClick={() => setItemsPerPage(num)}
                                        >
                                            {num} per page
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                        checked={selectedIds.length === currentItems.length && currentItems.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="no-data">Loading orders...</td>
                                </tr>
                            ) : currentItems.length > 0 ? (
                                currentItems.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(order.id)}
                                                onChange={() => toggleSelection(order.id)}
                                            />
                                        </td>
                                        <td className="booking-id">{order.displayId}</td>
                                        <td>
                                            <span className="customer-name">{order.customer.name}</span>
                                            <span className="customer-email">{order.customer.email}</span>
                                        </td>
                                        <td>
                                            <div className="order-items-cell">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="order-item-mini">
                                                        <span className="item-icon-wrapper">{item.img}</span>
                                                        <span className="item-details-text">{item.name}</span>
                                                        <span className="item-qty">x{item.qty}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="price-text">₹{order.totalAmount}</td>
                                        <td>
                                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.date}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn view" title="View Details">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="btn delete" onClick={() => handleDelete(order.id)} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-data">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div className="table-footer">
                    <div className="showing-info">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
                    </div>

                    <div className="pagination-controls">
                        <button
                            className="pagination-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button className="pagination-btn disabled">
                            {currentPage}
                        </button>
                        <button
                            className="pagination-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Orders;
