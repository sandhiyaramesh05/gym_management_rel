import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function GymList({ onEdit, onDelete }) {
  const [gym, setGym] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedGym, setHighlightedGym] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/gym")
      .then((res) => setGym(res.data))
      .catch((err) => console.log("Error fetching gym", err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/gym/${id}`)
      .then(() => setGym(gym.filter((gym) => gym.id !== id)))
      .catch((err) => console.log("Error deleting gym", err));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredGym = gym.filter((g) => g.MemberID.includes(event.target.value));
    setHighlightedGym(filteredGym[0]);
  };

  return (
    
    <div style={{ padding: "10px" }} className="gym-list-container">
        <h3> Enter Member ID</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by Member ID"
        style={{ width: "30%", padding: "15px", fontSize: "16px", marginBottom: "10px" }}
      />
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>MemberId</th>
            <th>MemberName</th>
            <th>MembershipType</th>
            <th>JoinDate</th>
            <th>ExpiryDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gym.map((gym) => (
            <tr key={gym.id} style={highlightedGym && highlightedGym.id === gym.id ? { backgroundColor: 'yellow' } : null}>
              <td style={{ textAlign: "center" }}>{gym.MemberID}</td>
              <td style={{ textAlign: "center" }}>{gym.MemberName}</td>
              <td style={{ textAlign: "center" }}>{gym.MembershipType}</td>
              <td style={{ textAlign: "center" }}>{gym.JoinDate}</td>
              <td style={{ textAlign: "center" }}>{gym.ExpiryDate}</td>
              <td>
                <button onClick={() => onEdit(gym)} style={{ marginRight: "30px" }}>Edit</button>
                <button onClick={() => handleDelete(gym.id)} style={{ marginRight: "30px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GymList;
