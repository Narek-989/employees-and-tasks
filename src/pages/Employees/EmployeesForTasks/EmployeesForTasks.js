import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

function EmployeesForTasks({ employee }) {
    const tasks = useSelector(state => state.tasksData);

    const [show, setShow] = useState(false);
    const [thisUserTask, setThisUserTask] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getTasks = () => {
        const tasksArray = [];

        tasks.tasksData.forEach(tasks => {
            if (Number(tasks.employeeId) === employee.id) {
                console.log(1);
                tasksArray.push(tasks);
            }
        })

        console.log(tasks.tasksData);
        setThisUserTask(tasksArray);
    }

    return (
        <>
            <Button variant="primary" onClick={() => {
                getTasks()
                handleShow();
            }}>
                Tasks
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        <div>
                            <div>
                                <h3>{employee.name} {employee.surname}</h3>
                                <p>Position: {employee.position}</p>

                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        thisUserTask.length > 0 ? thisUserTask?.map((task) => (
                            <div key={task.id} className='pt-2'>
                                <h3>{task.name}</h3>
                                <p>{task.description}</p>
                                <p>Start: {task.startDate}</p>
                                <p>End: {task.endDate}</p>
                            </div>
                        )) : <div>This user do not have a task</div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeesForTasks;