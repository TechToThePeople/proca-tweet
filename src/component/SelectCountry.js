import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputAdornment from '@material-ui/core/InputAdornment';
import LanguageIcon from '@material-ui/icons/Language';

import defaultCountries from "../data/countries.json";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Component (props) {
  const classes = useStyles();
  const [country, setCountry] = React.useState('');

  const handleChange = event => {
    setCountry(event.target.value);
    if (props.handleChange instanceof Function) 
      handleChange(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel>{props.label}</InputLabel>

        <Select
          value={country}
          onChange={handleChange}
                 InputProps ={{
              startAdornment:(<InputAdornment position="start">
              <LanguageIcon />
            </InputAdornment>),
            }}

        >
        {props.countries.map((d) =>
          <MenuItem key={d.iso} value={d.iso}>{d.name}</MenuItem>
    )}
        </Select>
      </FormControl>
   );
}

Component.defaultProps = {
  label: 'Country',
  countries:defaultCountries,
};

Component.propTypes = {
  countries: PropTypes.array,
  label:PropTypes.string,
  get: PropTypes.func,
  handleChange: PropTypes.func
};

