import React, { useContext, useState } from "react";
import "./AddTask.css";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";

const AddTask = () => {
  const { tasks, setTasks } = useContext(TaskList);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => Object.assign({}, prevTask, { [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const taskWithDateTime = {
      ...newTask,
    };
  
    try {
      const response = await fetch("https://daily-do-server.vercel.app/task/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": localStorage.getItem("user-id")
        },
        body: JSON.stringify(taskWithDateTime),
      });
  
      if (response.ok) {
        const savedTask = await response.json();
        setTasks((prevTasks) => {
          if (Array.isArray(prevTasks)) {
            return [...prevTasks, savedTask];
          } else {
            return [savedTask];
          }
        });
        setNewTask({
          title: "",
          description: "",
          date: "",
          time: "",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="addTask-content">
      <div className="addTask-header">
        <h4>Add Task</h4>
      </div>
      <form className="task-input" onSubmit={handleSubmit}>
        <p>
          Title<span>*</span>
        </p>
        <input
          className="title"
          type="text"
          name="title"
          size="40"
          placeholder="What do you want to remember?"
          value={newTask.title}
          onChange={changeHandler}
          required
        />
        <p>Description (Optional)</p>
        <input
          className="description"
          type="text"
          name="description"
          value={newTask.description}
          onChange={changeHandler}
        />
        <p>
          Deadline<span>*</span>
        </p>
        <div className="deadline">
          <input
            id="time"
            type="time"
            name="time"
            value={newTask.time}
            onChange={changeHandler}
            required
          />
          <input
            id="date"
            type="date"
            name="date"
            value={newTask.date}
            onChange={changeHandler}
            required
          />
        </div>
        <br />
        <button id="submit-button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
