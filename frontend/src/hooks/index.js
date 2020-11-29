import React from 'react';

import { TodoProvider } from './todos';

const AppProvider = ({ children }) => (
  <>
    <TodoProvider>{children}</TodoProvider>
  </>
);

export default AppProvider;
