import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import NavBar from './components/Nav/navbar';
import AlkalinityForm from './components/CalculationForms/AlkalinityForm/AlkalinityForm';
import SaltForm from './components/CalculationForms/SaltForm/SaltForm';
import ChlorineForm from './components/CalculationForms/ChlorineForm/ChlorineForm';
import DropDown from './components/Dropdown/dropdown';
import Home from './components/HomePage/home-page';
import SignUp from './components/SignUp/SignUp';

import Auth from './utils/auth';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
  request: operation => {
    const token = Auth.getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
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
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </>
      </div>
    </ApolloProvider>
  );
}

export default App;
