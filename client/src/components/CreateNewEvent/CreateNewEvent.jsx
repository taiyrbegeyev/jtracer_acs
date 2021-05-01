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
import { createEvent } from 'services/event_service';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateNewEvent = ({
  t,
  dialogOpen,
  snackBarOpen,
  handleClose,
  handleSnackBarOpen,
  handleSnackBarClose
}) => {
  const [eventName, setEventName] = useState();
  const [eventCapacity, setEventCapacity] = useState();
  // const [organizers, setOrganizers] = useState([]);
  const [eventCreationSuccessful, setEventCreationSuccessful] = useState(true);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'eventName':
        setEventName(value);
        break;
      case 'eventCapacity':
        setEventCapacity(value);
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !eventCapacity) {
      return alert('Fill up all the form!');
    }
    try {
      await createEvent({ eventName, eventCapacity });
      handleClose();
      setEventCreationSuccessful(true);
      handleSnackBarOpen();
    } catch (error) {
      console.log(error);
      setEventCreationSuccessful(false);
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
        {eventCreationSuccessful ? (
          <Alert severity="success">Event creation is successful</Alert>
        ) : (
          <Alert severity="error">Event creation has failed</Alert>
        )}
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t('events_page_create_new_event')}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="eventName"
            id="eventName"
            label="Event Name"
            type="text"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <TextField
            margin="dense"
            name="eventCapacity"
            id="eventCapacity"
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

CreateNewEvent.propTypes = {
  t: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  snackBarOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSnackBarOpen: PropTypes.func.isRequired,
  handleSnackBarClose: PropTypes.func.isRequired
};

export default withNamespaces()(CreateNewEvent);
