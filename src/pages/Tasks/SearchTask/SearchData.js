import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { onSearch } from '../../actions/actions';

function SearchData({ searchParams }) {
  const [show, setShow] = useState(false);
  const [searchNowData, setSearchNowData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          onSearch(searchParams)
            .then(res => {
              handleShow()
              setSearchNowData(res.data)
            })
            .catch(error => {
              console.log(error);
            })
        }}>
        Search Data
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchNowData.length > 0 ? searchNowData?.map((task) => {
            return (
              <li key={Number(task.id)} className="task-item">
                <div className="task-info">
                  <h3>{task.name}</h3>
                  <p>{task.description}</p>
                  <p>Start: {task.startDate}</p>
                  <p>End: {task.endDate}</p>
                </div>
            
              </li>
            )
          }) : 'There is not task'}
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

export default SearchData;