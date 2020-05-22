import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3b49df' },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontSize: 15,
    lineHeight: 1.5,
    letterSpacing: 0.2,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    h6: {
      fontWeight: 800,
    },
    button: {
      fontWeight: 600,
      fontSize: 15,
      textTransform: 'none',
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: 14,
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: 16,
    },
    caption: {
      fontWeight: 600,
      fontSize: 13,
    },
    body1: {
      fontSize: 15,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
