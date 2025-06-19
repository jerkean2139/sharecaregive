import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SwipeItForward } from './pages/SwipeItForward';
import { ShareCareGive } from './pages/ShareCareGive';
import { Community } from './pages/Community';
import { ChatBot } from './components/ChatBot';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopOnNavigate } from './components/ScrollToTopOnNavigate';
import './styles/variables.css';
import './styles/animations.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/swipe-it-forward" element={<SwipeItForward />} />
            <Route path="/share-care-give" element={<ShareCareGive />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/" element={<Navigate to="/swipe-it-forward" replace />} />
          </Routes>
        </main>
        <ChatBot />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
