import React from 'react';
import { Provider } from 'react-redux';

import { store } from './Store/store.js';
import DashBoard from './Components/DashBoard.jsx';
import Header from './Components/Header.jsx';

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <DashBoard/>
    </Provider>
  )
}

export default App
