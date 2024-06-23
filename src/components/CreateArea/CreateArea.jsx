import React, { useState, useEffect } from "react";
import "./CreateArea.css";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";


function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [task, setTask] = useState({
    title: "",
    content: "",
    dueDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    dueDate: "",
  });

  useEffect(() => {
    if (props.taskToEdit) {
      setTask({
        title: props.taskToEdit.title,
        content: props.taskToEdit.content,
        dueDate: props.taskToEdit.dueDate,
      });
      setExpanded(true);
    } else {
      setTask({
        title: "",
        content: "",
        dueDate: "",
      });
      setExpanded(false);
    }
  }, [props.taskToEdit]);

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((prevtask) => ({
      ...prevtask,
      [name]: value,
    }));
  }

  function validateForm() {
    let valid = true;
    const newErrors = {
      title: "",
      content: "",
      dueDate: "",
    };

    if (!task.title) {
      newErrors.title = "Please enter a task title.";
      valid = false;
    }

    if (!task.content) {
      newErrors.content = "Please enter task description.";
      valid = false;
    }

    if (!task.dueDate) {
      newErrors.dueDate = "Please select a due date.";
      valid = false;
    }

    if (!task.title && !task.content && !task.dueDate) {
      setErrorMessage("Please fill all the required fields.");
      valid = false;
    } else {
      setErrorMessage("");
    }

    setErrors(newErrors);
    return valid;
  }

  function submittask(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    props.onAdd(task);
    setSuccessMessage("Task added successfully!");

    // Clear form fields and collapse form after submission
    setTask({
      title: "",
      content: "",
      dueDate: "",
    });
    setExpanded(false);

    // Clear messages after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-task">
        <input
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={task.title}
          placeholder="Task Title"
        />
        {errors.title && (
          <div className="error-message">{errors.title}</div>
        )}
        {isExpanded && (
          <textarea
            name="content"
            onChange={handleChange}
            value={task.content}
            placeholder="Task Description..."
            rows={isExpanded ? 3 : 1}
          />
        )}
        {errors.content && (
          <div className="error-message">{errors.content}</div>
        )}
        {isExpanded && (
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            value={task.dueDate}
            placeholder="Due Date"
          />
        )}
        {errors.dueDate && (
          <div className="error-message">{errors.dueDate}</div>
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submittask}>
         Add
          </Fab>
        </Zoom>
      </form>
      {successMessage && (
        <div className="success-message">
          <CheckCircleIcon style={{ color: "#4CAF50", marginRight: "5px" }} />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <WarningIcon style={{ color: "#ff0000", marginRight: "5px" }} />
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default CreateArea;
