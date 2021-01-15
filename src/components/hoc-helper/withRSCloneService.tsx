import React from 'react';
import { RSCloneServiceConsumer } from '../rsCloneServiceContext';

// Пример в Sidebar компоненте

const withRSCloneService = (Wrapped: React.FunctionComponent) => (props: any) => (
  <RSCloneServiceConsumer>
    {
        // eslint-disable-next-line react/jsx-props-no-spreading
      (rsCloneService) => (<Wrapped {...props} rsCloneService={rsCloneService} />)
    }
  </RSCloneServiceConsumer>
);

export default withRSCloneService;
