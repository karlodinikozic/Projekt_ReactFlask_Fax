import React, { useState } from 'react'
import {Modal,Button} from 'react-bootstrap'


function PopUp(props) {
 
    const [show, setShow] = useState(false);
    const [studentNumber,setStudentNumber] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNext=() => setStudentNumber(studentNumber+1);
    const handelPrevious=() => setStudentNumber(studentNumber-1);

    const students  = props.students
    console.log(students)

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
        show students how need help
      </Button>
        <Modal
show={show} onHide={handleClose} animation={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h4>JMBAG : {students[studentNumber].JMBAG}</h4>
      
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>Student/ica {students[studentNumber].ime} treba pomoć na računalu  {students[studentNumber].br_racunala} </h4>
        <p>
            {students[studentNumber].help_msg}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {studentNumber>0 ? <Button onClick={handelPrevious}>Previos</Button> : null}
        {studentNumber<students.length-1 ? <Button onClick={handleNext}>Next</Button> : null}
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
      
    );
}



export default PopUp
