import { useState } from "react";
import { Image } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { createBookmark, getBookmarks } from "../api";

export default function Form({ setMode, job }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function sendBookmarkRequest(e) {
    e.preventDefault();
    setError("");

    try {
      // Need to implement a current_user_bookmarkId + conditional logic for PATCH, DELETE, and the bookmark button
      const res = createBookmark(
        {
          job: job.id,
          notes: notes
        }
      );

      if (!res.ok) {
        setError("Login failed.");
        return;
      }

      setMode("list");

    } catch {
      setError("Login failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div key={job.id} className="rounded border border-slate-200 bg-white p-6 job-card">
        <Image
          alt="Sample Alt Text"
          src={job.image_url}
        />
        <div>
          <h1 className="text-lg font-semibold">{job.name}</h1>
          <p>{job.description}</p>
          <p className="mt-2 text-xs text-slate-500">{job.company_name} • ${job.min_salary} • {job.job_type}</p>
        </div>
      </div>

      <form
        onSubmit={sendBookmarkRequest}
        className="w-full max-w-xs space-y-3 rounded border border-slate-200 bg-white p-5"
      >
        <h1 className="text-lg font-semibold text-slate-800">Notes</h1>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <input
          className="w-full rounded border border-slate-300 px-2 py-1.5"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          aria-label="Notes"
        />

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMode("list")}
            className="w-full rounded bg-slate-800 py-2 text-sm font-medium text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded bg-slate-800 py-2 text-sm font-medium text-white"
          >
            Bookmark
          </button>
        </div>
      </form>
    </div>
  );
}
