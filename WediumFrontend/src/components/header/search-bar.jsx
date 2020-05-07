import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          return;
        }

        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = [];

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            postType: null,
            title: `Search for "${params.inputValue}" in All`,
          });

          if (props.postType) {
            filtered.push({
              inputValue: params.inputValue,
              postType: props.postType,
              title: `Search for "${params.inputValue}" in ${props.postType}`,
            });
          }
        }

        return filtered;
      }}
      options={[]}
      getOptionLabel={(option) => {
        history.push(`${option.postType ? `/post/${option.postType}` : "/"}?search=${option.inputValue}`);
        return option.inputValue; 
      }}
      selectOnFocus
      autoHighlight={true}
      clearOnBlur
      className={classes.root}
      renderOption={(option) => option.title}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Search" variant="outlined" />
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    borderRadius: "50px",
    backgroundColor: "#ffffff",
    borderBottom: "0px",
    border: 0,
  },
  input: {
    height: "45px",
    borderRadius: "8px",
    border: 0,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 10,
  },
}));

export default SearchBar;
