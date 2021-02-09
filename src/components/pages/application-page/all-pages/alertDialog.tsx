import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  withStyles,
} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { RowSelectedParams } from '@material-ui/data-grid';
import { Tooltip } from '@material-ui/core';

const StyledButton = withStyles({
  root: {
    minWidth: '49px',
  },
})(Button);

export default function AlertDialog({ selected, deleteRows, isVisible }: any) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = selected;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const noteQ = selectedValue.length === 1 || selectedValue.length === 21 ? 'note' : 'notes';

  return (
    !isVisible
      ? (
        <Tooltip title="First select pages to delete" arrow>
          <StyledButton>
            <DeleteOutlineIcon
              className="btn"
            />
          </StyledButton>
        </Tooltip>
      )
      : (
        <span>
          <Tooltip title="Delete selected pages" arrow>
            <StyledButton>
              <DeleteOutlineIcon
                className="btn"
                onClick={handleClickOpen}
              />
            </StyledButton>
          </Tooltip>
          <Dialog
            className="dialog"
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {
                `Are you sure you want to permanently delete ${selectedValue.length} ${noteQ}?`
              }
            </DialogTitle>
            <DialogContent>
              <List className="list-item">
                {selectedValue.map((note: RowSelectedParams) => {
                  const mentions = note.data.mentions === 1 ? 'Mention' : 'Mentions';
                  const words = note.data.wordCount === 1 ? 'Word' : 'Words';
                  return (
                    <ListItem key={note.data.id}>
                      <ListItemText primary={note.data.title} secondary={`${note.data.mentions} ${mentions}, ${note.data.wordCount} ${words}`} />
                    </ListItem>
                  );
                })}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setSelectedValue([]);
                  handleClose();
                }}
                color="primary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteRows(selectedValue);
                  handleClose();
                }}
                variant="contained"
                color="secondary"
                autoFocus
              >
                {`Yes, delete ${noteQ}`}
              </Button>
            </DialogActions>
          </Dialog>
        </span>
      )
  );
}
