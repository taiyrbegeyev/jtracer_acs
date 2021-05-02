import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Chip
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withNamespaces } from 'react-i18next';
import { createEvent, getAllEvents } from 'services/event_service';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 500
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateNewEvent = ({ t, dialogOpen, handleClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [eventName, setEventName] = useState();
  const [eventCapacity, setEventCapacity] = useState();
  const [organizers, setOrganizers] = useState([]);
  const [eventCreationSuccessful, setEventCreationSuccessful] = useState(true);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const dispatch = useDispatch();
  const moderators = useSelector(
    (state) => state.moderatorManagement.moderators
  );

  const handleSnackBarOpen = () => {
    setsnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

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
    if (!eventName || !eventCapacity || organizers.length < 1) {
      return alert(t('fill_all_the_form'));
    }
    try {
      await createEvent({ eventName, eventCapacity, organizers });
      dispatch(getAllEvents());
      handleClose();
      setEventCreationSuccessful(true);
      handleSnackBarOpen();
    } catch (error) {
      console.log(error);
      setEventCreationSuccessful(false);
      handleSnackBarOpen();
    }
  };

  const handleChange = (event) => {
    setOrganizers(event.target.value);
  };

  return (
    <div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        {eventCreationSuccessful ? (
          <Alert severity="success">
            {t('events_page_successful_creation')}
          </Alert>
        ) : (
          <Alert severity="error">{t('events_page_failed_creation')}</Alert>
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
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            name="eventName"
            id="eventName"
            label={t('events_page_event_name')}
            type="text"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <TextField
            margin="dense"
            name="eventCapacity"
            id="eventCapacity"
            label={t('events_page_capacity')}
            type="number"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="organizers-multiple-chip-label">
              {t('events_page_organizers')}
            </InputLabel>
            <Select
              labelId="organizers-multiple-chip-label"
              id="organizers-multiple-chip-label"
              multiple
              value={organizers}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {moderators.map((moderator) => (
                <MenuItem
                  key={moderator.email}
                  value={moderator.email}
                  style={getStyles(moderator.email, organizers, theme)}
                >
                  {`${moderator.firstName} ${moderator.lastName}(${moderator.email})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('moderators_management_page_cancel')}
          </Button>
          <Button onClick={handleOnSubmit} color="primary">
            {t('moderators_management_page_create')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateNewEvent.propTypes = {
  t: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withNamespaces()(CreateNewEvent);
