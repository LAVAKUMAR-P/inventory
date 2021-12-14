import React, { useEffect} from 'react'
import {Button,Modal} from 'react-bootstrap';
function Model(props) {

  const handleClose = () => props.setShow(false);
  useEffect(() => {
    props.setShow(props.show);  
  }, [])

    return (
        <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>INVENTORY MANAGEMENT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        INVENTORY MANAGEMENT Says,{props.data}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default Model
