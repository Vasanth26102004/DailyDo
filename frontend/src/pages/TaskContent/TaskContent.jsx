import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./TaskContent.css";
import check from "../../assets/donebutton.png";
import edit from "../../assets/editbutton.png";
import clear from "../../assets/deletebutton.png";

const TaskContent = ({ id, title, description, time, date, done, onDone, onDelete }) => {
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

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <div
      id={`task-${id}`}
      className={`taskcontent ${isTaskDone && !showDetails ? "active" : ""}`}
    >
      <div className="taskcontent-task" onClick={toggleDetails}>
        <h2 className="taskcontent-title">{title}</h2>
        {showDetails && (
          <>
            <p className="taskcontent-description">{description}</p>
            <h3 className="taskcontent-time">{time}</h3>
            <h3 className="taskcontent-date">{date}</h3>
          </>
        )}
      </div>
      {!showDetails && (
        <div className="taskcontent-btns">
          <img onClick={handleTaskDone} src={check} alt="Mark as done" />
          <Link to={`/edittask/${id}`}>
            <img src={edit} alt="Edit Task" />
          </Link>
          <img onClick={handleTaskDelete} src={clear} alt="Delete Task" />
        </div>
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
