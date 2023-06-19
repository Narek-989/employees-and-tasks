import React, { useEffect, useState } from 'react';
import "./Employees.css"

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const createEmployee = async (employeeData) => {
    try {
      const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });
      if (response.ok) {
        fetchEmployees();
      } else {
        console.error('Failed to create employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const updateEmployee = async (employeeId, updatedData) => {
    try {
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchEmployees();
      } else {
        console.error('Failed to update employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${employeeId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchEmployees();
      } else {
        console.error('Failed to delete employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEmployeeClick = async (employeeId) => {
    try {
      const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${employeeId}`);
      const data = await response.json();
      setSelectedEmployee(data);
    } catch (error) {
      console.error('Error fetching employee information:', error);
    }
  };

  return (
    <div className="employees-page">
      <div className="employee-list">
        <h2>Employees</h2>
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={`employee-item ${selectedEmployee?.id === employee.id ? 'selected' : ''}`}
            onClick={() => handleEmployeeClick(employee.id)}
          >
            <div className="employee-info">
              <h3>{employee.name} {employee.surname}</h3>
              <p>Position: {employee.position}</p>
            </div>
            <div className="employee-actions">
              <button onClick={() => updateEmployee(employee.id, { name: 'New Name' })}>Update</button>
              <button onClick={() => deleteEmployee(employee.id)} className='delete_btn'>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {selectedEmployee && (
        <div className="employee-details">
          <h2>Employee Details</h2>
          <p>Name: {selectedEmployee.name}</p>
          <p>Surname: {selectedEmployee.surname}</p>
          <p>Position: {selectedEmployee.position}</p>
          <h3>Tasks</h3>
        </div>
      )}
      <div className="create-employee-form">
        <h2>Create Employee</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newEmployee = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            position: formData.get('position'),
          };
          createEmployee(newEmployee);
        }}>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" required />
          </div>
          <div className="form-field">
            <label htmlFor="position">Position:</label>
            <input type="text" id="position" name="position" required />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeesPage;
