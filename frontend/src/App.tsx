import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { positionTooltip } from './components/funcs/accessibilityFuncs';
import PrimaryNav from './components/layouts/PrimaryNav';
import Home from './components/main/Home';
import VideoTab from './components/main/VideoTab';

function App() {

  useEffect(() => {
    document.querySelectorAll('.btn--tooltip').forEach(tooltipEl => {
      (tooltipEl as HTMLElement).addEventListener('mouseover', 
        (e) => positionTooltip(e.target as HTMLElement))
    })
  })

  return (
    <Router>
      <PrimaryNav />

      <div className="main-container">
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='watch/:video_id' element={<VideoTab />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
