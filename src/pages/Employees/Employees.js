import { useEffect, useState } from 'react';
import "./Employees.css"
import { useDispatch, useSelector } from 'react-redux';
import { downloadUserData } from '../../redux/userDataSlice/userDataSlice';
import EmployeesForTasks from './EmployeesForTasks/EmployeesForTasks';
import { downloadTasksData } from '../../redux/tasksDataSlice/tasksDataSlice';
import { createEmployee } from '../actions/actions';
import UpdateEmployee from './UpdateEmployeeModal/UpdateEmployeeModal';
import DeleteEmployee from './DeleteEmployeeModal/DeleteEmployee';

const EmployeesPage = () => {
  const UserTaskData = useSelector(state => state.userData)
  const tasks = useSelector(state => state.tasksData);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    if (UserTaskData.length < 1) {
      dispatch(downloadUserData())
    }

    if (tasks.length < 1) {
      dispatch(downloadTasksData())
    }
  }, []);


  console.log(UserTaskData);

  return (
    <div className="employees-page">
      <div className="employee-list">
        <h2>Employees</h2>
        {UserTaskData.userData?.map((employee) => (
          <div key={employee.id} className='employee-item container'>
            <div className="employee-info">
              <h5>Name: {employee.name} </h5>
              <h5>Surname: {employee.surname}</h5>
              <h5>Position: {employee.position}</h5>
              <h5>Email: {employee.email}</h5>
            </div>
            <div className="employee-actions">
              <EmployeesForTasks employee={employee} />
              <UpdateEmployee employee={employee} />
              <DeleteEmployee employee={employee} />
            </div>
          </div>
        ))}
      </div>

      <div className="create-employee-form">
        <h2>Create Employee</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          createEmployee({ name, surname, position, email })
            .then(() => {
              dispatch(downloadUserData())
            })
            .catch(error => console.log(error))

          setName('')
          setSurname('')
          setPosition('')
          setEmail('')
        }}>
          <div className="form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-field_btn">
            <button className='create_employee_btn' type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeesPage;
