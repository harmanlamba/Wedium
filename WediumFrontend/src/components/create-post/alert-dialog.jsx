import React from 'react';

//Material UI
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const AlertDialog = (props) => {
  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={2000}
        onClose={props.onCloseHandler}
      >
        <Alert onClose={props.onCloseHandler} severity="warning">
          {props.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertDialog;
