import React from 'react';

const EmployeesList = ({ employees, onUpdate, onDelete }) => {
  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} {employee.surname} ({employee.position})
          <button onClick={() => onUpdate(employee.id, {name: 'Anun', surname: 'Azganun', email: 'email@gmail.com'})}>Update</button>
          <button onClick={() => onDelete(employee.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default EmployeesList;
