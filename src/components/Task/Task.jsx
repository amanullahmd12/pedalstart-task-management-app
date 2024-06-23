import React, { useState } from "react";
import "./Task.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

function Task(props) {
  const maxContentLength = 10; 
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function handleDelete() {
    setShowConfirmDialog(true);
  }

  function handleConfirmDelete() {
    setShowConfirmDialog(false);
    props.onDelete(props.id);
  }

  function handleCancelDelete() {
    setShowConfirmDialog(false);
  }

  function handleEdit() {
    props.onEdit(props.id);
  }

  function handleView() {
    props.onView(props.id);
  }

  return (
    <div className="task">
      <h1>{props.title}</h1>
      <p>
        {props.content.length > maxContentLength
          ? props.content.substring(0, maxContentLength) + "..."
          : props.content}
      </p>
      {props.dueDate && <p><strong>Due Date:</strong> {props.dueDate}</p>}
      <button onClick={handleDelete} className="delete">
        <DeleteIcon />
      </button>
      <button onClick={handleView} className="eye">
        <VisibilityIcon />
      </button>

      <Modal
        open={showConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="delete-confirmation-description"
        className="delete-modal" 
      >
        <div className="modal-content">
          <h2 id="delete-confirmation-modal">Are you sure you want to delete this task?</h2>
          <p className=""><strong>Once its gets deleted can't retrived.</strong></p>
          <Button onClick={handleConfirmDelete}>Delete</Button>
          <Button onClick={handleCancelDelete}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Task;
