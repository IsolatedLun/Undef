import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Popup from './components/layouts/Popup';
import PrimaryNav from './components/layouts/PrimaryNav';
import ChannelRouter from './components/main/channel/ChannelRouter';
import Home from './components/main/Home';
import VideoTab from './components/main/video/VideoTab';
import PageNotFound from './components/layouts/PageNotFound';
import { useAuth } from './hooks/useAuth';
import { useAuthenticateMutation } from './services/authApi';
import Modal from './components/layouts/Modal';
import Search from './components/main/Search';
import ForgotPassword from './components/auth/ForgotPassword';
import SideNav from './components/layouts/SideNav';

function App() {
  const [authenticate] = useAuthenticateMutation();
  const { isLogged } = useAuth();

  useEffect(() => {
    if(!isLogged) {
      authenticate();
    }
  }, [])

  return (
    <Router>
      <PrimaryNav />
      <SideNav />

      <main className="main-container" id='main-content'>
        <Routes>
          <Route path='auth/sign-up' element={<SignUp />} />
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/forgot-password' element={<ForgotPassword />} />

          <Route path='' element={<Home />} />
          <Route path='watch/:video_id' element={<VideoTab />} />
          <Route path='channels/:channel_id/*' element={<ChannelRouter />} />

          <Route path='search' element={<Search />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Popup />
        <Modal />
      </main>
    </Router>
  )
}

export default App
