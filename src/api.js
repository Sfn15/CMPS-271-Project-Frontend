// Central API configuration
// Exports `baseURL` so the rest of the app can build requests against the backend.
// It prefers REACT_APP_API_URL when provided, otherwise it detects local/dev and
// falls back to http://127.0.0.1:8000 for development, or a placeholder production URL.

const isBrowser = typeof window !== "undefined";
const hostIsLocal = isBrowser && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// Allow overriding the API host via environment variable (recommended for prod).
// Create React App exposes env vars that start with REACT_APP_.
const envUrl = process.env.REACT_APP_API_URL;

//export const baseURL = envUrl || (process.env.NODE_ENV === "development" || hostIsLocal ? "http://127.0.0.1:8000" : "https://courseconnect-pluh.vercel.app");
export const baseURL =  "https://courseconnect-pluh.vercel.app";

// Small helper that prepends baseURL to a path and forwards options to fetch.
// Use `apiFetch('/path', opts)` or `fetch(`${baseURL}/path`)` depending on preference.
export async function apiFetch(path, options) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseURL}${normalizedPath}`;
  return fetch(url, options);
}

export default { baseURL, apiFetch };