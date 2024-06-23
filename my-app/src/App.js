// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import TeamSheet from './pages/TeamSheet';
import MyFixture from './pages/MyFixture';
import OtherFixture from './pages/OtherFixture';

function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setFormData={setFormData} />} />
        <Route path="/team-sheet" element={<TeamSheet formData={formData} setEvents={setEvents} />} />
        <Route path="/my-fixture" element={<MyFixture events={events} setEvents={setEvents} />} />
        <Route path="/other-fixture" element={<OtherFixture events={events} />} />
      </Routes>
    </Router>
  );
}

export default App;
