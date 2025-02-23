import React from "react"; 
import { Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import CreateJobsiteButton from "./CreateJobsiteButton";
import infoIcon from "../assets/img/Frame.png"; // Importing the image

function JobsiteHeader() {
  return (
    <div className="container mt-3">
      <Row className="align-items-center">
        {/* Informational image and accompanying text */}
        <Col xs={4} className="d-flex align-items-center">
          <img src={infoIcon} alt="Info Icon" className="info-icon me-2" /> {/* Image */}
          <span className="text-muted">
            Informative piece of text that can be used regarding this modal.
          </span>
        </Col>

        {/* Search field */}
        <Col xs={5}>
          <SearchBar />
        </Col>

        {/* "Create" button */}
        <Col xs={3} className="text-end">
          <CreateJobsiteButton />
        </Col>
      </Row>
    </div>
  );
}

export default JobsiteHeader;
