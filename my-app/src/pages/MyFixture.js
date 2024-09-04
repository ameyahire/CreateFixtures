import React, { useState } from 'react';
import './MyFixture.css';

const MyFixture = ({ events, setEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleScoreChange = (eventIndex, fixtureIndex, team, score) => {
    const newEvents = [...events];
    newEvents[eventIndex].fixtures[fixtureIndex][team] = Number(score);
    setEvents(newEvents);
  };

  const handleMatchOver = (eventIndex, fixtureIndex) => {
    const newEvents = [...events];
    const fixture = newEvents[eventIndex].fixtures[fixtureIndex];
    fixture.matchOver = true;
    fixture.winner = fixture.score1 > fixture.score2
      ? fixture.team1
      : fixture.score1 < fixture.score2
        ? fixture.team2
        : 'Draw';
    setEvents(newEvents);
  };

  return (
    <div className='title'>
      <h1>My Fixtures</h1>
      <div>
        {events.map((event, eventIndex) => (
          <div className='my-fixture'
            key={eventIndex}
            onClick={() => handleEventClick(event)}
          >
            <strong>{event.tournamentName}</strong>
            <p>{event.selectedSport}</p>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div className='fixture-content'>
          <h2>{selectedEvent.tournamentName} Fixtures</h2>
          <button onClick={() => setIsLive(!isLive)} style={{ backgroundColor: 'orange', color: 'white', padding: '10px', margin: '10px' }}>Live</button>
          {selectedEvent.fixtures.map((fixture, fixtureIndex) => (
            <div className='fixture-content-insidebox' key={fixtureIndex}>
              <p>{fixture.team1} vs {fixture.team2}</p>
              {isLive ? (
                <div>
                  <input
                    type="number"
                    value={fixture.score1}
                    onChange={(e) => handleScoreChange(events.indexOf(selectedEvent), fixtureIndex, 'score1', e.target.value)}
                    placeholder="Score 1"
                    min="0"
                  />
                  <input
                    type="number"
                    value={fixture.score2}
                    onChange={(e) => handleScoreChange(events.indexOf(selectedEvent), fixtureIndex, 'score2', e.target.value)}
                    placeholder="Score 2"
                    min="0"
                  />
                  <button
                    onClick={() => handleMatchOver(events.indexOf(selectedEvent), fixtureIndex)}
                    style={{ backgroundColor: 'red', color: 'white', padding: '10px', margin: '10px' }}
                  >
                    Match Over
                  </button>
                </div>
              ) : (
                fixture.matchOver ? (
                  <div>
                    <p>Final Score: {fixture.score1} - {fixture.score2}</p>
                    <p>Winner: {fixture.winner}</p>
                  </div>
                ) : (
                  <p>Live Score: {fixture.score1} - {fixture.score2}</p>
                )
              )}
              <p>Time: {fixture.time}</p>
              <p>Date: {fixture.date}</p>
              <p>Location: {fixture.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFixture;
