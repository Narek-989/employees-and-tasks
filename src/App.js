import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeesPage from './pages/Employees/Employees';
import TasksPage from './pages/Tasks/TasksPage';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
