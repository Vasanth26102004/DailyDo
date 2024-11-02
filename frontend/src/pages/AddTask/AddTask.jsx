import React, { useContext, useState } from "react";
import "./AddTask.css";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";
import shape from "../../assets/shape-blue.png";
import { Link, useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { tasks, setTasks } = useContext(TaskList);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();

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
      const response = await fetch(
        "https://daily-do-server.vercel.app/task/addtask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
          body: JSON.stringify(taskWithDateTime),
        }
      );

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
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="addTask-content">
      <img class="background" src={shape} alt=""/>
      <h4 className="addTask-header">Add Your Task Here!</h4>
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
          placeholder="Descripr your Task"
        />
        <div className="seperate">
          <div className="time">
            <p>
              Deadline<span>*</span>
            </p>
            <input
              id="time"
              type="time"
              name="time"
              value={newTask.time}
              onChange={changeHandler}
              placeholder="00:00"
              required
            />
          </div>
          <div className="date">
            <p>
              Deadline<span>*</span>
            </p>
            <input
              id="date"
              type="date"
              name="date"
              value={newTask.date}
              onChange={changeHandler}
              required
            />
          </div>
        </div>
        <br />
        <button id="submit-button" type="submit">
          Submit
        </button>
        <Link to="/dashboard">
        <button id="cancel-button" type="cancel">
          Cancel
        </button>
        </Link>
      </form>
    </div>
  );
};

export default AddTask;
