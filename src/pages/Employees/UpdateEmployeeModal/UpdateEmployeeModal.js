import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateEmployee } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { downloadUserData } from '../../../redux/userDataSlice/userDataSlice';


function UpdateEmployee({ employee }) {
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = () => {
        updateEmployee(employee.id, { name, surname, email })
            .then(() => {
                dispatch(downloadUserData())
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
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            placeholder="name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="form-control"
                            placeholder="surname"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="email"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
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

export default UpdateEmployee;