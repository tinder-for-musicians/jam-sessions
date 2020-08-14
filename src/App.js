import React from 'react';
import Nav from './Components/';
import routes from './routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

export default App;
