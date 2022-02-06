import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryNav from './components/layouts/PrimaryNav';
import Home from './components/main/Home';

function App() {

  return (
    <Router>
      <PrimaryNav />

      <Routes>
        <Route path='' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
