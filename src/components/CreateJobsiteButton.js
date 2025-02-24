import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addJobsite } from "../redux/jobsiteSlice";
import { FaTimes, FaCheck } from "react-icons/fa"; 
import "./ModalStyles.css"; 
import infoIcon from "../assets/img/Frame.png";

function CreateJobsiteButton() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddJobsite = () => {
    if (!name || !status || !category) {
      alert("Please enter all fields");
      return;
    }

    const newJobsite = {
      id: Math.random(),
      name,
      status,
      category,
    };

    dispatch(addJobsite(newJobsite));
    
    // Reset the input fields after adding the jobsite
    setName("");
    setStatus("");
    setCategory("");
    
    handleClose(); 
  };

  return (
    <div className="text-end mt-3">
      <Button variant="success" onClick={handleShow}>
        Create +
      </Button>

      <Modal show={show} onHide={handleClose} centered dialogClassName="modal-dialog">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title className="modal-title-custom">Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="info-text">
            <img src={infoIcon} alt="Info Icon" className="info-icon" />
            <p className="info-description">
              Informative piece of text that can be used regarding this modal.
            </p>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="custom-label">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type the jobsite's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input"
            />
          </Form.Group>

          {/* Using a div with the class "custom-row" to properly separate the fields */}
          <div className="custom-row">
            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Category Included</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="custom-select custom-select-category"
              >
                <option value="">Select</option>
                <option value="Sidewalk Shed">Sidewalk Shed</option>
                <option value="Scaffold">Scaffold</option>
                <option value="Shoring">Shoring</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="custom-label">Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="custom-select custom-select-status"
              >
                <option value="">Select one</option>
                <option value="On Road">On Road</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="danger" onClick={handleClose} className="btn-cancel">
            Cancel Changes <FaTimes />
          </Button>
          <Button variant="success" onClick={handleAddJobsite} className="btn-save">
            Save Changes <FaCheck />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJobsiteButton;
