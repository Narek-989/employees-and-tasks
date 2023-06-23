import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../actions/actions';
import { downloadUserData } from '../../../redux/userDataSlice/userDataSlice';

function DeleteEmployee({ employee }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDelete = () => {
        deleteEmployee(employee.id)
            .then(() => {
                dispatch(downloadUserData())
                handleClose()
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete these employee?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onDelete}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteEmployee;