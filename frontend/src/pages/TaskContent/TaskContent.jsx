import React, { useEffect, useState } from "react";
import "./TaskContent.css";
import check from "../../assets/donebutton.png";
import edit from "../../assets/editbutton.png";
import clear from "../../assets/deletebutton.png";
import { Link } from "react-router-dom";

const TaskContent = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [active, setActive] = useState(false);

  console.log(active);

  const taskDone = () => {
    if (props.onDone) {
      props.onDone(props.id);
      setIsActive(true);
    }
  };
  const taskDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  };
  const taskEdit = () => {};

  const toggleActive = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <div
      id={`task-${props.id}`}
      className={`taskcontent ${
        (isActive || props.done) && !active ? "active" : ""
      }`}
    >
      {active ? (
        <div className="taskcontent-task" onClick={toggleActive}>
          <h2 className="taskcontent-title">{props.title}</h2>
          <h2 className="taskcontent-title">{props.description}</h2>
          <h3 className="taskcontent-time">{props.time}</h3>
          <h3 className="taskcontent-time">{props.date}</h3>
        </div>
      ) : (
        <>
          <div className="taskcontent-task" onClick={toggleActive}>
            <h2 className="taskcontent-title" max-width="150px">
              {props.title}
            </h2>
            <h3 className="taskcontent-time">{props.time}</h3>
          </div>
          <div className="taskcontent-btns">
            <img onClick={taskDone} src={check} alt="Mark as done" />
            <img onClick={taskEdit} src={edit} alt="edit Task" />
            <img onClick={taskDelete} src={clear} alt="Delete task" />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskContent;
