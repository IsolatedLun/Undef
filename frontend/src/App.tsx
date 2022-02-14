import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { positionTooltip } from './components/funcs/accessibilityFuncs';
import PrimaryNav from './components/layouts/PrimaryNav';
import Channel from './components/main/channel/ChannelHeader';
import ChannelRouter from './components/main/channel/ChannelRouter';
import Home from './components/main/Home';
import VideoTab from './components/main/VideoTab';

function App() {

  return (
    <Router>
      <PrimaryNav />

      <div className="main-container">
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='watch/:video_id' element={<VideoTab />} />
          <Route path='channels/:channel_id/*' element={<ChannelRouter />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
