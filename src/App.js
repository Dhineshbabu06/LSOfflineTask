import logo from './logo.svg';
import './App.css';
import Offline from './Screens/Offline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Offline />} />
      </Routes>
    </Router>
  );
}

export default App;
