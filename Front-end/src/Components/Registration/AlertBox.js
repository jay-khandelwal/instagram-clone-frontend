import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';


const AlertBox = (props) => {

  return (
    <div>
      <Snackbar
        open={props.open}
        onClose={props.close}
        TransitionComponent={props.transition}
        message={props.mssg}
        key={props.transition ? props.transition.name : ''}
      />
    </div>
  );
}

export default AlertBox;