import React, { useState, useEffect } from "react";
import './App.css'
import Header from './components/Header/Header'
import AnimatedText from './components/AnimatedText/AnimatedText'
import CreateArea from './components/CreateArea/CreateArea'
import Task from './components/Task/Task.jsx'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskDetails from "./components/TaskDetails/TaskDetails.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedTask, setselectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await fetch("https://taskly-a7a22-default-rtdb.firebaseio.com/taskly/tasks.json");
      if (response.ok) {
        const data = await response.json();
        const fetchedTasks = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTasks(fetchedTasks);
      } else {
        console.error("Error fetching tasks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function addTask(newTask) {
    try {
      if (currentTask !== null) {
  
        const taskId = tasks[currentTask].id;
        const response = await fetch(`https://taskly-a7a22-default-rtdb.firebaseio.com/taskly/tasks/${taskId}.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        if (response.ok) {
          setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[currentTask] = { id: taskId, ...newTask };
            return updatedTasks;
          });
          setCurrentTask(null);
          setSuccessMessage("Task updated successfully!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          console.error("Error updating the task:", response.statusText);
        }
      } else {
  
        const response = await fetch("https://taskly-a7a22-default-rtdb.firebaseio.com/taskly/tasks.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });


        if (response.ok) {
          const data = await response.json();
          setTasks(prevTasks => [...prevTasks, { id: data.name, ...newTask }]);
          setSuccessMessage("Task added successfully!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          console.error("Error saving the task:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  }



  async function deleteTask(id) {
    try {
      const taskId = tasks[id].id;
      const response = await fetch(`https://taskly-a7a22-default-rtdb.firebaseio.com/taskly/tasks/${taskId}.json`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks(prevTasks => prevTasks.filter((taskItem, index) => index !== id));
        setselectedTask(null); 
        setSuccessMessage("Task deleted successfully!");

       
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        console.error("Error deleting the task:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }


  async function editTask(id, updatedTask = null) {
    try {
      if (updatedTask) {
        const taskId = tasks[id].id;
        const response = await fetch(`https://taskly-a7a22-default-rtdb.firebaseio.com/taskly/tasks/${taskId}.json`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });
        if (response.ok) {
          setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[id] = { id: taskId, ...updatedTask };
            return updatedTasks;
          });
          setselectedTask(null);
          setSuccessMessage("Task updated successfully!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        } else {
          console.error("Error updating the task:", response.statusText);
        }
      } else {
        setCurrentTask(id);
        setselectedTask(null);
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }

  function viewTask(id) {
    setselectedTask({
      ...tasks[id],
      id: id
    });
  }

  function closeTaskDetails() {
    setselectedTask(null);
  }


  return (
    <div>
      <Header />
      <AnimatedText/>
      <CreateArea onAdd={addTask} taskToEdit={currentTask !== null ? tasks[currentTask] : null} />
      {tasks.map((taskItem, index) => (
        <Task
          key={index}
          id={index}
          title={taskItem.title}
          content={taskItem.content}
          dueDate={taskItem.dueDate}
          onDelete={deleteTask}
          onEdit={editTask}
          onView={viewTask}
        />
      ))}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={closeTaskDetails}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      )}
  
      {successMessage && (
        <div className="success-message">
          <CheckCircleIcon style={{ color: "#4CAF50", marginRight: "5px" }} />
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default App;
