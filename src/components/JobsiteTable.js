import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateJobsiteStatus } from "../redux/jobsiteSlice";

const JobsiteTable = () => {
  const jobsites = useSelector((state) => state.jobsites.jobsites);
  const searchTerm = useSelector((state) => state.jobsites.searchTerm);
  const dispatch = useDispatch();

  const filteredJobsites = jobsites.filter((job) =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "On Hold":
        return { backgroundColor: "#ff4d4d", color: "white" };
      case "On Road":
        return { backgroundColor: "#f4e04d", color: "white" };
      case "Completed":
        return { backgroundColor: "#69c36c", color: "white" };
      default:
        return {};
    }
  };

  return (
    <table className="table table-striped text-center">
      <thead>
        <tr>
          <th style={{ fontFamily: "Open Sans", fontWeight: "600", fontSize: "16px", lineHeight: "21.79px", letterSpacing: "0%" }}>
            Jobsite Name
          </th>
          <th style={{ fontFamily: "Open Sans", fontWeight: "600", fontSize: "16px", lineHeight: "21.79px", letterSpacing: "0%" }}>
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredJobsites.map((job) => (
          <tr key={job.id}>
            <td>
              {/* LINK to open the inventory */}
              <Link 
                to={`/inventory/${job.id}`} 
                style={{ 
                  textDecoration: "none", 
                  fontFamily: "Open Sans", 
                  fontWeight: "600", 
                  fontSize: "14px", 
                  lineHeight: "19.07px", 
                  letterSpacing: "0%", 
                  color: "#1264A3" 
                }}
              >
                {job.name}
              </Link>
            </td>
            <td>
              <select
                value={job.status}
                onChange={(e) =>
                  dispatch(updateJobsiteStatus({ id: job.id, status: e.target.value }))
                }
                style={{
                  ...getStatusStyle(job.status),
                  padding: "5px",
                  borderRadius: "5px",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                <option style={{ backgroundColor: "#ff4d4d", color: "white" }} value="On Hold">
                  On Hold
                </option>
                <option style={{ backgroundColor: "#f4e04d", color: "black" }} value="On Road">
                  On Road
                </option>
                <option style={{ backgroundColor: "#69c36c", color: "white" }} value="Completed">
                  Completed
                </option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsiteTable;
