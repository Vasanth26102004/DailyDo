import React, { useEffect, useState } from "react";
import img1 from '../../assets/task_icon/4442_1.jpg';
import img2 from '../../assets/task_icon/4442_2.jpg';
import img3 from '../../assets/task_icon/4442_3.jpg';
import img4 from '../../assets/task_icon/4442_4.jpg';
import img5 from '../../assets/task_icon/4442_5.jpg';
import img6 from '../../assets/task_icon/4442_6.jpg';
import img7 from '../../assets/task_icon/4442_7.jpg';
import img8 from '../../assets/task_icon/4442_8.jpg';
import img9 from '../../assets/task_icon/4442_9.jpg';
import img10 from '../../assets/task_icon/4442_10.jpg';
import img11 from '../../assets/task_icon/4442_11.jpg';
import img12 from '../../assets/task_icon/4442_12.jpg';
import img13 from '../../assets/task_icon/4442_13.jpg';
import img14 from '../../assets/task_icon/4442_14.jpg';
import img15 from '../../assets/task_icon/4442_15.jpg';
import img16 from '../../assets/task_icon/4442_16.jpg';
import img17 from '../../assets/task_icon/14028_1.jpg';
import img18 from '../../assets/task_icon/14028_2.jpg';
import img19 from '../../assets/task_icon/14028_3.jpg';
import img20 from '../../assets/task_icon/14028_4.jpg';
import img21 from '../../assets/task_icon/14028_5.jpg';
import img22 from '../../assets/task_icon/14028_6.jpg';
import img23 from '../../assets/task_icon/14028_7.jpg';
import img24 from '../../assets/task_icon/14028_8.jpg';
import img25 from '../../assets/task_icon/14028_9.jpg';
import img26 from '../../assets/task_icon/14028_10.jpg';
import img27 from '../../assets/task_icon/14028_11.jpg';
import img28 from '../../assets/task_icon/14028_12.jpg';
import img29 from '../../assets/task_icon/14028_13.jpg';
import img30 from '../../assets/task_icon/14028_14.jpg';
import img31 from '../../assets/task_icon/14028_15.jpg';
import img32 from '../../assets/task_icon/14028_16.jpg';
import "./TaskContent.css";
import check from "../../assets/donebutton.png";
import edit from "../../assets/editbutton.png";
import clear from "../../assets/deletebutton.png";
import { Link } from "react-router-dom";

const TaskContent = (props) => {
  const [randomTask, setRandomTask] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setRandomTask(getRandomTask());
  }, []);

  const getRandomTask = () => {
    let images = [
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15, img16, img17, img18, img19, 
      img20, img21, img22, img23, img24, img25, img26, img27, img28, 
      img29, img30, img31, img32
    ];
    let image = images[Math.floor(Math.random() * images.length)];
    return image;
  };
  
  const taskDone = () => {
    if (props.onDone ) {
      props.onDone(props.id); 
      setIsActive(true); 
    }
  };
  const taskDelete = () => {
    if (props.onDelete) {
      props.onDelete(props.id); 
    }
  };

  return (
    <div id={`task-1`} className={`hometask ${isActive || props.done ? "active" : ""}`}>
      <img className="task-image" src={randomTask} alt="Task Icon" />
      <div className="taskcontent-task">
        <h2 className="taskcontent-title" max-width="100px">
          Title
        </h2>
          <h3 className="taskcontent-time">Time</h3>
      </div>
      <div className="taskcontent-btns">
        <img onClick={taskDone} width="55px" src={check} alt="Mark as done" />
      <Link to="/edittask">
      <img width="55px" src={edit} alt="edit Task" />
      </Link>
        <img onClick={taskDelete} width="45px" src={clear} alt="Delete task" />
      </div>
    </div>
  );
};

export default TaskContent;
