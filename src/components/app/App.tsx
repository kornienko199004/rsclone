import React from 'react';
import './app.scss';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
    </div>
  );
}
export default App;
