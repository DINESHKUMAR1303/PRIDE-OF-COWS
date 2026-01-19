import React, { useEffect, useState, useMemo } from "react";
import { fetchAllUsers, updateUserStatus, deleteUser, bulkDeleteUsers } from "../../api/user";
import {
    Eye,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    X,
    Filter,
    Trash2
} from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./Customers.css";

const Customers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [viewingUser, setViewingUser] = useState(null);
    const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Status Filter
    const [statusFilter, setStatusFilter] = useState("All");
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    // Bulk selection
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    // Scroll to top
    useEffect(() => {
        const adminContainer = document.querySelector(".main-content");
        if (adminContainer) {
            adminContainer.scrollTo({ top: 0, behavior: "instant" });
        }
        window.scrollTo(0, 0);
    }, [currentPage]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await fetchAllUsers();
            if (res.success && Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Failed to load customers", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

    const getAvatarColor = (name) => {
        const colors = ["#60a5fa", "#34d399", "#f87171", "#a78bfa", "#fb923c", "#fbbf24", "#6b7280", "#1e293b"];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
            const search = searchTerm.toLowerCase();
            const matchesSearch = (
                fullName.includes(search) ||
                user.email?.toLowerCase().includes(search) ||
                user.telephone?.includes(searchTerm)
            );

            let matchesStatus = true;
            if (statusFilter === "Enabled") {
                matchesStatus = user.isActive !== false;
            } else if (statusFilter === "Disabled") {
                matchesStatus = user.isActive === false;
            }

            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const [isExporting, setIsExporting] = useState(false);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(currentUsers.map(u => u._id));
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

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await deleteUser(id);
                loadUsers();
                setSelectedIds(prev => prev.filter(itemId => itemId !== id));
            } catch (err) {
                alert("Failed to delete user");
            }
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected customers?`)) {
            try {
                await bulkDeleteUsers(selectedIds);
                setSelectedIds([]);
                loadUsers();
            } catch (err) {
                alert("Failed to delete users");
            }
        }
    };

    const handleStatusToggle = async (user, newStatus) => {
        // Optimistic update
        const updatedUsers = users.map(u => u._id === user._id ? { ...u, isActive: newStatus } : u);
        setUsers(updatedUsers);

        try {
            await updateUserStatus(user._id, newStatus);
            // Optionally reload to be sure
            // loadUsers();
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
            loadUsers(); // Revert
        }
    };

    const handleExportPDF = () => {
        try {
            setIsExporting(true);
            const doc = new jsPDF();
            doc.text("Customer Report", 14, 22);
            doc.setFontSize(11);

            const tableColumn = ["Name", "Email", "Phone", "City", "Joined Date", "Status"];
            const tableRows = filteredUsers.map(user => [
                `${user.firstName} ${user.lastName}`,
                user.email,
                user.telephone || "N/A",
                user.address?.city || "N/A",
                new Date(user.createdAt).toLocaleDateString(),
                user.isActive !== false ? "Enabled" : "Disabled"
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 30,
            });

            doc.save(`Customers_${new Date().getTime()}.pdf`);
        } catch (err) {
            alert("Failed to export PDF");
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportExcel = () => {
        try {
            setIsExporting(true);
            const dataToExport = filteredUsers.map(user => ({
                "Name": `${user.firstName} ${user.lastName}`,
                "Email": user.email,
                "Phone": user.telephone || "N/A",
                "Address": user.address?.fullAddress || "N/A",
                "City": user.address?.city || "N/A",
                "Joined Date": new Date(user.createdAt).toLocaleDateString(),
                "Status": user.isActive !== false ? "Enabled" : "Disabled"
            }));

            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Customers");
            XLSX.writeFile(wb, `Customers_${new Date().getTime()}.xlsx`);
        } catch (err) {
            alert("Failed to export Excel");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="manage-user-page">
            <div className="manage-header">
                <div className="manage-header-left">
                    <h2 className="manage-title">Customers</h2>
                    <div className="manage-breadcrumb">
                        <span className="breadcrumb-item">User Modules</span>
                        <ChevronRight size={14} className="breadcrumb-separator" />
                        <span className="breadcrumb-item active">Customers</span>
                    </div>
                </div>

                {selectedIds.length > 0 && (
                    <button className="bulk-delete-btn" onClick={handleBulkDelete}>
                        <Trash2 size={16} /> Delete ({selectedIds.length})
                    </button>
                )}
            </div>

            <div className="manage-table-card">
                <div className="manage-toolbar">
                    <div className="toolbar-left">
                        <h3 className="toolbar-title">Customer List</h3>
                        <p className="toolbar-subtitle">View and manage registered customers.</p>
                    </div>

                    <div className="toolbar-right">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search size={18} />
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="filter-dropdown-wrapper" onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}>
                            <div className="custom-select-trigger filter-trigger">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Filter size={16} />
                                    <span>{statusFilter === "All" ? "Filter by Status" : statusFilter}</span>
                                </div>
                                <ChevronDown size={16} className={`custom-select-arrow ${isStatusDropdownOpen ? 'open' : ''}`} />
                            </div>

                            {isStatusDropdownOpen && (
                                <div className="custom-dropdown-menu">
                                    {["All", "Enabled", "Disabled"].map((status) => (
                                        <div
                                            key={status}
                                            className={`custom-dropdown-item ${statusFilter === status ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setStatusFilter(status);
                                                setIsStatusDropdownOpen(false);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            {status}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`export-group ${isExporting ? 'exporting' : ''}`}>
                            <button className="export-btn pdf" onClick={handleExportPDF} title="Export PDF">
                                <FaFilePdf size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn excel" onClick={handleExportExcel} title="Export Excel">
                                <FaFileExcel size={18} />
                            </button>
                            <div className="export-divider"></div>
                            <button className="export-btn print" onClick={() => window.print()} title="Print">
                                <MdPrint size={20} />
                            </button>
                        </div>

                        <div className={`items-per-page-wrapper ${isPerPageDropdownOpen ? 'active' : ''}`} onClick={() => setIsPerPageDropdownOpen(!isPerPageDropdownOpen)}>
                            <div className="custom-select-trigger items-per-page-trigger">
                                <span>{itemsPerPage} per page</span>
                                <ChevronDown size={16} className={`custom-select-arrow ${isPerPageDropdownOpen ? 'open' : ''}`} />
                            </div>

                            {isPerPageDropdownOpen && (
                                <div className="custom-dropdown-menu items-per-page-menu">
                                    {[5, 10, 20, 50].map((num) => (
                                        <div
                                            key={num}
                                            className={`custom-dropdown-item ${itemsPerPage === num ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setItemsPerPage(num);
                                                setCurrentPage(1);
                                                setIsPerPageDropdownOpen(false);
                                            }}
                                        >
                                            {num} per page
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

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

                <div className="manage-table-wrapper">
                    <table className="manage-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={currentUsers.length > 0 && selectedIds.length === currentUsers.length}
                                    />
                                </th>
                                <th style={{ width: '60px', textAlign: 'center' }}>Photo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr><td colSpan="8" className="no-data">Loading customers...</td></tr>
                            ) : currentUsers.length > 0 ? (
                                currentUsers.map((u) => (
                                    <tr key={u._id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(u._id)}
                                                onChange={() => handleSelectRow(u._id)}
                                            />
                                        </td>
                                        <td>
                                            <div className="user-avatar" style={{ margin: '0 auto', background: getAvatarColor(u.firstName) }}>
                                                <span>{getInitial(u.firstName)}</span>
                                            </div>
                                        </td>

                                        <td className="user-name">{u.firstName} {u.lastName}</td>
                                        <td className="email">{u.email}</td>
                                        <td className="contact">{u.telephone || "N/A"}</td>
                                        <td className="contact">{u.address?.city || "N/A"}</td>
                                        <td>
                                            <div className="status-toggle-wrapper">
                                                <div className="switch-container">
                                                    <label className="switch">
                                                        <input
                                                            type="checkbox"
                                                            checked={u.isActive !== false}
                                                            onChange={(e) => handleStatusToggle(u, e.target.checked)}
                                                        />
                                                        <span className="slider round"></span>
                                                    </label>
                                                </div>
                                                <span className={`status-text ${u.isActive !== false ? "active" : "inactive"}`}>
                                                    {u.isActive !== false ? "Enabled" : "Disabled"}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn view"
                                                    onClick={() => setViewingUser(u)}
                                                    title="View Details"
                                                >
                                                    <Eye size={14} />
                                                </button>
                                                <button
                                                    className="btn delete"
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    title="Delete Customer"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-data">
                                        {searchTerm ? "No customers found matching your search" : "No customers found"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length > 0 && (
                    <div className="table-footer">
                        <span className="showing-info">
                            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} customers
                        </span>
                        <span className="page-info">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                )}
            </div>

            {viewingUser && (
                <div className="modal-overlay" onClick={() => setViewingUser(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setViewingUser(null)} className="modal-close-outside">
                            <X size={20} />
                        </button>
                        <div className="modal-header">
                            <h2>Customer Details</h2>
                        </div>
                        <div className="modal-body">
                            <div className="view-user-grid">
                                <div className="user-photo-section">
                                    <div className="user-avatar-large" style={{ background: getAvatarColor(viewingUser.firstName) }}>
                                        <span>{getInitial(viewingUser.firstName)}</span>
                                    </div>
                                </div>
                                <div className="user-info-section">
                                    <div className="info-row">
                                        <span className="info-label">Name:</span>
                                        <span className="info-value">{viewingUser.firstName} {viewingUser.lastName}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Email:</span>
                                        <span className="info-value">{viewingUser.email}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Phone:</span>
                                        <span className="info-value">{viewingUser.telephone || "N/A"}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Joined:</span>
                                        <span className="info-value">{new Date(viewingUser.createdAt).toLocaleString()}</span>
                                    </div>
                                    <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />
                                    <div className="info-row">
                                        <span className="info-label">Address Type:</span>
                                        <span className="info-value">{viewingUser.address?.type || "N/A"}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Full Address:</span>
                                        <span className="info-value">{viewingUser.address?.fullAddress || "N/A"}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div className="info-row">
                                            <span className="info-label">City:</span>
                                            <span className="info-value">{viewingUser.address?.city || "N/A"}</span>
                                        </div>
                                        <div className="info-row">
                                            <span className="info-label">State:</span>
                                            <span className="info-value">{viewingUser.address?.state || "N/A"}</span>
                                        </div>
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

export default Customers;
