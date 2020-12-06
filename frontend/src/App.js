import React from 'react';
import Modal from 'react-modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Main from './pages/Main';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

function App() {
  Modal.setAppElement('#root');
  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <GlobalStyle />
        <Main />
      </AppProvider>
    </DndProvider>
  );
}

export default App;
