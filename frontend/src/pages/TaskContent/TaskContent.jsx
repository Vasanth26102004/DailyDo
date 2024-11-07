import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./TaskContent.css";
import check from "../../assets/donebutton.png";
import edit from "../../assets/editbutton.png";
import clear from "../../assets/deletebutton.png";

const TaskContent = ({
  id,
  title,
  description,
  time,
  date,
  done,
  onDone,
  onDelete,
}) => {
  const [isTaskDone, setIsTaskDone] = useState(done);
  const [showDetails, setShowDetails] = useState(false);

  const handleTaskDone = () => {
    if (onDone) {
      onDone(id);
      setIsTaskDone(true);
    }
  };

  const handleTaskDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const toggleActive = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <div
      id={`task-${id}`}
      className={`taskcontent ${isTaskDone && !showDetails ? "active" : ""}`}
    >
      {showDetails ? (
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
            <Link to={`/edittask/${props.id}`}>
              <img src={edit} alt="edit Task" />
            </Link>
            <img onClick={taskDelete} src={clear} alt="Delete task" />
          </div>
        </>
      )}
    </div>
  );
};

// PropTypes for validation
TaskContent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  time: PropTypes.string,
  date: PropTypes.string,
  done: PropTypes.bool,
  onDone: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TaskContent;
