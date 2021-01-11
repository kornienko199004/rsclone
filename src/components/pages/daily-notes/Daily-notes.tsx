import React from 'react';
import './daily-notes.scss';
import { withRouter } from 'react-router-dom';
import Note from '../../note/Note';

// Test notes
const testNotes = () => {
  const notes = [];
  for (let i = 0; i < 10; i += 1) {
    notes.push(<Note />);
  }
  return notes;
};

const DailyNotes = () => (
  <div className="daily">
    {testNotes()}
  </div>
);
export default withRouter(DailyNotes);
