import React, { useContext, useState, useEffect } from "react";
import "./EditTask.css";
import shape from "../../assets/shape-blue.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";

const EditTask = () => {
  const { tasks, setTasks } = useContext(TaskList);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    // Fetch existing task data to populate form
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://daily-do-server.vercel.app/task/gettask/${taskId}`, 
          {
            headers: {
              "Content-Type": "application/json",
              "user-id": localStorage.getItem("user-id"),
            },
          }
        );

        if (response.ok) {
          const task = await response.json();
          setNewTask({
            title: task.title,
            description: task.description || "",
            date: task.date,
            time: task.time,
          });
        } else {
          console.error("Failed to fetch task data");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://daily-do-server.vercel.app/task/edittask/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
          body: JSON.stringify(newTask),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
        
        // Update only the edited task in the task list context
        setTasks((prevTasks) => 
          prevTasks.map((task) => 
            task._id === taskId ? updatedTask : task
          )
        );

        // Reset the form and navigate back to dashboard
        setNewTask({
          title: "",
          description: "",
          date: "",
          time: "",
        });
        navigate("/dashboard");
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="editTask-content">
      <img className="background" src={shape} alt="Background Shape" />
      <h4 className="editTask-header">Update Your Task Here!</h4>
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
          placeholder="Describe your Task"
        />
        <div className="separate">
          <div className="time">
            <p>
              Time<span>*</span>
            </p>
            <input
              id="time"
              type="time"
              name="time"
              value={newTask.time}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="date">
            <p>
              Date<span>*</span>
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
        <button id="submit-button" type="submit">
          Update
        </button>
        <Link to="/dashboard">
          <button id="cancel-button" type="button">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
};

export default EditTask;
