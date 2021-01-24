/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

type Props = {
  text: string;
  state: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export default function SwitchLabels({
  text,
  state,
  handleChange,
  name,
}: Props) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={state}
            onChange={handleChange}
            name={name}
            color="primary"
          />
        }
        label={text}
      />
    </FormGroup>
  );
}
