import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
// Custom Enchants is temporarily hidden - re-enable the import and route below to restore it.
// import CustomEnchants from './pages/CustomEnchants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/custom_enchants/*" element={<CustomEnchants />} /> */}
        <Route path="/custom_enchants/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
