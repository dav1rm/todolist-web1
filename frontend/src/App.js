import React from 'react';
import Modal from 'react-modal';

import Main from './pages/Main';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

function App() {
  Modal.setAppElement('#root');
  return (
    <AppProvider>
      <GlobalStyle />
      <Main />
    </AppProvider>
  );
}

export default App;
