import React, { useState, useEffect, useContext } from "react";
import TaskContent from "../TaskContent/TaskContent.jsx";
import pic from "../../assets/pic.jpg";
import shape from "../../assets/shape.png";
import clock from "../../assets/clock.png";
import plus from "../../assets/plus.png";
import "./Dashboard.css";
import dolist from "../../SambleList/todol.js";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskProgress, setTaskProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const User = localStorage.getItem("user-id");
  const Username = localStorage.getItem("user-name");

  //Fetching All Tasks from the Database
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

  const totalTask = tasks.filter((task) => {
    return task.date == today;
  });
  const taskDone = tasks.filter((task) => {
    return task.date == today && task.done === true;
  });

  const totalTaskCount = totalTask.length || 0;
  const taskDoneCount = taskDone.length || 0;

  //Set DoneTask and RemoveTask
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

  //Get TaskContent Content
  const getTaskContent = (task) => {
    return (
      <div key={task._id} className="task-eachelement">
        <TaskContent
          id={task._id}
          title={task.title}
          date={task.date}
          time={task.time}
          done={task.done}
          onDelete={removeTask}
          onDone={doneTask}
        />
      </div>
    );
  };

  // Get TAsks for Next Four Days in a Row
  const getDay = (date) => {
    const dayIndex = date.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayIndex];
    return dayName;
  };
  const todayTask = () => {
    const today = new Date().toISOString().split("T")[0];
    const todaysTasks = dolist.filter((task) => task.date === today);

    return (
      <div>
        <h5 className="day">Today</h5>
        {todaysTasks.length > 0 ? (
          todaysTasks.map((task) => getTaskContent(task))
        ) : (
          <div className="task-noelement">
            <p className="no-task">No tasks for Today</p>
          </div>
        )}
      </div>
    );
  };
  const tommarowTask = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowsTasks = tasks.date === tomorrow.toISOString().split("T")[0];

    return (
      <div>
        <h5 className="day">Tomorrow</h5>
        {tomorrowsTasks.length > 0 ? (
          tomorrowsTasks.map((task) => getTaskContent(task))
        ) : (
          <div className="task-noelement">
            <p className="no-task">No tasks for Tomorrow</p>
          </div>
        )}
      </div>
    );
  };
  const secdayTask = () => {
    const today = new Date();
    const secday = new Date(today);
    secday.setDate(today.getDate() + 2);
    const secdaysTasks = tasks.date === secday.toISOString().split("T")[0];

    return (
      <div>
        <h5 className="day">{getDay(secday)}</h5>
        {secdaysTasks.length > 0 ? (
          secdaysTasks.map((task) => getTaskContent(task))
        ) : (
          <div className="task-noelement">
            <p className="no-task">No tasks for {getDay(secday)}</p>
          </div>
        )}
      </div>
    );
  };
  const thrdayTask = () => {
    const today = new Date();
    const thrday = new Date(today);
    thrday.setDate(today.getDate() + 3);
    const thrdaysTasks = tasks.date === thrday.toISOString().split("T")[0];

    return (
      <div>
        <h5 className="day">{getDay(thrday)}</h5>
        {thrdaysTasks.length > 0 ? (
          thrdaysTasks.map((task) => getTaskContent(task))
        ) : (
          <div className="task-noelement">
            <p className="no-task">No tasks for {getDay(thrday)}</p>
          </div>
        )}
      </div>
    );
  };
  const timetone = () => {
    const time = new Date().split();
    if(time>4 && time<=10){
      return "Good Morning";
    }else if(time>10 && time<=2){
      return "Good Afternoon";
    }else if(time>2 && time<=6){
      return "Good Evening";
    }else{
      return "Good Night"
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
    <div className="dashboard-content">
      <img class="background" src={shape} alt="" />
      
      {/*SECTION FOR USER DETAIL*/}
      <div className="dashboard-header">
          <img className="user-image" src={pic} alt="your pic" />
          <h4 className="user-text">Welcome {Username}</h4>
      </div>

      {/*SECTION FOR CLOCK*/}
      <div className="section">
        <p className="time-tone">Good Morning</p> 
        <img className="clock" width="100px" src={clock} alt=""/>
      </div>

      {/*SECTION FOR TASK CONTENT*/}
      <div className="container">
      <div className="tasks-addtask">
        <h5>Task List</h5>
        <img width="35px" src={plus} alt=""/>
      </div>
      {/*SECTION FOR PROGRESS BAR*/}
        <div className="progress progress-moved">
          <div
            style={{ "--progress": `${progressPercentage || 0}%` }}
            className="progress-bar"
          ></div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="task-element">
            {dolist.length > 0 ? (
              <div>
                {todayTask()}
                {tommarowTask()}
                {secdayTask()}
                {thrdayTask()}
              </div>
            ) : (
              <div className="task-noelement">
                <p>No tasks available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
