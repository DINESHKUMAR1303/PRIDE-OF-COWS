import React, { useEffect, useState } from "react";
import { fetchStaff } from "../../api/user";
import {
  Pencil,
  Settings,
  Trash2,
  Search,
  FileText,
  FileSpreadsheet,
  Printer,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import "./ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchStaff();
      setUsers(Array.isArray(res?.data) ? res.data : res?.data?.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      setUsers([]);
    }
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  // Get avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "#60a5fa", // blue
      "#34d399", // green
      "#f87171", // red
      "#a78bfa", // purple
      "#fb923c", // orange
      "#fbbf24", // yellow
      "#6b7280", // gray
      "#1e293b", // dark
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  // Get permission badge colors
  const getPermissionColor = (permission) => {
    const colorMap = {
      "Dashboard": "#1e293b",
      "User Module": "#1e293b",
      "Users": "#3b82f6",
      "Product": "#a855f7",
      "Catalog": "#1e293b",
      "Customers": "#3b82f6",
      "Customer": "#3b82f6",
      "Booking": "#ef4444",
      "Bookings": "#ef4444",
      "Reports": "#1e293b",
      "Settings": "#1e293b",
    };
    return colorMap[permission] || "#1e293b";
  };

  // Filter users by search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.contact?.includes(searchTerm)
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Select all toggle
  const toggleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(u => u._id));
    }
};<></>

  // Toggle individual user selection
  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Export handlers
  const handleExportPDF = () => {
    console.log("Export to PDF");
    // Implement PDF export logic
  };

  const handleExportExcel = () => {
    console.log("Export to Excel");
    // Implement Excel export logic
  };

  const handlePrint = () => {
    window.print();
  };

  // Action handlers
  const handleEdit = (user) => {
    console.log("Edit user:", user);
    // Implement edit logic
  };

  const handleViewSettings = (user) => {
    console.log("View settings:", user);
    // Implement settings view logic
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log("Delete user:", user);
      // Implement delete logic
    }
  };

  return (
    <div className="manage-user-page">
      <div className="manage-header">
        <div className="manage-header-left">
          <h2 className="manage-title">Manage Users</h2>
          <p className="manage-subtitle">
            Use this form to update user profiles.
          </p>
        </div>
      </div>

      <div className="manage-table-card">
        <div className="manage-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <button className="export-btn pdf" onClick={handleExportPDF} title="Export to PDF">
              <FileText size={16} />
            </button>
            <button className="export-btn excel" onClick={handleExportExcel} title="Export to Excel">
              <FileSpreadsheet size={16} />
            </button>
            <button className="export-btn print" onClick={handlePrint} title="Print">
              <Printer size={16} />
            </button>

            <select
              className="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

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
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>PHOTO</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CONTACT NO</th>
                <th>PASSWORD</th>
                <th>PERMISSIONS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 &&
                currentUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(u._id)}
                        onChange={() => toggleUserSelection(u._id)}
                      />
                    </td>

                    <td>
                      <div className="user-avatar" style={{
                        background: u.profileImage ? 'transparent' : getAvatarColor(u.name)
                      }}>
                        {u.profileImage ? (
                          <img
                            src={`http://localhost:5000${u.profileImage}`}
                            alt={u.name}
                          />
                        ) : (
                          <span>{getInitial(u.name)}</span>
                        )}
                      </div>
                    </td>

                    <td className="user-name">{u.name}</td>
                    <td className="email">{u.email}</td>
                    <td className="contact">{u.contact}</td>
                    <td className="password">{"•".repeat(6)}</td>

                    <td>
                      <div className="permission-badges">
                        {(u.departments || []).map((d) => (
                          <span
                            key={d}
                            className="badge"
                            style={{ background: getPermissionColor(d) }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn edit"
                          onClick={() => handleEdit(u)}
                          title="Edit User"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn view"
                          onClick={() => handleViewSettings(u)}
                          title="View Settings"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          className="btn delete"
                          onClick={() => handleDelete(u)}
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {currentUsers.length === 0 && (
                <tr>
                  <td colSpan="8" className="no-data">
                    {searchTerm ? "No users found matching your search" : "No users found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > 0 && (
          <div className="table-footer">
            <span className="showing-info">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
            </span>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
