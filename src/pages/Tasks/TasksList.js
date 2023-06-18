import React, { useState } from 'react';
import "./Tasks.css";

const TaskList = ({ tasks, onUpdate, onDelete, onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name_like: '',
    description_like: '',
    startDate: '',
    endDate: '',
  });

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="name_like"
          value={searchParams.name_like}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="search-input"
        />
        <input
          type="text"
          name="description_like"
          value={searchParams.description_like}
          onChange={handleSearchChange}
          placeholder="Search by description"
          className="search-input"
        />
        <input
          type="date"
          name="startDate"
          value={searchParams.startDate}
          onChange={handleSearchChange}
          placeholder="Search by start date"
          className="search-input"
        />
        <input
          type="date"
          name="endDate"
          value={searchParams.endDate}
          onChange={handleSearchChange}
          placeholder="Search by end date"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <p>Start: {task.startDate}</p>
              <p>End: {task.endDate}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => onUpdate(task.id, { name: 'New Name' })}>Update</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
