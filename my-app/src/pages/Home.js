// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = ({ setFormData }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [tournamentName, setTournamentName] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [numberOfTeams, setNumberOfTeams] = useState('');

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };

  const handleTournamentChange = (event) => {
    setSelectedTournament(event.target.value);
  };

  const handleNumberOfTeamsChange = (event) => {
    setNumberOfTeams(event.target.value);
  };

  const handleTournamentNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const isFormComplete = tournamentName && selectedSport && selectedTournament && numberOfTeams;

  const handleDoneClick = () => {
    if (isFormComplete) {
      setFormData({
        tournamentName,
        selectedSport,
        selectedTournament,
        numberOfTeams
      });
      navigate('/team-sheet');
    }
  };

  return (
    <div className='home'>
      <div className="hero">
      </div>
      <div className="homebutton">
      <button onClick={handleButtonClick}>Create Fixture</button>
      </div>
      {showOptions && (
        <div className='homeform'>
          <h2>Tournament Name</h2>
          <input 
            type="text" 
            value={tournamentName} 
            onChange={handleTournamentNameChange} 
            placeholder="Enter tournament name" 
          />

          <h2>Select a Sport</h2>
          <select value={selectedSport} onChange={handleSportChange}>
            <option value="">Select Sport</option>
            <option value="Soccer">Soccer</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Cricket">Cricket</option>
            <option value="Baseball">Baseball</option>
          </select>

          <h2>Select Tournament Type</h2>
          <select value={selectedTournament} onChange={handleTournamentChange}>
            <option value="">Select Tournament Type</option>
            <option value="League">League</option>
            <option value="Knockout">Knockout</option>
          </select>

          <h2>Enter Number of Teams</h2>
          <input 
            type="number" 
            value={numberOfTeams} 
            onChange={handleNumberOfTeamsChange} 
            placeholder="Enter number of teams" 
          />

          <button 
            onClick={handleDoneClick} 
            disabled={!isFormComplete} 
            style={{
              backgroundColor: isFormComplete ? 'green' : 'gray',
              color: 'white',
              marginTop: '20px',
              padding: '10px 20px',
              display: 'block',
              border: 'none',
              cursor: isFormComplete ? 'pointer' : 'not-allowed'
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
