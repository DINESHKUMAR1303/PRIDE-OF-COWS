import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStaff, deleteStaff, bulkDeleteStaff } from "../../api/user";
import {
  Pencil,
  Eye,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { MdPrint } from "react-icons/md";
import "./ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const navigate = useNavigate();

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
  }; <></>

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
    // Navigate to AddUser page with user data for editing
    navigate(`/admin/users/add`, { state: { editUser: user } });
  };

  const handleViewSettings = (user) => {
    setViewingUser(user);
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteStaff(user._id);
        await loadUsers();
        alert("User deleted successfully");
      } catch (err) {
        alert(err.message || "Failed to delete user");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) {
      try {
        await bulkDeleteStaff(selectedUsers);
        await loadUsers();
        setSelectedUsers([]);
        alert("Users deleted successfully");
      } catch (err) {
        alert(err.message || "Failed to delete users");
      }
    }
  };

  return (
    <div className="manage-user-page">
      <div className="manage-header">
        <div className="manage-header-left">
          <h2 className="manage-title">User Management</h2>
          <div className="manage-breadcrumb">
            <span className="breadcrumb-item">User Modules</span>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-item active">Manage Users</span>
          </div>
        </div>
      </div>

      <div className="manage-table-card">
        <div className="manage-toolbar">
          <div className="toolbar-left">
            <h3 className="toolbar-title">Manage Users</h3>
            <p className="toolbar-subtitle">Use this form to update user profiles.</p>
          </div>

          <div className="toolbar-right">
            {selectedUsers.length > 0 && (
              <button className="bulk-delete-btn" onClick={handleBulkDelete}>
                <Trash2 size={18} />
              </button>
            )}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} />
            </div>

            <div className="export-group">
              <button className="export-btn pdf" onClick={handleExportPDF} title="Export to PDF">
                <FaFilePdf size={18} />
              </button>
              <div className="export-divider"></div>
              <button className="export-btn excel" onClick={handleExportExcel} title="Export to Excel">
                <FaFileExcel size={18} />
              </button>
              <div className="export-divider"></div>
              <button className="export-btn print" onClick={handlePrint} title="Print">
                <MdPrint size={20} />
              </button>
            </div>

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
                        {(u.departments || [])
                          .filter((d) => d !== "Dashboard")
                          .map((d) => (
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
                          title="View User"
                        >
                          <Eye size={14} />
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

      {/* View User Modal */}
      {viewingUser && (
        <div className="modal-overlay" onClick={() => setViewingUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewingUser(null)} className="modal-close-outside">
              <X size={20} />
            </button>
            <div className="modal-header">
              <h2>User Details</h2>
            </div>
            <div className="modal-body">
              <div className="view-user-grid">
                <div className="user-photo-section">
                  <div className="user-avatar-large" style={{
                    background: viewingUser.profileImage ? 'transparent' : getAvatarColor(viewingUser.name)
                  }}>
                    {viewingUser.profileImage ? (
                      <img
                        src={`http://localhost:5000${viewingUser.profileImage}`}
                        alt={viewingUser.name}
                      />
                    ) : (
                      <span>{getInitial(viewingUser.name)}</span>
                    )}
                  </div>
                </div>
                <div className="user-info-section">
                  <div className="info-row">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{viewingUser.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{viewingUser.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Contact:</span>
                    <span className="info-value">{viewingUser.contact}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Designation:</span>
                    <span className="info-value">{viewingUser.designation || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Permissions:</span>
                    <div className="permission-badges">
                      {(viewingUser.departments || [])
                        .filter((d) => d !== "Dashboard")
                        .map((d) => (
                          <span
                            key={d}
                            className="badge"
                            style={{ background: getPermissionColor(d) }}
                          >
                            {d}
                          </span>
                        ))}
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

export default ManageUser;
