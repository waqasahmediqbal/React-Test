// Modal.jsx

import React from "react";
import "./Modal.css"; // You can define your modal styles in Modal.css

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
