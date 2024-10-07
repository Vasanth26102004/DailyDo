import React, { createContext, useState } from "react";

export const TaskList = createContext();

export const TaskListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); 

  return (
    <TaskList.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskList.Provider>
  );
};
