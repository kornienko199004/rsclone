import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from '../../navbar/Navbar';
import Main from '../../containers/main/Main';
import Graph from './graph-overview/GraphOverview';
import AllPages from './all-pages/AllPages';
import Sidebar from '../../sidebar/Sidebar';
import DailyNotes from './daily-notes/DailyNotes';
import SingleNote from './single-note/SingleNote';
import Rightbar from '../../rightbar/Rightbar';
import Notification from './notification/Notification';
import { IInitialState } from '../../../index';
import './applicationPage.scss';

const ApplicationPage = (match: any) => {
  const { match: { path } } = match;
  const rightSidebarIsOpen = useSelector<IInitialState>((state) => state.rightSidebarIsOpen);
  const isLoading = useSelector<IInitialState>((state) => state.isLoading);
  const sidebarIsOpen = useSelector<IInitialState>((state) => state.sidebarIsOpen);
  // @ts-ignore
  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      <Main>
        <Switch>
          <Route path={path} component={DailyNotes} exact />
          <Route
            path={`${path}/graph`}
            component={Graph}
          />
          <Route
            path={`${path}/pages`}
            component={AllPages}
          />
          <Route
            path={`${path}/note/:name`}
            // eslint-disable-next-line react/jsx-props-no-spreading
            render={(props) => <SingleNote {...props} />}
            exact
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Main>
      <Sidebar />
      {rightSidebarIsOpen ? <Rightbar /> : null}
      {isLoading && (
      <div className="overlay">
        <CircularProgress
          size={100}
          className="spinner"
          style={{ marginRight: sidebarIsOpen ? '240px' : '0' }}
        />
      </div>
      )}
      <Notification />
    </>
  );
};

export default ApplicationPage;
