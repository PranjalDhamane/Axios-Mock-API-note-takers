
import './App.css';
import GetNote from './components/getnotes';
import Crud from './components/CRUD';
import React from 'react';

export const UserContext = React.createContext()

function App() {
  return (
    <div className="App">
      <Crud />
      <GetNote />
    </div>
  );
}

export default App;
