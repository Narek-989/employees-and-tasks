import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateTask } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { downloadTasksData } from '../../../redux/tasksDataSlice/tasksDataSlice';


function UpdateTask({ task }) {
    const dispatch = useDispatch();
    const UserTaskData = useSelector(state => state.userData)
    const [show, setShow] = useState(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [employeeId, setEmployeeId] = useState('')

    const handleChange = (e, setState) => {
        const { value } = e.target;
        setState(value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = () => {
        updateTask(task.id, { name, description, startDate, endDate, employeeId })
            .then(() => {
                dispatch(downloadTasksData())
                handleClose()
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='UpdateEmployee_btn'>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => handleChange(e, setName)}
                            className="form-control"
                            placeholder="Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => handleChange(e, setDescription)}
                            className="form-control"
                            placeholder="Description"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => handleChange(e, setStartDate)}
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => handleChange(e, setEndDate)}
                            className="form-control"
                            placeholder="surname"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-4">
                        <select
                            name="employeeId"
                            value={employeeId}
                            onChange={(e) => handleChange(e, setEmployeeId)}
                            required>
                            <option value="">Select Employee</option>
                            {UserTaskData.userData?.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name} {employee.surname}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}>

                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateTask;