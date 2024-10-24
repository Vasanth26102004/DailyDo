import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./TaskDetail.css";
import Task from "../Task/Task.jsx";

const TaskDetail = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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