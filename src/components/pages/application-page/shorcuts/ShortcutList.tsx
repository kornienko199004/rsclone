import React from 'react';
import './shortcutList.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IInitialState } from '../../../../index';

const ShortcutsList: React.FC = () => {
  // @ts-ignore
  const shortcuts: string[] = useSelector<IInitialState>((state) => state.shortcuts);
  console.log(shortcuts);

  return (
    <div className="shortcut-container">

      {shortcuts
        ? shortcuts.map((shortcut) => <Link to={{ pathname: `/app/note/${shortcut}` }} key={shortcut}>{shortcut}</Link>)
        : null}
    </div>
  );
};

export default ShortcutsList;
