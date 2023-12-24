import React, { useState } from "react";
import Modal from "../Modal/Modal";

const EditModal = ({ onClose, onEdit, userData }) => {
  const [editedUserData, setEditedUserData] = useState(userData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setSelectedFile(dataUrl);
    };
    if (file) {
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const editedItem = {
      id: userData.id,
      email: editedUserData.email,
      name: editedUserData.name,
      avatar: selectedFile ? selectedFile : editedUserData.avatar,
    };
    onEdit(userData.id, editedItem);
    onClose();
  };

  return (
    <Modal>
      <div className="modal-header">
      <span className="close" onClick={onClose}>&times;</span>
        <h1 style={{ fontSize: "30px" }}>Edit Customer</h1>
      </div>
      <form className="modal-form">
        <div>
          <input
            className="inputField"
            type="text"
            placeholder="Name"
            value={editedUserData.name}
            required
            onChange={(e) =>
              setEditedUserData({
                ...editedUserData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            className="inputField"
            type="text"
            placeholder="email"
            value={editedUserData.email}
            required
            onChange={(e) =>
              setEditedUserData({
                ...editedUserData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="fileInput"
            style={{
              color: "#57BC90",
              textDecoration: "underline",
              fontSize: "20px",
              marginLeft: "20px",
              marginRight: "40px",
            }}
          >
            Upload Image
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {selectedFile && <p>{fileName}</p>}
        </div>
        <button type="submit" onClick={handleEdit} className="">
          EDIT CUSTOMER
        </button>
      </form>
    </Modal>
  );
};

export default EditModal;
