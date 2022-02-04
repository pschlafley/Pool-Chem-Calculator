import './index.css';
import AlkalinityForm from './components/CalculationForms/AlkalinityForm/AlkalinityForm';
import SaltForm from './components/CalculationForms/SaltForm/SaltForm';

function App() {
  return (
    <div className='App'>
      <AlkalinityForm />
      <SaltForm />
    </div>
  );
}

export default App;
