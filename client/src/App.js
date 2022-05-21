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
import Register from './components/Register/Register';
import Login from './components/Login/Login';

import { ROUTES } from './constants';
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
