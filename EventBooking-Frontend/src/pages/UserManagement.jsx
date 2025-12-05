import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

function UserManagement() {
  const [showSubmenu, setShowSubmenu] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    FullName: "",
    Email: "",
    ProfileImage: null
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/all`);
      
      if (response.data.success) {
        setUsers(response.data.users);
        console.log("✅ Users fetched:", response.data.users);
      } else {
        console.error("❌ Failed to fetch users:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to delete");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedUsers.length} user(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user`, {
        data: { userIds: selectedUsers }
      });

      if (response.data.success) {
        alert(`Successfully deleted ${response.data.deletedCount} user(s)`);
        setSelectedUsers([]);
        fetchUsers();
      }
    } catch (error) {
      console.error("❌ Error deleting users:", error);
      alert("Failed to delete users. Please try again.");
    }
  };

  const handleDeleteSingle = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user`, {
        data: { userIds: [userId] }
      });

      if (response.data.success) {
        alert("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      FullName: user.FullName,
      Email: user.Email,
      ProfileImage: null
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("FullName", editFormData.FullName);
      formData.append("Email", editFormData.Email);
      
      if (editFormData.ProfileImage) {
        formData.append("ProfileImage", editFormData.ProfileImage);
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${editingUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("User updated successfully!");
        setShowEditModal(false);
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      console.error("❌ Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-right">
        <div className="sidebar">
          <ul>
            <li onClick={() => window.location.href = "/administrator/dashboard"}>
              <i className="fa fa-home" style={{ marginRight: "8px" }}></i>
              Home Dashboard
            </li>

            <li
              className="menu-heading"
              onClick={() => setShowSubmenu(!showSubmenu)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>
                <i className="fa fa-ticket" style={{ marginRight: "8px" }}></i>
                JTicketing
              </span>
              <i
                className={`fa ${
                  showSubmenu ? "fa-angle-down" : "fa-angle-right"
                }`}
                style={{ marginLeft: "10px" }}
              ></i>
            </li>

            {showSubmenu && (
              <ul className="submenu">
                <li onClick={() => window.location.href = "/administrator/events"}>
                  <i className="fa fa-calendar" style={{ marginRight: "6px" }}></i>
                  Event
                </li>
                <li onClick={() => window.location.href = "/administrator/users"} style={{ backgroundColor: "#d96002" }}>
                  <i className="fa fa-users" style={{ marginRight: "6px" }}></i>
                  Users
                </li>
                <li onClick={() => window.location.href = "/administrator/orders"}>
                  <i className="fa fa-shopping-cart" style={{ marginRight: "6px" }}></i>
                  Order
                </li>
                <li onClick={() => window.location.href = "/administrator/reports"}>
                  <i className="fa fa-bar-chart" style={{ marginRight: "6px" }}></i>
                  Report
                </li>
              </ul>
            )}

            <li 
              onClick={() => {
                localStorage.removeItem("adminLoggedIn");
                localStorage.removeItem("adminLoginTime");
                window.location.href = "/administrator";
              }}
              style={{ marginTop: "20px", borderTop: "1px solid #ffffff33", paddingTop: "20px" }}
            >
              <i className="fa fa-sign-out" style={{ marginRight: "8px" }}></i>
              Logout
            </li>
          </ul>
        </div>
      </div>

      <div className="admin-left">
        <h1>User Management</h1>
        <hr />

        <div className="event-actions">
          {selectedUsers.length > 0 && (
            <button className="deletebtn" onClick={handleDeleteSelected}>
              <i className="fa fa-trash" style={{ marginRight: "5px" }}></i>
              Delete Selected ({selectedUsers.length})
            </button>
          )}
        </div>

        <div className="events-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3>All Users</h3>
            <button onClick={fetchUsers} className="refresh-btn">
              <i className="fa fa-refresh" style={{ marginRight: "5px" }}></i>
              Refresh
            </button>
          </div>
          
          {loading ? (
            <div className="loading-spinner">
              <i className="fa fa-spinner fa-spin"></i>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <p>No users found.</p>
            </div>
          ) : (
            <div className="event-table">
              <table className="event-data-table">
                <thead>
                  <tr>
                    <th className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={handleSelectAll}
                        title="Select All"
                      />
                    </th>
                    <th>Profile</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className={selectedUsers.includes(user._id) ? "selected-row" : ""}>
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                        />
                      </td>
                      <td>
                        {user.ProfileImage ? (
                          <img 
                            src={`${process.env.REACT_APP_API_URL}/uploads/${user.ProfileImage}`} 
                            alt={user.FullName}
                            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                          />
                        ) : (
                          <i className="fa fa-user-circle" style={{ fontSize: "40px", color: "#999" }}></i>
                        )}
                      </td>
                      <td>{user.FullName}</td>
                      <td>{user.Email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="action-buttons-cell">
                        <button
                          className="edit-btn-small"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="delete-btn-small"
                          onClick={() => handleDeleteSingle(user._id)}
                          title="Delete User"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editFormData.FullName}
                  onChange={(e) => setEditFormData({ ...editFormData, FullName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editFormData.Email}
                  onChange={(e) => setEditFormData({ ...editFormData, Email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Profile Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFormData({ ...editFormData, ProfileImage: e.target.files[0] })}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  <i className="fa fa-save"></i> Save Changes
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
