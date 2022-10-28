import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content';
import Provider from './context/MyContext';

function App() {
  return (
    <Provider>
      <Content />
    </Provider>
  );
}

export default App;
