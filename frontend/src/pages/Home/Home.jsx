import React, { useState, useEffect, useContext } from "react";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";
import HomeTask from "../HomeTask/HomeTask.jsx";
import logo from "../../assets/logo1.png";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const User = localStorage.getItem("user-id");

  const totalTask = tasks.filter((task) => {
    return task.date == today;
  });

  const taskDone = tasks.filter((task) => {
    return task.date == today && task.done === true;
  });

  const totalTaskCount = totalTask.length || 0;
  const taskCount = tasks.length || 0;
  const taskDoneCount = taskDone.length || 0;

    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const response = await fetch(
            "https://daily-do-server.vercel.app/task/alltask",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "user-id": localStorage.getItem("user-id"),
              },
            }
          );
          const data = await response.json();
          if (!response.ok) {
            console.error("Network response was not ok");
          }

          setTasks(data.tasks);
        } catch (error) {
          setError(error.message);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      };
      fetchTasks();
    }, []);
  

  const doneTask = async (id) => {
    try {
      const response = await fetch(
        `https://daily-do-server.vercel.app/task/donetask/${id}/done`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, done: true } : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(
        `https://daily-do-server.vercel.app/task/deletetask/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "user-id": localStorage.getItem("user-id"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
         console.error("Network response was not ok");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const progressPercentage = (taskDoneCount / totalTaskCount) * 100;

  useEffect(() => {
    const calculateAndSetProgress = async () => {
      for (let index = taskProgress; index <= progressPercentage; index++) {
        setTaskProgress(index);
      }
    };
    calculateAndSetProgress();
  }, [taskDoneCount, totalTaskCount, taskProgress, setTaskProgress]);

  return (
    <div className="home-content">
      <div className="home-header">
        <div className="heading">
          <h4>
            <img width="60px" src={logo} alt="" />
            Daily Do
          </h4>
        </div>
      </div>
      <div className="container">
        <div className="row">Progress</div>
        <div className="progress2 progress-moved">
          <span className="progress-value">{progressPercentage || 0}%</span>
          <div
            style={{ "--progress": `${progressPercentage || 0}%` }}
            className="progress-bar2"
          ></div>
        </div>
      </div>
      {loading ? (
        //<BookLoader
        /*  background={"linear-gradient(135deg, #6066FA, #4645F6)"}
          desktopSize={"100px"}
          mobileSize={"80px"}
          textColor={"#4645F6"}
        />*/
        <div>Loading...</div>
      ) : User ? (
        <div className="task-element">
          {tasks.length > 0 ? (
            totalTask.length > 0 ? (
              totalTask.map((task) => (
                <div key={task._id} className="task-eachelement">
                  <HomeTask
                    id={task._id}
                    title={task.title}
                    date={task.date}
                    time={task.time}
                    done={task.done}
                    onDelete={removeTask}
                    onDone={doneTask}
                  />
                </div>
              ))
            ) : (
              <div className="task-noelement">
                <p>No tasks for Today</p>
              </div>
            )
          ) : (
            <div className="task-noelement">
              <p>No tasks available</p>
            </div>
          )}
        </div>
      ) : (
        <div>Sign up to View Details</div>
      )}
    </div>
  );
};

export const useTaskCounts = () => {
  const [tasks, setTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const totalTask = tasks.filter((task) => {
    return task.date == today;
  });

  const taskDone = tasks.filter((task) => {
    return task.date == today && task.done === true;
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://daily-do-server.vercel.app/task/alltask",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "user-id": localStorage.getItem("user-id"),
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.error("Network response was not ok")
        }
        setTasks(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };
    fetchTasks();
  }, []);

  const totalTaskCount = totalTask.length || 0;
  const taskCount = tasks.length || 0;
  const taskDoneCount = taskDone.length || 0;

  const progressPercentage = (taskDoneCount / totalTaskCount) * 100;

  useEffect(() => {
    const calculateAndSetProgress = async () => {
      for (let index = taskProgress; index <= progressPercentage; index++) {
        setTaskProgress(index);
      }
    };
    calculateAndSetProgress();
  }, [taskDoneCount, totalTaskCount, taskProgress, setTaskProgress]);

  return { totalTaskCount, taskDoneCount, taskCount };
};

export default Home;
