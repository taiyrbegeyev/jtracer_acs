import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withNamespaces } from 'react-i18next';
import { createLocation } from 'services/location_service';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateNewLocation = ({
  t,
  dialogOpen,
  snackBarOpen,
  handleClose,
  handleSnackBarOpen,
  handleSnackBarClose
}) => {
  const [locationName, setlocationName] = useState();
  const [capacity, setlocationCapacity] = useState();
  const [locationCreationSuccessful, setlocationCreationSuccessful] = useState(
    true
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'locationName':
        setlocationName(value);
        break;
      case 'capacity':
        setlocationCapacity(value);
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!locationName || !capacity) {
      return alert('Fill up all the form!');
    }
    try {
      await createLocation({ locationName, capacity });
      handleClose();
      setlocationCreationSuccessful(true);
      handleSnackBarOpen();
    } catch (error) {
      console.log(error);
      setlocationCreationSuccessful(false);
      handleSnackBarOpen();
    }
  };

  return (
    <div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        {locationCreationSuccessful ? (
          <Alert severity="success">Location creation is successful</Alert>
        ) : (
          <Alert severity="error">Location creation has failed</Alert>
        )}
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t('locations_page_create_new_location')}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="locationName"
            id="locationName"
            label="Location Name"
            type="text"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <TextField
            margin="dense"
            name="capacity"
            id="capacity"
            label="Capacity"
            type="number"
            fullWidth
            required
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateNewLocation.propTypes = {
  t: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  snackBarOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSnackBarOpen: PropTypes.func.isRequired,
  handleSnackBarClose: PropTypes.func.isRequired
};

export default withNamespaces()(CreateNewLocation);
