import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const createDropdownElements = (options, params) => {
    const filtered = [];

    if (params.inputValue !== '') {
      // Adds 'All' option to search's dropdown menu. PostType of option set to null to denote all
      filtered.push({
        inputValue: params.inputValue,
        postType: null,
        title: `Search for "${params.inputValue}" in All`,
      });

      // If on postType page, adds '<PostType>' option to search's dropdown menu.
      if (props.postType) {
        filtered.push({
          inputValue: params.inputValue,
          postType: props.postType,
          title: `Search for "${params.inputValue}" in ${props.postType}`,
        });
      }
    }

    return filtered;
  };

  // On item select (click or enter), will redirect to respective page. If PostType option selected then redirects
  // to PostType page, else to default page. Adds search query param to url.
  const getOptionsLabel = (option) => {
    history.push(
      `${option.postType ? `/post/${option.postType}` : '/'}?search=${
        option.inputValue
      }`
    );
    return option.inputValue;
  };

  return (
    <Autocomplete
      value={null}
      onChange={(e) => e.target.blur()}
      filterOptions={createDropdownElements}
      options={[]}
      getOptionLabel={getOptionsLabel}
      selectOnFocus
      autoHighlight
      clearOnBlur
      className={classes.root}
      renderOption={(option) => option.title}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.input}
          size="small"
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Search className={classes.searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    borderRadius: 12,
    border: '2px solid #000',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    backgroundColor: fade(theme.palette.common.black, 0.03),
  },
  input: {
    [`& fieldset`]: {
      borderRadius: 8,
    },
    '&:hover': {
      borderColor: fade(theme.palette.common.black, 0.03),
    },
  },
  searchIcon: {
    opacity: 0.9,
    marginLeft: 8,
  },
}));

export default SearchBar;
