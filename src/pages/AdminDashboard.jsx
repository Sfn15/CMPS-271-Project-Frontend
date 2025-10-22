import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/api/admin";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users + documents
  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, docsRes] = await Promise.all([
          fetch(`${API_BASE}/users`),
          fetch(`${API_BASE}/documents`)
        ]);
        const usersData = await usersRes.json();
        const docsData = await docsRes.json();
        setUsers(usersData);
        setDocuments(docsData);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Approve document
  const approveDoc = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/documents/${id}/approve`, {
        method: "PUT",
      });
      const msg = await res.text();
      alert(msg);
      window.location.reload();
    } catch (err) {
      alert("Error approving document");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <h2>👥 All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>

      <h2>📄 Documents</h2>
      <ul>
        {documents.map((d) => (
          <li key={d.id}>
            {d.title} — {d.status}
            {d.status !== "approved" && (
              <button onClick={() => approveDoc(d.id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
