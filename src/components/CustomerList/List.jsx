import React, { useState } from "react";
import "./List.css";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import AddModal from "../Modal/CreateModal";

const UserList = ({ users, onEdit, onDelete,onAdd }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };
  const openAddModal = () => {
    setShowAddModal(true);
  };
  const openEditModal = (userId) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };
  const closeModal = () => {
    setSelectedUserId(null);
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowAddModal(false);
  };

  const handleDelete = () => {
    onDelete(selectedUserId);
    closeModal();
  };
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy) {
      const aValue = String(a[sortBy]);
      const bValue = String(b[sortBy]);

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }

    return 0;
  });
  return (
    <div className="user-list">
      <div>
        <button className="add-icon" onClick={openAddModal}><i className="material-icons">add</i></button>
        <button className="add-btn" onClick={openAddModal}>
          <span>+</span> ADD NEW CUSTOMER
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th />
            <th onClick={() => handleSort("id")}>
              Customer ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("name")}>
              Customer Name{" "}
              {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user?.id} className="user-row">
              <td>
                <img
                  src={user?.avatar}
                  alt={`Avatar of ${user?.name}`}
                  className="avatar"
                />
              </td>
              <td>00{user?.id}</td>
              <td className="customer-name">{user?.name}</td>
              <td>{user?.email}</td>
              <td className="user-actions">
                <button className="edit-icon" onClick={() => openEditModal(user.id)}><i className="material-icons">edit</i></button>
                <button className="del-icon" onClick={() => openDeleteModal(user.id)}><i className="material-icons">delete</i></button>
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(user.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => openDeleteModal(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the Delete Modal */}
      {showDeleteModal && (
        <DeleteModal closeModal={closeModal} handleDelete={handleDelete}/>
      )}

      {/* Render the Edit Modal */}
      {showEditModal && (
         <EditModal
         onClose={closeModal}
         onEdit={onEdit}
         userData={users.find((user) => user.id === selectedUserId)}
       />
      )}

      {/* Render the Add Modal */}
      {showAddModal && <AddModal onClose={closeModal} onAdd={onAdd} users={users}/>}
    </div>
  );
};

export default UserList;
