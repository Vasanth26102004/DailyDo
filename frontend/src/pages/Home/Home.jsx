import React, { useState, useEffect, useContext } from "react";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";
import HomeTask from "../HomeTask/HomeTask.jsx";
import "./Home.css";

const Home = () => {
  const { tasks, setTasks } = useContext(TaskList);
  const [taskProgress, setTaskProgress] = useState(0);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/task/alltask", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "user-id": userId, 
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTasks(data); 
      } else {
        console.error("Failed to fetch tasks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks); 
    calculateProgress(updatedTasks);
  };

  const doneTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task
    );
    setTasks(updatedTasks); 
    calculateProgress(updatedTasks);
  };

  const tasksForToday = tasks.filter((task) => task.date === today);

  const calculateProgress = (tasks) => {
    const doneTasks = tasks.filter(
      (task) => task.done && task.date === today
    ).length;
    const totalTasks = tasksForToday.length;
    const progressPercentage =
      totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;
    setTaskProgress(progressPercentage);
  };

  useEffect(() => {
    calculateProgress(tasks);
  }, [tasks]);

  return (
    <div className="home-content">
      <div className="home-header">
        <div className="heading">
          <h4>Daily Do</h4>
        </div>
      </div>
      <p className="progress-bar">Today Progress <progress value={taskProgress} max={100} /></p>
      <div className="task-element">
        {tasks.length > 0 ? (
          tasksForToday.length > 0 ? (
            tasksForToday.map((item) => (
              <div key={item.id} className="task-eachelement">
                <HomeTask
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  time={item.time}
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
    </div>
  );
};

export default Home;
