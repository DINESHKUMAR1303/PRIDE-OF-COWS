import React, { useState, useEffect } from "react";
import {
    Search,
    Trash2,
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Eye,
    X
} from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { getAllOrders, deleteOrder } from "../../api/order";
import "./Orders.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Import images for fallback mapping
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

    // Modal State
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch Orders & Products
    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Fetch Products for Image Mapping
                const { fetchProducts } = await import("../../api/product");
                const prodRes = await fetchProducts(false);
                const productMap = {};
                if (prodRes.data) {
                    prodRes.data.forEach(p => {
                        productMap[p._id] = {
                            img: p.image,
                            weight: p.weight
                        };
                    });
                }

                // 2. Fetch Orders
                const res = await getAllOrders();
                if (res.data?.success) {
                    const formatted = res.data.orders.map(order => ({
                        id: order._id,
                        displayId: `#${order._id.slice(-6).toUpperCase()}`,
                        customer: {
                            name: (() => {
                                // 1. Try User Profile Name
                                if (order.userId?.name && order.userId.name !== "Guest") return order.userId.name;

                                // 2. Try Extraction from Address (Format: "Name, Address...")
                                if (order.address && typeof order.address === 'string') {
                                    const firstPart = order.address.split(',')[0].trim();
                                    // Heuristic: If it doesn't start with a number, assume it's a name (New Format)
                                    if (isNaN(parseInt(firstPart[0]))) return firstPart;
                                }

                                // 3. Fallback to Email Username
                                if (order.userId?.email) return order.userId.email.split('@')[0];

                                return "Guest";
                            })(),
                            email: order.userId?.email || "N/A"
                        },
                        items: order.items.map(item => {
                            // Resolve Image
                            const pId = item.productId; // String ID
                            const details = productMap[pId] || productData[pId] || {}; // Check dynamically fetched map -> then hardcoded fallback

                            let imgSrc = details.img || "";
                            // Handle backend uploads vs local imports
                            if (imgSrc && imgSrc.startsWith("/uploads")) {
                                imgSrc = `http://localhost:5000${imgSrc}`;
                            }

                            return {
                                name: item.name,
                                qty: item.quantity,
                                price: item.price,
                                img: imgSrc ? <img src={imgSrc} alt={item.name} width="24" height="24" style={{ objectFit: 'contain' }} onError={(e) => e.target.src = "https://via.placeholder.com/24"} /> : "📦",
                                weight: details.weight || ""
                            };
                        }),
                        totalAmount: order.totalAmount,
                        status: order.status || "Pending",
                        date: new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric"
                        })
                    }));
                    setOrders(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Search Filter
    const filteredOrders = orders.filter(o =>
        o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.displayId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // Check if any item name in the order matches the search
        o.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order? This action CANNOT be undone.")) {
            try {
                const res = await deleteOrder(id);
                if (res.data?.success) {
                    setOrders(prev => prev.filter(o => o.id !== id));
                } else {
                    alert("Failed to delete order");
                }
            } catch (err) {
                console.error("Delete failed", err);
                alert("An error occurred while deleting the order.");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Delete ${selectedIds.length} items? This cannot be undone.`)) {
            try {
                // Delete all selected sequentially (or parallel)
                await Promise.all(selectedIds.map(id => deleteOrder(id)));

                setOrders(prev => prev.filter(o => !selectedIds.includes(o.id)));
                setSelectedIds([]);
            } catch (err) {
                console.error("Bulk delete failed", err);
                alert("Some orders could not be deleted.");
            }
        }
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    // EXPORT HANDLERS
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text("Order Management Report", 14, 15);

        const tableColumn = ["Order ID", "Customer Name", "Email", "Total Amount", "Status", "Date"];
        const tableRows = filteredOrders.map(order => [
            order.displayId,
            order.customer.name,
            order.customer.email,
            `₹${order.totalAmount}`,
            order.status,
            order.date
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("Orders_Report.pdf");
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredOrders.map(order => ({
            "Order ID": order.displayId,
            "Customer Name": order.customer.name,
            "Customer Email": order.customer.email,
            "Items Summary": order.items.map(i => `${i.name} (x${i.qty})`).join(", "),
            "Total Amount": order.totalAmount,
            "Status": order.status,
            "Date": order.date
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
        XLSX.writeFile(workbook, "Orders_Report.xlsx");
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
                            <button className="export-btn pdf" title="Export PDF" onClick={handleExportPDF}>
                                <FaFilePdf size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn excel" title="Export Excel" onClick={handleExportExcel}>
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
                                    {[5, 10, 20, 50].map(num => (
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
                                                <button className="btn view" title="View Details" onClick={() => handleView(order)}>
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

            {/* View Order Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Order Details</h2>
                            <button className="modal-close-btn" onClick={() => setIsViewModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-row">
                                <span className="modal-label">Order ID</span>
                                <span className="modal-value">{selectedOrder.displayId}</span>
                            </div>
                            <div className="modal-row">
                                <span className="modal-label">Date</span>
                                <span className="modal-value">{selectedOrder.date}</span>
                            </div>
                            <div className="modal-row">
                                <span className="modal-label">Status</span>
                                <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span>
                            </div>
                            <div className="modal-row">
                                <span className="modal-label">Customer Name</span>
                                <span className="modal-value">{selectedOrder.customer.name}</span>
                            </div>
                            <div className="modal-row">
                                <span className="modal-label">Email</span>
                                <span className="modal-value">{selectedOrder.customer.email}</span>
                            </div>
                            <div className="modal-row">
                                <span className="modal-label">Total Amount</span>
                                <span className="modal-value">₹{selectedOrder.totalAmount}</span>
                            </div>

                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '10px 0 5px 0' }}>Items</h3>
                            <div className="modal-items-list">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="modal-item-row">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {item.img}
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: '500', fontSize: '13px' }}>{item.name}</span>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>{item.weight}</span>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '600' }}>x{item.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
