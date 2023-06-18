import React, { useState } from 'react';

const EmployeesForm = ({ onCreate }) => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(employeeData);
    setEmployeeData({ name: '', surname: '', email: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={employeeData.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="surname" value={employeeData.surname} onChange={handleChange} placeholder="Surname" required />
      <input type="email" name="email" value={employeeData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="position" value={employeeData.position} onChange={handleChange} placeholder="Position" required />
      <button type="submit">Create Employee</button>
    </form>
  );
};

export default EmployeesForm;
