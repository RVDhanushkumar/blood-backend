import React, { useState, useEffect } from "react";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://blood-ey76.onrender.com/user/getAllEntries");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading or error messages
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px", color: "#333" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "20px", color: "#ff6b6b" }}>Error: {error}</div>;
  }

  // Render the table
  return (
    <div style={{ backgroundColor: "#fef0ef", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>User Entries</h1>
      <div
        style={{
          overflowX: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          margin: "0 auto",
          maxWidth: "1200px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ff6b6b", color: "#fff" }}>
              <th style={{ padding: "15px", textAlign: "left" }}>First Name</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Last Name</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Age</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Gender</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Blood Group</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Mobile</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "15px", textAlign: "left" }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #ddd",
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={{ padding: "15px", textAlign: "left" }}>{user.firstname}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.lastname}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.age}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.gender}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.bloodgroup}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.mobile}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.email}</td>
                <td style={{ padding: "15px", textAlign: "left" }}>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;