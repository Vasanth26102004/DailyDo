import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Upload from "./pages/Upload/Upload.jsx";
import AddTask from './pages/AddTask/AddTask.jsx';
import Navbar from "./pages/Navbar/Navbar.jsx";
import Profile from './pages/Profile/Profile.jsx';
import Home from './pages/Home/Home.jsx';
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
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </TaskListProvider>
    </div>
  );
}

export default App;
