import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import NavBar from './components/Nav/navbar.js';
import AlkalinityForm from './components/CalculationForms/AlkalinityForm/AlkalinityForm.js';
import SaltForm from './components/CalculationForms/SaltForm/SaltForm.js';
import ChlorineForm from './components/CalculationForms/ChlorineForm/ChlorineForm.js';
import DropDown from './components/Dropdown/dropdown.js';
import Home from './components/HomePage/home-page.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';

import { ROUTES } from './constants.js';
import Auth from './utils/auth.js';

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
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.saltForm} element={<SaltForm />} />
            <Route path={ROUTES.alkalinityForm} element={<AlkalinityForm />} />
            <Route path={ROUTES.chlorineForm} element={<ChlorineForm />} />
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
          </Routes>
        </>
      </div>
    </ApolloProvider>
  );
}

export default App;
