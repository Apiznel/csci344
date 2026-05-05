import React, { useState } from "react";
import JobGrid from "./JobGrid.jsx";
import Form from "./Form.jsx";
import Map from "./Map.jsx";

export default function Homepage() {
  const [mode, setMode] = useState("list");
  // Made after I realized I would also need jobs for map
  // Would be nice if JobGrid also used it but I don't want to break anything
  const [jobs, setJobs] = useState();
  const [jobBookmark, setJobBookmark] = useState();
  if (mode === "list") {
    return <JobGrid setMode={setMode} setJobBookmark={setJobBookmark} setGlobalJobs={setJobs} />
  }
  if (mode === "form") {
    return <Form setMode={setMode} job={jobBookmark} />
  }

  if (mode === "map") {
    return <Map setMode={setMode} items={jobs} />
  }
}
