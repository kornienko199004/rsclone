import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Navbar from '../../navbar/Navbar';
import Main from '../../containers/main/Main';
import Graph from './graph-overview/GraphOverview';
import AllPages from './all-pages/AllPages';
import Sidebar from '../../sidebar/Sidebar';
import DailyNotes from './daily-notes/DailyNotes';
import SingleNote from './single-note/SingleNote';

const ApplicationPage = (match: any) => {
  const { match: { path } } = match;
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
    </>
  );
};

export default ApplicationPage;
