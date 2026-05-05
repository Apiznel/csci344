import { useState, useEffect } from "react";
import { getJobs } from "../api.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faMap } from "@fortawesome/free-regular-svg-icons";
import { Image } from "antd";

export default function JobGrid({ setMode, setJobBookmark, setGlobalJobs }) {
  function jobCardHTML() {
    // 1. Fetch jobs from /api/jobs and wait
    // 2. Map job elements to HTML
    // 3. Pass up states
    // 4. Return job card HTMLs
    const [HTMLSnippet, setHTMLSnippet] = useState();
    useEffect(() => {
      getJobs().then(jobs => {
        console.log(jobs);
        const HTMLSnippets = jobs.map(job => (
          <div key={job.id} className="rounded border border-slate-200 bg-white p-6 flex gap-4 job-card">
            <Image
              alt="Sample Alt Text"
              width="15em"
              src={job.image_url}
            />
            <div>
              <h1 className="text-lg font-semibold">{job.name}</h1>
              <p>{job.description}</p>
              <p className="mt-2 text-xs text-slate-500">{job.company_name} • ${job.min_salary} • {job.job_type}</p>
              <button onClick={() => { setMode("form"); setJobBookmark(job) }}> <FontAwesomeIcon icon={faBookmark} /> </button>
            </div>
          </div>
        )
        );
        setHTMLSnippet(HTMLSnippets);
        setGlobalJobs(jobs);
      });
    }, []);
    return HTMLSnippet;
  }
  return (
    <>
      <section className="rounded border border-slate-200 bg-white p-6 grid grid-cols-2 gap-4" id="job-grid">
      <button onClick={() => setMode("map")} className="rounded border border-slate-200 bg-white col-span-2"> <FontAwesomeIcon icon={faMap} /> </button>
        {jobCardHTML(setMode, setJobBookmark)}
      </section>
    </>
  );
}

