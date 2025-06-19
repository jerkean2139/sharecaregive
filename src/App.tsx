
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShareCareGive } from './pages/ShareCareGive';
import { SwipeItForward } from './pages/SwipeItForward';
import { Community } from './pages/Community';
import { Navigation } from './components/Navigation';
import { ScrollToTopOnNavigate } from './components/ScrollToTopOnNavigate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTopOnNavigate />
        <Navigation />
        <Routes>
          <Route path="/" element={<ShareCareGive />} />
          <Route path="/swipe-it-forward" element={<SwipeItForward />} />
          <Route path="/community/:locationId" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
