import React, { useState } from "react";  
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import infoIcon from "../assets/img/Frame.png"; 
import Coreimg from "../assets/img/core.png"; // Importing the image
import "./ModalStyles.css";  // 
const InventoryPage = () => {
  const { jobsiteId } = useParams();
  const navigate = useNavigate();

  const jobsites = useSelector((state) => state.jobsites.jobsites);
  const jobsite = jobsites?.find((j) => j.id.toString() === jobsiteId);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    { id: 1, item: "G42295", quantity: 10, desc: "Lorem ipsum dolor sit amet.", notes: "Lorem ipsum dolor sit amet." },
    { id: 2, item: "M721", quantity: 83, desc: "Lorem ipsum dolor sit amet.", notes: "Lorem ipsum dolor sit amet." },
    { id: 3, item: "M94796", quantity: 31, desc: "Lorem ipsum dolor sit amet.", notes: "Lorem ipsum dolor sit amet." },
    { id: 4, item: "S25907", quantity: 47, desc: "Lorem ipsum dolor sit amet.", notes: "Lorem ipsum dolor sit amet." },
    { id: 5, item: "A68446", quantity: 52, desc: "Lorem ipsum dolor sit amet.", notes: "Lorem ipsum dolor sit amet." },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (row) => {
    setSelectedItem({ ...row });
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    setData((prevData) =>
      prevData.map((row) => (row.id === selectedItem.id ? selectedItem : row))
    );
    setShowModal(false);
  };

  const filteredData = data.filter(
    (row) =>
      row.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!jobsite) {
    return <h2 className="text-center text-danger">Jobsite Not Found</h2>;
  }

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row">
        {/* Left Sidebar - Categories */}
        <div className="col-12 col-md-4 col-lg-3">
          <div className="p-3 border bg-white shadow-sm rounded">
            <h5 className="mb-3">{jobsite.name}</h5>
            {jobsite.category && (
              <button
                className={`btn w-100 text-start shadow-sm ${selectedCategory === jobsite.category ? 'btn-success' : 'btn-outline-secondary'}`}
                style={{
                  backgroundColor: selectedCategory === jobsite.category ? '#67AA3C' : '',
                  color: selectedCategory === jobsite.category ? 'white' : '',
                }}
                onClick={() => setSelectedCategory(jobsite.category)}
              >
                {jobsite.category}
              </button>
            )}
            <button className="btn btn-outline-primary w-100 mt-3" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
          </div>
        </div>

        {/* Right Side - Data Grid */}
        <div className="col-12 col-md-8 col-lg-9">
          <div className="p-4 bg-white shadow-sm rounded">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
              <h5 className="m-0">{selectedCategory ? selectedCategory : "Data Grid"}</h5>

              {/* Search Input */}
              <input
  type="text"
  className="form-control px-3"
  style={{
    maxWidth: "250px",
    fontSize: "14px",
    padding: "6px 12px",
    borderRadius: "0", 
  }}
  placeholder="🔍 Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            </div>

            {/* Show Table if Category is Selected */}
            {selectedCategory ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Description</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row) => (
                        <tr key={row.id} onClick={() => handleShowModal(row)} style={{ cursor: "pointer" }}>
                          <td>{row.id}</td>
                          <td>{row.item}</td>
                          <td>{row.quantity}</td>
                          <td>{row.desc}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">No results found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-5">
                <img src={Coreimg} alt="No Category" width="80" />
                <h6>No Category Selected</h6>
                <p className="text-muted">Please select a category on your left to proceed.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      {selectedItem && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/* Informative Text with Icon */}
            <div className="d-flex align-items-center bg-light p-2 rounded mb-3">
              <img src={infoIcon} alt="Info" className="me-2" style={{ width: "20px", height: "20px" }} />
              <span className="text-muted">Informative piece of text that can be used regarding this modal.</span>
            </div>

            <Form>
              <div className="row">
                {/* Item Selection */}
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label>Item</Form.Label>
                  <Form.Select
                    className="form-control"
                    value={selectedItem?.item || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, item: e.target.value })
                    }
                  >
                    <option value="" disabled>Search & Select item</option>
                    {data.map((row) => (
                      <option key={row.id} value={row.item}>
                        {row.item}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Quantity Input */}
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    placeholder="Set Quantity"
                    value={selectedItem?.quantity || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, quantity: e.target.value })
                    }
                  />
                </Form.Group>
              </div>

              {/* Description (1st row) */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control"
                  placeholder="Type the description..."
                  value={selectedItem?.desc || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, desc: e.target.value })
                  }
                />
              </Form.Group>

              {/* Notes (2nd row) */}
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control"
                  placeholder="Type a note..."
                  value={selectedItem?.notes || ""}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, notes: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="success" onClick={handleSaveChanges}>
              Save Changes ✔
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default InventoryPage;
