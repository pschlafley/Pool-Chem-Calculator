import './index.css';
import NavBar from './components/Nav/navbar';
import AlkalinityForm from './components/CalculationForms/AlkalinityForm/AlkalinityForm';
import SaltForm from './components/CalculationForms/SaltForm/SaltForm';
import Home from './components/HomePage/home-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/salt-form' element={<SaltForm />} />
          <Route path='/alkalinity-form' element={<AlkalinityForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
