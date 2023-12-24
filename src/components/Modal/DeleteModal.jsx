import React from "react";
import deleteIcon from "../../assets/delete-icon.png";
import Modal from "./Modal";

function DeleteModal({closeModal,handleDelete}) {
  return (
    <Modal>
      <span className="close" onClick={closeModal}>&times;</span>
      <img
        src={deleteIcon}
        alt="icon"
        style={{ width: "85px", height: "85px", marginTop: "60px" }}
      />
      <h1 style={{ fontSize: "30px" }}>Are you sure?</h1>
      <p style={{ fontSize: "24px" }}>
        Do you really want to delete this customer?
        <br />
        This process can not be undone.
      </p>
      <button onClick={closeModal} className="modal-cancel">
        CANCEL
      </button>
      <button onClick={handleDelete} className="modal-del">
        DELETE
      </button>
    </Modal>
  );
}

export default DeleteModal;
