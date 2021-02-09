import React, { ReactChildren, ReactElement } from 'react';
import './main.scss';

interface Props {
    children: ReactChildren | ReactElement;
}

const Main = ({ children }: Props) => (
  <div className="main-container">
    {children}
  </div>
);

export default Main;
