import React from 'react';
import RSCloneService from '../../services/RSClone.service';

const RSCloneServiceContext = React.createContext<RSCloneService>({} as RSCloneService);

export default RSCloneServiceContext;
