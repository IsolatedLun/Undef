import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import { refreshTokens } from './components/funcs/authFuncs';
import PrimaryNav from './components/layouts/PrimaryNav';
import ChannelRouter from './components/main/channel/ChannelRouter';
import Home from './components/main/Home';
import VideoTab from './components/main/VideoTab';
import PageNotFound from './components/modules/PageNotFound';
import { useAuth } from './hooks/useAuth';
import { useAuthenticateMutation } from './services/authApi';

function App() {
  const [authenticate] = useAuthenticateMutation();
  const { isLogged } = useAuth();

  useEffect(() => {
    if(!isLogged) {
      authenticate()
    }
  }, [])

  return (
    <Router>
      <PrimaryNav />

      <div className="main-container">
        <Routes>
          <Route path='auth/sign-up' element={<SignUp />} />
          <Route path='auth/login' element={<Login />} />

          <Route path='' element={<Home />} />
          <Route path='watch/:video_id' element={<VideoTab />} />
          <Route path='channels/:channel_id/*' element={<ChannelRouter />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
