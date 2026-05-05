import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function sendRequest(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(getApiBaseUrl() + path, {
    method: options.method,
    body: options.body,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      message = errorBody.error || errorBody.message || message;
    } catch {
      // Keep the default message if the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// TODO: Add your own endpoint functions below.
// Example:
export function getJobs() {
  return sendRequest("/api/Jobs");
}

export function getBookmarks() {
  return sendRequest("/api/Bookmarks");
}
export function createBookmark(data) {
  return sendRequest("/api/Bookmarks", {method: "POST", body: JSON.stringify(data)});
}
export function updateBookmark(id, data) {
  return sendRequest("/api/Bookmarks/" + id, {method: "PATCH", body: JSON.stringify(data)});
}
export function deleteBookmark(id) {
  return sendRequest("/api/Bookmarks/" + id, {method: "DELETE"});
}
