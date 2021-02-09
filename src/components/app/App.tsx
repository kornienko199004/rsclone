import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router, Switch,
  Route, Redirect,
} from 'react-router-dom';
// import DailyNotes from '../pages/daily-notes/DailyNotes';
import { useSelector } from 'react-redux';
import MainPage from '../pages/main-page/MainPage';
import RSCloneServiceContext from '../rsCloneServiceContext';
import RSCloneService from '../../services/RSClone.service';
import ApplicationPage from '../pages/application-page/ApplicationPage';
import PrivateRoute from '../routes/PrivateRoute';

const rsCloneService = new RSCloneService();

function App() {
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);

  return (
    <RSCloneServiceContext.Provider value={rsCloneService}>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/app" /> : <MainPage />}
            </Route>
            <PrivateRoute path="/app" component={ApplicationPage} />
          </Switch>
        </Router>
      </div>
    </RSCloneServiceContext.Provider>
  );
}
export default App;
