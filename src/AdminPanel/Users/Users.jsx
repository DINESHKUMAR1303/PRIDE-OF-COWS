import React from "react";
import "./Users.css";

const Users = () => {
  return (
    <div className="users-page">
      <header className="users-header">
        <div>
          <h2>Users</h2>
          <p>Manage admin and staff users</p>
        </div>

        <button className="add-user-btn">+ Add User</button>
      </header>

      <div className="users-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#U001</td>
              <td>Admin User</td>
              <td>admin@prideofcows.com</td>
              <td>Super Admin</td>
              <td>
                <span className="status active">Active</span>
              </td>
              <td>
                <button className="action-btn">Edit</button>
              </td>
            </tr>

            <tr>
              <td>#U002</td>
              <td>Staff User</td>
              <td>staff@prideofcows.com</td>
              <td>Manager</td>
              <td>
                <span className="status inactive">Inactive</span>
              </td>
              <td>
                <button className="action-btn">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
