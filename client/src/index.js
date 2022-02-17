import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader/StyleContext'

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

ReactDOM.hydrate(
  <BrowserRouter>
    <StyleContext.Provider value={insertCss}>
      <App />
    </StyleContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
