import React from 'react';
import RSCloneService from '../rsCloneServiceContext';

// Пример в Sidebar компоненте

const withRSCloneService = (Wrapped: React.FunctionComponent) => (props: any) => (
  <RSCloneService.Consumer>
    {
        // eslint-disable-next-line react/jsx-props-no-spreading
      (rsCloneService: any) => (<Wrapped {...props} rsCloneService={rsCloneService} />)
    }
  </RSCloneService.Consumer>
);

export default withRSCloneService;
