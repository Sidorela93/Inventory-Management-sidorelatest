import React from "react";

const JobsiteDetailsPanel = ({ jobsite, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        <h2>Details for {jobsite.name}</h2>
        <p><strong>Status:</strong> {jobsite.status}</p>
        <p><strong>Location:</strong> {jobsite.location || "N/A"}</p>
        <p><strong>More Details:</strong> Description about the jobsite.</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", // Positions the overlay to cover the entire screen
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    backgroundColor: "white", // Sets the panel background color to white
    padding: "20px",
    borderRadius: "5px",
    minWidth: "300px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)", // Adds a subtle shadow for a pop-out effect
    position: "relative",
  },
  closeButton: {
    position: "absolute", // Positions the close button at the top-right corner
    top: 10,
    right: 10,
    cursor: "pointer",
    background: "red", // Sets the background color of the close button to red
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
  },
};

export default JobsiteDetailsPanel;
