import React from 'react';
import RSCloneService from '../rsCloneServiceContext';

const withRSCloneService = (Wrapped: React.FC<{ location: any }>) => (props: any) => (
  <RSCloneService.Consumer>
    {
        // eslint-disable-next-line react/jsx-props-no-spreading
      (rsCloneService: any) => (<Wrapped {...props} rsCloneService={rsCloneService} />)
    }
  </RSCloneService.Consumer>
);

export default withRSCloneService;
