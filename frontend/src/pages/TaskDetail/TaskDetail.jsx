import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TaskDetail.css";
import Task from "../Task/Task.jsx";
import { response } from "express";

const TaskDetail = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTasks,setDeleteTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://daily-do-server.vercel.app/task/alltask", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
        });
        const data = await response.json(); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(data.tasks.length);
        setTaskList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchDeleteTasks = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        const response = await fetch("https://daily-do-server.vercel.app/task/alltask", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const currentTime = new Date().getTime();
  
        // Filter tasks older than 3 days (3 days = 3 * 24 * 60 * 60 * 1000 milliseconds)
        const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
        const oldTasks = data.tasks.filter(task => {
          const taskTime = new Date(task.dateTime).getTime(); // Assuming task has a createdAt field
          return (currentTime - taskTime) > threeDaysInMillis;
        });
  
        // Delete old tasks
        for (const task of oldTasks) {
          await fetch(`https://daily-do-server.vercel.app/task/deletetask/${task.id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "user-id": localStorage.getItem("user-id"),
            },
          });
        }
  
        // Optionally, refresh the task list after deletion
        const updatedResponse = await fetch("https://daily-do-server.vercel.app/task/alltask", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
        });
        const updatedData = await updatedResponse.json();
        setTaskList(updatedData);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDeleteTasks(); // Call the function
  }, []); // Ensure to pass an empty dependency array to run this effect once on mount

  if (loading) {
    return <div className="task-content">Loading tasks...</div>;
  }

  if (error) {
    return <div className="task-content">Error: {error}</div>;
  }

  return (
    <div className="task-content">
      <div className="task-header">
        <h4>Task List</h4>
      </div>
      <div className="task-element">
        {taskList.tasks.length > 0 ? (
          taskList.tasks.map((item) => (
            <div className="task-eachelement" key={item.id}>
              <Task
                id={item.id}
                title={item.title}
                description={item.description}
                deadline={`Date:${item.date} Time:${item.time}`}
              />
            </div>
          ))
        ) : (
          <div className="task-noelement">
            <p>No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;