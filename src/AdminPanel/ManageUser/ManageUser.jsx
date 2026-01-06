import React, { useEffect, useState } from "react";
import { fetchStaff } from "../../api/user";
import { Pencil, Eye, Trash2 } from "lucide-react";
import "./ManageUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchStaff();

      // ✅ IMPORTANT FIX
      // backend returns { success, data: [] }
      setUsers(Array.isArray(res?.data) ? res.data : res?.data?.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      setUsers([]);
    }
  };

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="manage-user-page">
      <h2 className="manage-title">Manage Users</h2>
      <p className="manage-subtitle">
        Use this table to update user profiles.
      </p>

      <div className="manage-table-wrapper">
        <table className="manage-table">
          <thead>
            <tr>
              <th></th>
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
            {users.length > 0 &&
              users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>
                    <div className="user-avatar">
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

                  <td>{u.name}</td>
                  <td className="email">{u.email}</td>
                  <td>{u.contact}</td>
                  <td>{"•".repeat(6)}</td>

                  <td>
                    <div className="permission-badges">
                      {(u.departments || []).map((d) => (
                        <span key={d} className="badge">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="btn edit">
                        <Pencil size={14} />
                      </button>
                      <button className="btn view">
                        <Eye size={14} />
                      </button>
                      <button className="btn delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="8" className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
