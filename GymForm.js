import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function GymForm({ selectedGym, onSave }) {
  const [gym, setGym] = useState({
    MemberID: "",
    MemberName: "",
    MembershipType: "",
    JoinDate: "",
    ExpiryDate: "",
  });

  useEffect(() => {
    if (selectedGym) setGym(selectedGym);
    else
      setGym({
        MemberID: "",
        MemberName: "",
        MembershipType: "",
        JoinDate: "",
        ExpiryDate: "",
      });
  }, [selectedGym]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGym({ ...gym, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gym.id) {
      axios
        .put(`http://localhost:5000/gym/${gym.id}`, gym)
        .then((res) => onSave(res.data))
        .catch((err) => console.log("Error updating gym", err));
    } else {
      axios
        .post("http://localhost:5000/gym", gym)
        .then((res) => onSave(res.data))
        .catch((err) => console.log("Error creating gym", err));
    }
  };

  return (
    <div className="gym-form-container1">
      <h2 style={{ textAlign: "center" }}>{gym.id ? "Edit Gym" : "Add Membership Details"}</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="MemberID" className="member-id-label" style={{ fontWeight: "bold" }}>Member ID:</label>
        <input
          type="text"
          name="MemberID"
          value={gym.MemberID}
          onChange={handleChange}
          placeholder="Member ID"
          required
        />
        <br />

        <label htmlFor="MemberName" className="member-id-label" style={{ fontWeight: "bold" }}>Member Name:</label>
        <input
          type="text"
          name="MemberName"
          value={gym.MemberName}
          onChange={handleChange}
          placeholder="Member Name"
          required
        />
        <br/>
        <label htmlFor="MembershipType" className="member-id-label" style={{ fontWeight: "bold" }}>Membership Type:</label>
        <input
          type="text"
          name="MembershipType"
          value={gym.MembershipType}
          onChange={handleChange}
          placeholder="Membership Type"
          required
        />
        <br/>
        <label htmlFor="JoinDate" className="member-id-label" style={{ fontWeight: "bold" }}>Join Date:</label>
        <input
          type="text"
          name="JoinDate"
          value={gym.JoinDate}
          onChange={handleChange}
          placeholder="Join Date"
          required
        />
        <br/>
        <label htmlFor="ExpiryDate" className="member-id-label" style={{ fontWeight: "bold" }}>Expiry Date:</label>
        <input
          type="text"
          name="ExpiryDate"
          value={gym.ExpiryDate}
          onChange={handleChange}
          placeholder="Expiry Date"
          required
        />
        <br/>
        <button type="submit" className="gym-form-container button" >
          {gym.id ? "Update" : "Create"}
        </button>
      </form>
    </div>

    

  );
  
}

export default GymForm;
