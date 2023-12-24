import React, { useState } from "react";
import Modal from "./Modal";

function CreateModal({ onClose, onAdd, users }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  const handleAdd = (e) => {
    e.preventDefault();
    const data = {
      id: Math.max(...users.map((user) => user.id), 0) + 1,
      email: email,
      name: name,
      avatar: selectedFile,
    };
    onAdd(data);
    onClose();
  };
  return (
    <Modal>
      <div className="modal-header">
      <span className="close" onClick={onClose}>&times;</span>
        <h1 style={{ fontSize: "30px" }}>Add New Customer</h1>
      </div>
      <form className="modal-form">
        <div>
          <input
            className="inputField"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="inputField"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
        <button type="submit" onClick={handleAdd}>
          ADD CUSTOMER
        </button>
      </form>
    </Modal>
  );
}

export default CreateModal;
