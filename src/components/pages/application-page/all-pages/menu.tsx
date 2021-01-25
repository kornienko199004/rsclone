/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Tooltip } from '@material-ui/core';
import SwitchLabels from './switch';
import { Columns } from './interfaces';
import './allPages.scss';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

type Props = {
  state: Columns;
  // eslint-disable-next-line no-unused-vars
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomizedMenus({
  state,
  handleChange,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Show/Hide columns" arrow>
        <Button
          className="eye"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <VisibilityIcon className="btn" />
        </Button>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        style={{ width: 300 }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListItemText style={{ marginLeft: 16 }} className="menu-text" primary="Show or Hide Columns" />
        <StyledMenuItem>
          <SwitchLabels handleChange={handleChange} state={state.checkedA} name="checkedA" text="Word Count" />
        </StyledMenuItem>
        <StyledMenuItem>
          <SwitchLabels handleChange={handleChange} state={state.checkedB} name="checkedB" text="Mentions" />
        </StyledMenuItem>
        <StyledMenuItem>
          <SwitchLabels handleChange={handleChange} state={state.checkedC} name="checkedC" text="Updated" />
        </StyledMenuItem>
        <StyledMenuItem>
          <SwitchLabels handleChange={handleChange} state={state.checkedD} name="checkedD" text="Created" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
