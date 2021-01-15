import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Note from '../note/Note';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
// import DailyNotes from '../pages/daily-notes/DailyNotes';
import AllPages from '../pages/all-pages/AllPages';
import Graph from '../pages/graph-overview/GraphOverview';
import Main from '../main/Main';
import ShortcutsList from '../pages/shorcuts/ShortcutList';
import { RSCloneServiceProvider } from '../rsCloneServiceContext';
import RSCloneService from '../../services/RSClone.service';

const rsCloneService = new RSCloneService();

function App() {
  return (
    <RSCloneServiceProvider value={rsCloneService}>
      <div className="app">
        <Router>
          <Navbar />
          <Main>
            <Switch>
              <Route path="/" component={Note} exact />
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
                component={ShortcutsList}
                exact
              />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </Main>
          <Sidebar />
        </Router>
      </div>
    </RSCloneServiceProvider>
  );
}
export default App;
