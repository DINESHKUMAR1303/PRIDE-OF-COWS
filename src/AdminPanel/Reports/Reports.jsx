import React, { useState } from "react";
import {
    FileText,
    Calendar,
    Download,
    Filter,
    ChevronDown,
    Printer
} from "lucide-react";
import "./Reports.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAllOrders } from "../../api/order";
import { fetchAllUsers } from "../../api/user";
import { fetchProducts } from "../../api/product";

const Reports = () => {
    const [reportType, setReportType] = useState("Sales");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Dropdown States
    const [isReportTypeOpen, setIsReportTypeOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [reportData, setReportData] = useState([]);
    const [reportColumns, setReportColumns] = useState([]);
    const [generatedTitle, setGeneratedTitle] = useState("");
    const [generatedDate, setGeneratedDate] = useState("");
    const [loading, setLoading] = useState(false);

    // Mappings for Display
    const reportTypeMap = {
        "Sales": "Sales Report",
        "Orders": "Orders Report",
        "Customers": "Customer Registration"
    };

    const statusMap = {
        "all": "All Statuses",
        "pending": "Pending",
        "confirmed": "Confirmed",
        "shipped": "Shipped",
        "delivered": "Delivered",
        "cancelled": "Cancelled"
    };

    const fetchReportData = async () => {
        let tableColumn = [];
        let data = [];
        let fetchedData = [];

        // Fetch and process data based on report type
        if (reportType === "Orders" || reportType === "Sales") {
            const res = await getAllOrders();
            const responseData = res.data || res;

            if (responseData && (responseData.success || Array.isArray(responseData.orders))) {
                fetchedData = responseData.orders || [];

                // Filter by date
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59);

                    fetchedData = fetchedData.filter(item => {
                        const date = new Date(item.createdAt);
                        return date >= start && date <= end;
                    });
                }

                if (reportType === "Sales") {
                    const SALES_STATUSES = ["confirmed", "shipped", "delivered", "completed"];

                    if (statusFilter === "all") {
                        fetchedData = fetchedData.filter(item => item.status && SALES_STATUSES.includes(item.status.toLowerCase()));
                    } else {
                        fetchedData = fetchedData.filter(item => item.status && item.status.toLowerCase() === statusFilter);
                    }
                } else {
                    if (statusFilter !== "all") {
                        fetchedData = fetchedData.filter(item => item.status && item.status.toLowerCase() === statusFilter);
                    }
                }

                if (reportType === "Sales") {
                    tableColumn = ["Order ID", "Date", "Customer", "Items", "Amount", "Status"];
                    data = fetchedData.map(order => ({
                        col1: order._id.substring(0, 8),
                        col2: new Date(order.createdAt).toLocaleDateString(),
                        col3: order.userId ? ((order.userId.firstName ? `${order.userId.firstName} ${order.userId.lastName}` : order.userId.name) || (order.userId.email ? order.userId.email.split('@')[0] : "Guest")) : "Guest",
                        col4: order.items?.length || 0,
                        col5: `₹${order.totalAmount || order.totalPrice}`,
                        col6: order.status
                    }));
                } else {
                    tableColumn = ["Order ID", "Date", "Customer", "Delivery Date", "Amount", "Status"];
                    data = fetchedData.map(order => ({
                        col1: order._id.substring(0, 8),
                        col2: new Date(order.createdAt).toLocaleDateString(),
                        col3: order.userId ? ((order.userId.firstName ? `${order.userId.firstName} ${order.userId.lastName}` : order.userId.name) || (order.userId.email ? order.userId.email.split('@')[0] : "Guest")) : "Guest",
                        col4: order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "N/A",
                        col5: `₹${order.totalAmount || order.totalPrice}`,
                        col6: order.status
                    }));
                }
            }
        } else if (reportType === "Customers") {
            const res = await fetchAllUsers();
            if (res.success) {
                fetchedData = res.data || [];

                // Filter by date (joined date)
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    end.setHours(23, 59, 59);

                    fetchedData = fetchedData.filter(item => {
                        const date = new Date(item.createdAt);
                        return date >= start && date <= end;
                    });
                }

                // Status filter (Active/Inactive) if applicable
                // Note: User status isn't "pending/confirmed", so mapped roughly or ignored if not relevant
                // For simplicity, ignoring status filter for Customers unless explicitly mapped

                tableColumn = ["Name", "Email", "Phone", "City", "Joined Date", "Status"];
                data = fetchedData.map(user => ({
                    col1: (user.firstName ? `${user.firstName} ${user.lastName}` : user.name) || (user.email ? user.email.split('@')[0] : "Guest"),
                    col2: user.email,
                    col3: user.telephone || "N/A",
                    col4: user.address?.city || "N/A",
                    col5: new Date(user.createdAt).toLocaleDateString(),
                    col6: user.isActive !== false ? "Active" : "Inactive"
                }));
            }
        }

        return { tableColumn, data };
    };

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { tableColumn, data } = await fetchReportData();

            if (data.length === 0) {
                alert("No data found for the selected criteria.");
                setReportData([]);
                setReportColumns([]);
            } else {
                setReportColumns(tableColumn);
                setReportData(data);
                setGeneratedTitle(`${reportTypeMap[reportType]} Result`);
                setGeneratedDate(startDate && endDate ? `From ${startDate} to ${endDate}` : `Generated on ${new Date().toLocaleDateString()}`);
            }
        } catch (err) {
            console.error("Error generating report:", err);
            alert("Failed to generate report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        if (reportData.length === 0) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(generatedTitle, 14, 22);
        doc.setFontSize(11);
        doc.text(generatedDate, 14, 30);
        if (statusFilter !== "all") {
            doc.text(`Status: ${statusMap[statusFilter]}`, 14, 36);
        }

        const tableRows = reportData.map(row => Object.values(row));

        autoTable(doc, {
            head: [reportColumns],
            body: tableRows,
            startY: reportType === "Sales" ? 50 : 40,
        });
        doc.save(`${reportType}_Report_${Date.now()}.pdf`);
    };

    return (
        <div className="reports-page">
            <div className="reports-header">
                <h2 className="reports-title">Advanced Reports</h2>
                <div className="reports-breadcrumb">
                    <span className="breadcrumb-item">Admin</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item active">Reports</span>
                </div>
            </div>

            <div className="reports-content">
                <div className="reports-card generation-card">
                    <div className="card-header">
                        <div className="header-left">
                            <FileText size={20} className="card-icon" />
                            <h3>Report Configuration</h3>
                        </div>
                    </div>

                    <form onSubmit={handleGenerateReport} className="reports-form">
                        <div className="form-grid">
                            {/* Report Type (Custom Dropdown) */}
                            <div className="report-form-group">
                                <label>Report Type</label>
                                <div
                                    className={`custom-reports-dropdown ${isReportTypeOpen ? 'open' : ''}`}
                                    onClick={() => setIsReportTypeOpen(!isReportTypeOpen)}
                                >
                                    <div className="custom-select-trigger">
                                        <span>{reportTypeMap[reportType]}</span>
                                        <ChevronDown size={16} className={`custom-select-arrow ${isReportTypeOpen ? 'open' : ''}`} />
                                    </div>

                                    {isReportTypeOpen && (
                                        <div className="custom-dropdown-menu">
                                            {Object.entries(reportTypeMap).map(([key, label]) => (
                                                <div
                                                    key={key}
                                                    className={`custom-dropdown-item ${reportType === key ? 'selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setReportType(key);
                                                        setIsReportTypeOpen(false);
                                                    }}
                                                >
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* From Date */}
                            <div className="report-form-group">
                                <label>From Date</label>
                                <div className="input-wrapper">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="report-form-group">
                                <label>To Date</label>
                                <div className="input-wrapper">
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {/* Status Filter (Custom Dropdown) */}
                            <div className="report-form-group">
                                <label>Status</label>
                                <div
                                    className={`custom-reports-dropdown ${isStatusOpen ? 'open' : ''}`}
                                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                                >
                                    <div className="custom-select-trigger">
                                        <span>{statusMap[statusFilter]}</span>
                                        <ChevronDown size={16} className={`custom-select-arrow ${isStatusOpen ? 'open' : ''}`} />
                                    </div>

                                    {isStatusOpen && (
                                        <div className="custom-dropdown-menu">
                                            {Object.entries(statusMap).map(([key, label]) => (
                                                <div
                                                    key={key}
                                                    className={`custom-dropdown-item ${statusFilter === key ? 'selected' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setStatusFilter(key);
                                                        setIsStatusOpen(false);
                                                    }}
                                                >
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="action-btn generate-btn" disabled={loading}>
                                <FileText size={18} />
                                <span>{loading ? "Generating..." : "View Report"}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Report Results */}
                <div className="reports-card results-card">
                    <div className="card-header">
                        <div className="header-left">
                            <Filter size={20} className="card-icon" />
                            <h3>{generatedTitle || "Report Results"}</h3>
                        </div>
                        {reportData.length > 0 && (
                            <div className="header-actions">
                                <button type="button" className="action-btn print-btn" onClick={() => window.print()}>
                                    <Printer size={18} />
                                    <span>Print</span>
                                </button>
                                <button type="button" className="action-btn generate-btn" onClick={handleDownloadPDF} style={{ marginLeft: '10px' }}>
                                    <Download size={18} />
                                    <span>Download PDF</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {reportData.length > 0 ? (
                        <div className="table-container">
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        {reportColumns.map((col, index) => (
                                            <th key={index}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).map((val, i) => (
                                                <td key={i}>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No report generated yet. Use the form above to view a report.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
