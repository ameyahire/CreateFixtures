// src/pages/TeamSheet.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamSheet.css'

const TeamSheet = ({ formData, setEvents }) => {
  const navigate = useNavigate();
  const [teamNames, setTeamNames] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (formData) {
      const numTeams = Number(formData.numberOfTeams);
      if (!isNaN(numTeams) && numTeams > 0) {
        setTeamNames(Array(numTeams).fill(''));
      }
    }
  }, [formData]);

  useEffect(() => {
    const allFieldsFilled = teamNames.every(name => name.trim() !== '');
    setIsFormValid(allFieldsFilled);
  }, [teamNames]);

  const handleNameChange = (index, event) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = event.target.value;
    setTeamNames(newTeamNames);
  };

  const handleRandomFixture = () => {
    const shuffledTeams = [...teamNames].sort(() => 0.5 - Math.random());
    const newFixtures = generateFixtures(shuffledTeams);
    setFixtures(newFixtures);
  };

  const handleCustomFixture = () => {
    const newFixtures = generateFixtures(teamNames);
    setFixtures(newFixtures);
  };

  const generateFixtures = (teams) => {
    const newFixtures = [];
    const numFixtures = Math.floor(teams.length / 2);

    for (let i = 0; i < numFixtures; i++) {
      newFixtures.push({
        team1: teams[i * 2],
        team2: teams[i * 2 + 1] || 'Yet to Decide',
        score1: 0,
        score2: 0,
        time: '',
        date: '',
        location: '',
        matchOver: false,
        winner: ''
      });
    }

    if (teams.length % 2 !== 0) {
      newFixtures.push({
        team1: teams[teams.length - 1],
        team2: 'Yet to Decide',
        score1: 0,
        score2: 0,
        time: '',
        date: '',
        location: '',
        matchOver: false,
        winner: ''
      });
    }

    return newFixtures;
  };

  const handleFixtureChange = (index, field, value) => {
    const newFixtures = [...fixtures];
    newFixtures[index][field] = value;
    setFixtures(newFixtures);
  };

  const handleDone = () => {
    if (!isFormValid) return;
    const newEvent = {
      tournamentName: formData.tournamentName,
      selectedSport: formData.selectedSport,
      fixtures: fixtures
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    navigate('/my-fixture');
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='teamsheet'>
      <h1>{formData.tournamentName} - {formData.selectedSport}</h1>
      <h2>{formData.selectedTournament} Tournament</h2>
      <h3>Enter Team Names</h3>
      {teamNames.map((name, index) => (
        <div key={index}>
          <label>Team {index + 1}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(index, e)}
            placeholder={`Enter team ${index + 1} name`}
          />
        </div>
      ))}
      <button onClick={handleRandomFixture} style={{ backgroundColor: '#93ff4c', color: 'black', padding: '10px', margin: '10px' }}>Random Fixture</button>
      <button onClick={handleCustomFixture} style={{ backgroundColor: '#31b1e0', color: 'black', padding: '10px', margin: '10px' }}>Custom Fixture</button>

      {fixtures.length > 0 && (
        <div className='fixture'>
          <h3>Fixtures</h3>
          <div className="fixture-table">
          {fixtures.map((fixture, index) => (
            <div key={index} style={{ border: '2px solid #ff7f7f', padding: '10px', margin: '10px' }}>
              <label>Team 1</label>
              <select
                value={fixture.team1}
                onChange={(e) => handleFixtureChange(index, 'team1', e.target.value)}
              >
                {teamNames.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
              <span> vs </span>
              <label>Team 2</label>
              <select
                value={fixture.team2}
                onChange={(e) => handleFixtureChange(index, 'team2', e.target.value)}
              >
                {teamNames.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
                <option value="Yet to Decide">Yet to Decide</option>
              </select>
              <div>
                <label>Time:</label>
                <input
                  type="time"
                  value={fixture.time}
                  onChange={(e) => handleFixtureChange(index, 'time', e.target.value)}
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  value={fixture.date}
                  onChange={(e) => handleFixtureChange(index, 'date', e.target.value)}
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  value={fixture.location}
                  onChange={(e) => handleFixtureChange(index, 'location', e.target.value)}
                  placeholder="Enter location"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleDone}
            style={{ backgroundColor: isFormValid ? 'green' : 'gray', color: 'black', padding: '10px', margin: '10px' }}
            disabled={!isFormValid}
          >
            Done
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default TeamSheet;
