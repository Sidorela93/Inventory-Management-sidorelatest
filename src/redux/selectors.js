export const selectJobsites = (state) => state.jobsites.jobsites || [];

export const selectFilteredJobsites = (state) => {
  const jobsites = state.jobsites.jobsites || []; // Ensure it is not undefined
  const searchTerm = state.jobsites.searchTerm.toLowerCase();

  console.log("Jobsites from Redux Store:", jobsites); // Debugging

  if (!Array.isArray(jobsites)) {
    console.error("Error: jobsites is not an array!", jobsites);
    return [];
  }

  return jobsites.filter((jobsite) =>
    jobsite.name.toLowerCase().includes(searchTerm)
  );
};
