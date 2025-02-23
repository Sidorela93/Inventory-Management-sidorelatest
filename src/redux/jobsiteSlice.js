import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsites: [
    { id: 1, name: "1658 E 23rd St, Brooklyn, NY 11229, USA", status: "On Hold", services: ["Plumbing", "Electric Work"] },
    { id: 2, name: "1705 E 22nd St, Brooklyn, NY 11229, USA", status: "Completed", services: ["Roof Repair", "Flooring"] },
    { id: 3, name: "256 Bay 19th St, Brooklyn, NY 11214, USA", status: "On Hold", services: ["HVAC Installation"] },
    { id: 4, name: "6908 13th Ave, Brooklyn, NY 11228, USA", status: "On Road", services: ["Concrete Work"] },
  ],
  searchTerm: "",
};

const jobsiteSlice = createSlice({
  name: "jobsites",
  initialState,
  reducers: {
    addJobsite: (state, action) => {
      state.jobsites.push(action.payload);
    },
    updateJobsiteStatus: (state, action) => {
      const { id, status } = action.payload;
      const jobsite = state.jobsites.find((job) => job.id === id);
      if (jobsite) {
        jobsite.status = status;
      }
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateCategoryItem: (state, action) => {
      const { jobsiteId, oldItem, newItem } = action.payload;
      const jobsite = state.jobsites.find((j) => j.id === jobsiteId);
      if (jobsite && jobsite.services) {
        const itemIndex = jobsite.services.findIndex((item) => item === oldItem);
        if (itemIndex !== -1) {
          jobsite.services[itemIndex] = newItem;
        }
      }
    },
  },
});

export const { addJobsite, updateJobsiteStatus, updateSearchTerm, updateCategoryItem } =
  jobsiteSlice.actions;
export default jobsiteSlice.reducer;
