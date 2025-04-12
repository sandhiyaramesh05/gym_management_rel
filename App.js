import "./App.css";
import { useState, useEffect } from "react";
import GymForm from "./components/GymForm";
import GymList from "./components/GymList";



function App() {
  const [selectedGym, setSelectedGym] = useState(null);

  const handleEdit = (gym) => setSelectedGym(gym);
  const handleSave = () => setSelectedGym(null);

  return (
    <div>
      <h1 style={{ textAlign: "center" , color: "black" }}>Gym Management System</h1>
      <GymForm selectedGym={selectedGym} onSave={handleSave} />
      <GymList onEdit={handleEdit} onDelete={handleSave} />
    </div>
  );
}

export default App;
