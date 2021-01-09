import React from 'react';
import './app.scss';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Note from '../note/Note';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Note />
    </div>
  );
}
export default App;
