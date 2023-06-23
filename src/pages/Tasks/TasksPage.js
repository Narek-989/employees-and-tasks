import TaskForm from './TasksForm/TasksForm';
import TasksData from './TasksData/TasksData';

import "./Tasks.css"
import SearchTask from './SearchTask/SearchTask';

const TasksPage = () => {

  return (
    <div className='main_taskPage'>
      <h1>Tasks</h1>
      <TaskForm  />
      <SearchTask />
      <TasksData />
    </div>
  );
};

export default TasksPage;
