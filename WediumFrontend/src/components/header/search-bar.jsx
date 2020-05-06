import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const SearchBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [searchText, setSearchText] = useState("");

    const onTextChange = (e) => {
      if (e.target.value === "") {
        history.push("/");
      }

      setSearchText(e.target.value);
    };

    const searchOnEnter = (e) => {
      if (e.which === 13 || e.keyCode === 13) {
        if (searchText) {
          history.push({
            search: `?search=${searchText}`,
          });
        } else {
          history.push({
            search: "",
          });
        }
      }
    };

    return (
      <TextField
        id="standard-search"
        variant="outlined"
        className={classes.root}
        placeholder="Search…"
        value={searchText}
        onChange={onTextChange}
        onKeyDown={searchOnEnter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginRight: 0 }}>
              <IconButton disabled>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
          className: classes.input,
        }}
        type="search"
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
