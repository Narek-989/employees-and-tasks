import React, { useState, useEffect } from 'react';

const TasksForm = ({ onCreate }) => {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    employeeId: '',
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(taskData);
    setTaskData({ name: '', description: '', startDate: '', endDate: '', employeeId: '' });
  };

  return (
    <form onSubmit={handleSubmit} className='create_task_main'>
      <input type="text" name="name" value={taskData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="description" value={taskData.description} onChange={handleChange} placeholder="Description" required />
      <input type="date" name="startDate" value={taskData.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" value={taskData.endDate} onChange={handleChange} required />
      <select name="employeeId" value={taskData.employeeId} onChange={handleChange} required>
        <option value="">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name} {employee.surname}
          </option>
        ))}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TasksForm;
