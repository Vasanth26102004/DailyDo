import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./TaskDetail.css";
import Task from "../Task/Task.jsx";
import { TaskList } from "../TaskListContext/TaskListContext.jsx";

const TaskDetail = () => {
  const { tasks } = useContext(TaskList);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      setTaskList(tasks);
    }
  }, [tasks]);

  return (
    <div className="task-content">
      <div className="task-header">
      <h4>Task List</h4>
      </div>
      <div className="task-element">
        {taskList.length > 0 ? (
            ( taskList.map((item, i) => (
              <div className="task-eachelement">
            <Task
              key={i}
              id={item.id}
              title={item.title}
              description={item.description}
              deadline={`Date:${item.date} Time:${item.time}`}
            />
            </div>
            ) ) )
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
