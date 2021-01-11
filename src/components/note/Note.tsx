import React from 'react';
import './note.scss';
import { Divider, fade } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  divider: {
    backgroundColor: fade('#000000', 0.15),
    height: '2px',
  },
}));

const Note = () => {
  const classes = useStyles();

  const note = (
    <div className="note">
      <ul>
        <li>
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
          Beatae deleniti earum incidunt, qui quia voluptatem!
        </li>
        <li>
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
          Assumenda commodi debitis pariatur praesentium quisquam vero.
        </li>
        <li>
          Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
          Amet autem debitis dolore magnam provident sint.
        </li>
      </ul>
      <Divider className={classes.divider} />
    </div>

  );

  return (
    <div className="notes-container">
      { note }
    </div>
  );
};

export default Note;
