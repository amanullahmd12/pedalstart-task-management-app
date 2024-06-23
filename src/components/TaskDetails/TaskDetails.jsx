import React, { useState, useEffect } from "react";
import "./TaskDetails.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

function TaskDetails(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: props.task.title,
    content: props.task.content,
    dueDate: props.task.dueDate,
  });

  useEffect(() => {
    setEditedTask({
      title: props.task.title,
      content: props.task.content,
      dueDate: props.task.dueDate,
    });
  }, [props.task]);

  function handleChange(event) {
    const { name, value } = event.target;

    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedTask({
      title: props.task.title,
      content: props.task.content,
      dueDate: props.task.dueDate,
    });
  }

  function handleSave(event) {
    event.preventDefault();
    if (!editedTask.title || !editedTask.content || !editedTask.dueDate) {
      alert("Please fill in all the task details.");
      return;
    }
    props.onEdit(props.task.id, editedTask);
    setIsEditing(false);
  }

  function handleDelete() {
    props.onDelete(props.task.id);
  }

  return (
    <div className="task-details-overlay">
      <div className="task-details">
        <div className="task-details-header">
          {isEditing ? (
            <>
              <input
                name="title"
                onChange={handleChange}
                value={editedTask.title}
                placeholder="Task Title"
              />
              <div>
                <button onClick={handleCancel} className="close">
                <CloseIcon />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{props.task.title}</h2>
              <div>
                <button onClick={handleEdit} className="edit">
                  <EditIcon />
                </button>
                <button onClick={handleDelete} className="delete">
                  <DeleteIcon />
                </button>
                <button onClick={props.onClose} className="close">
                  <CloseIcon />
                </button>
              </div>
            </>
          )}
        </div>
        {isEditing ? (
          <>
            <textarea
              name="content"
              onChange={handleChange}
              value={editedTask.content}
              placeholder="Task Description..."
              rows={3}
            />
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              value={editedTask.dueDate}
              placeholder="Due Date"
            /> <br />
            <button onClick={handleSave} className="save">
              <SaveIcon />
                </button>
          </>
        ) : (
          <>
            <p>{props.task.content}</p>
            {props.task.dueDate && <p><strong>Due Date:</strong> {props.task.dueDate}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
