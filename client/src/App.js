import './index.css';
import NavBar from './components/Nav/navbar';
import AlkalinityForm from './components/CalculationForms/AlkalinityForm/AlkalinityForm';
import SaltForm from './components/CalculationForms/SaltForm/SaltForm';
import ChlorineForm from './components/CalculationForms/ChlorineForm/ChlorineForm';
import DropDown from './components/Dropdown/dropdown';
import Home from './components/HomePage/home-page';
import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';


function App() {
  return (
    <div className='App'>
      <>
        {isMobile ? (
          <DropDown />
        ) : (
          <div className='navContainer'>
            <NavBar />
          </div>
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/salt-form' element={<SaltForm />} />
          <Route path='/alkalinity-form' element={<AlkalinityForm />} />
          <Route path='/chlorine-form' element={<ChlorineForm />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
