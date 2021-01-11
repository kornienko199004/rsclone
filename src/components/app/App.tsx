import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import DailyNotes from '../pages/daily-notes/Daily-notes';
import AllPages from '../pages/all-pages/All-pages';
import Graph from '../pages/graph-overview/Graph-overview';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" component={DailyNotes} exact />
          <Route
            path="/graph"
            component={Graph}
            exact
          />
          <Route
            path="/pages"
            component={AllPages}
            exact
          />
          <Route
            path="/shortcut"
            render={() => <h2>Shortcut page</h2>}
            exact
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
        <Sidebar />
      </Router>
    </div>
  );
}
export default App;
