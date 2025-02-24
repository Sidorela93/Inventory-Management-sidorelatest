import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import CreateJobsiteButton from "./CreateJobsiteButton";
import infoIcon from "../assets/img/Frame.png"; // Importing the image

function JobsiteHeader() {
  return (
    <div className="container mt-3">
      <Row className="align-items-center">
        {/* Informational image and accompanying text in the first half */}
        <Col xs={12} md={6} className="d-flex align-items-center">
          <img src={infoIcon} alt="Info Icon" className="info-icon me-2" /> {/* Image */}
          <span className="text-muted">
            Informative piece of text that can be used regarding this modal.
          </span>
        </Col>

        {/* Search field and Create button in the second half */}
        <Col xs={12} md={6} className="d-flex justify-content-between align-items-center">
          <div style={{ width: '492px' }}>
            <SearchBar />
          </div>

          {/* Add a small gap between the buttons */}
          <div style={{ width: '10px' }}></div>

          <div style={{ width: '150px' }}>
            <CreateJobsiteButton />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default JobsiteHeader;
