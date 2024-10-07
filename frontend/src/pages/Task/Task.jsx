import React from "react";

const Task = (props) => {
   return (
     <div className='task-element'>
        <h3>Title:{props.title}</h3>
        <h3>Description:{props.description}</h3>
        <h3>Deadline:{props.deadline}</h3>
     </div>
   )
}

export default Task;