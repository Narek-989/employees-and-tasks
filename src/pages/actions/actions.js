import axios from "axios";

const getUserData = async () => {
  const data = await axios.get("https://rocky-temple-83495.herokuapp.com/employees")
  return data;
};

const createEmployee = async (employeeData) => {
  const response = await axios.post('https://rocky-temple-83495.herokuapp.com/employees', employeeData)
  return response;
};

const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, employeeData)
  return response;
}

const deleteEmployee = async (id, employeeData) => {
  const response = await axios.delete(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, employeeData)
  return response;
}

// Tasks

const getTasks = async () => {
  const data = await axios.get("https://rocky-temple-83495.herokuapp.com/tasks")
  return data;
};

const createTask = async (taskData) => {
  const response = await axios.post('https://rocky-temple-83495.herokuapp.com/tasks', taskData)
  return response;
};


const updateTask = async (taskId, tasksData) => {
  const response = await axios.put(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`, tasksData)
  return response;
}

const deleteTask = async (id, tasksData) => {
  const response = await axios.delete(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`, tasksData)
  return response;
}


// Search 

const onSearch = async(params) => {
  const response = await axios.get('https://rocky-temple-83495.herokuapp.com/tasks', {params})
  return response;
}

export {
  getUserData,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  onSearch
}
