import "./App.css";
import Home from "./pages/Home/Home.jsx";
import TaskDetail from "./pages/TaskDetail/TaskDetail.jsx";
import AddTask from './pages/AddTask/AddTask.jsx';
import Navbar from "./pages/Navbar/Navbar.jsx";
import Profile from './pages/Profile/Profile.jsx';
import Setting from './pages/Setting/Setting.jsx';
import { TaskListProvider } from "./pages/TaskListContext/TaskListContext.jsx";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="content">
      <TaskListProvider> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/tasklist" element={<TaskDetail />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navbar/>
        </BrowserRouter>
      </TaskListProvider>
    </div>
  );
}

export default App;
