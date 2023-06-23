import { useState, useEffect } from 'react';
import { downloadTasksData } from '../../../redux/tasksDataSlice/tasksDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/actions';
import { downloadUserData } from '../../../redux/userDataSlice/userDataSlice';

const TaskForm = () => {
  const UserTaskData = useSelector(state => state.userData)
  const Tasks = useSelector(state => state.tasksData);
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    employeeId: '',
  });

  useEffect(() => {
    if (Tasks.length < 1) {
      dispatch(downloadTasksData())
    }
    if (UserTaskData.length < 1) {
      dispatch(downloadUserData())
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(taskData)
      .then(() => {
        dispatch(downloadTasksData())
        setTaskData({ name: '', description: '', startDate: '', endDate: '', employeeId: '' });
      })
  };

  return (
    <div className='text-center main_tasks_form'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        <div>
          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="date"
            name="endDate"
            value={taskData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <select
            className='tasksForm_select'
            name="employeeId"
            value={taskData.employeeId}
            onChange={handleChange}
            required>
            <option value="">Select Employee</option>
            {UserTaskData.userData?.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} {employee.surname}
              </option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary' type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
