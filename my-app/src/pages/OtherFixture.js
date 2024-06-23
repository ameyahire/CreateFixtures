// src/pages/OtherFixture.js
import React, { useState } from 'react';

const OtherFixture = ({ events }) => {
  const [expandedEventIndex, setExpandedEventIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index);
  };

  return (
    <div>
      <h1>Other Fixtures</h1>
      {events.map((event, eventIndex) => (
        <div key={eventIndex} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <div
            style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f0f0f0' }}
            onClick={() => toggleExpand(eventIndex)}
          >
            <strong>{event.tournamentName}</strong>
            <p>{event.selectedSport}</p>
          </div>
          {expandedEventIndex === eventIndex && (
            <div style={{ marginTop: '10px' }}>
              {event.fixtures.map((fixture, fixtureIndex) => (
                <div key={fixtureIndex} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
                  <p>{fixture.team1} vs {fixture.team2}</p>
                  <p>Score: {fixture.score1} - {fixture.score2}</p>
                  {fixture.matchOver && (
                    <div>
                      <p>Final Score: {fixture.score1} - {fixture.score2}</p>
                      <p>Winner: {fixture.winner}</p>
                    </div>
                  )}
                  <p>Time: {fixture.time}</p>
                  <p>Date: {fixture.date}</p>
                  <p>Location: {fixture.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OtherFixture;
