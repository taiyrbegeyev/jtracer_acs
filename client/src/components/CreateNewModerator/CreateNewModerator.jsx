import React, { useState } from 'react';
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
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  createModerator,
  getModerators
} from 'services/moderator_management_service';
import { Role } from 'constants/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    marginTop: theme.spacing(3)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateNewModerator = ({ t, dialogOpen, handleClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [roles, setRoles] = useState(
    Object.keys(Role).reduce((accumulator, currentValue) => {
      accumulator[currentValue] = currentValue === 'Viewer';
      return accumulator;
    }, {})
  );
  const [
    moderatorCreationSnackBarOpen,
    setModeratorCreationSnackBarOpen
  ] = useState(false);
  const [
    moderatorCreationSuccessful,
    setModeratorCreationSuccessful
  ] = useState(true);
  const dispatch = useDispatch();
  const { moderator } = useSelector((state) => state.moderator);

  const handleRoles = (event) => {
    setRoles({ ...roles, [event.target.name]: event.target.checked });
  };

  const handleModeratorCreationSnackBarOpen = () => {
    setModeratorCreationSnackBarOpen(true);
  };

  const handleModeratorCreationSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setModeratorCreationSnackBarOpen(false);
  };

  const {
    Viewer,
    EventManager,
    ModeratorManager,
    InfectionReportManager
  } = roles;
  const error =
    [Viewer, EventManager, ModeratorManager, InfectionReportManager].filter(
      (v) => v
    ).length < 1;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || error) {
      return alert('Fill up all the form!');
    }

    const selectedRoles = [];
    Object.entries(roles).forEach(([key, value]) => {
      if (value) selectedRoles.push(key);
    });

    try {
      await createModerator({
        email,
        firstName,
        lastName,
        roles: selectedRoles,
        inviteeId: moderator._id
      });
      dispatch(getModerators());
      handleClose();
      setModeratorCreationSuccessful(true);
      handleModeratorCreationSnackBarOpen();
    } catch (error) {
      console.log(error);
      setModeratorCreationSuccessful(false);
      handleModeratorCreationSnackBarOpen();
    }
  };

  return (
    <div>
      <Snackbar
        open={moderatorCreationSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleModeratorCreationSnackBarClose}
      >
        {moderatorCreationSuccessful ? (
          <Alert severity="success">
            {t('moderators_management_page_successful_creation')}
          </Alert>
        ) : (
          <Alert severity="error">
            {t('moderators_management_page_failed_creation')}
          </Alert>
        )}
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t('moderators_management_page_create_new_moderator')}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            id="email"
            label={t('moderators_management_page_email')}
            type="email"
            autoComplete="email"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <TextField
            margin="dense"
            name="firstName"
            id="firstName"
            label={t('moderators_management_page_first_name')}
            type="text"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            id="lastName"
            label={t('moderators_management_page_last_name')}
            type="text"
            fullWidth
            required
            onChange={handleOnChange}
          />
          <FormControl
            required
            error={error}
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">
              {t('moderators_management_page_roles')}
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roles.Viewer}
                    onChange={handleRoles}
                    name="Viewer"
                  />
                }
                label="Viewer"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roles.EventManager}
                    onChange={handleRoles}
                    name="EventManager"
                  />
                }
                label="Event Manager"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roles.ModeratorManager}
                    onChange={handleRoles}
                    name="ModeratorManager"
                  />
                }
                label="Moderator Manager"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roles.InfectionReportManager}
                    onChange={handleRoles}
                    name="InfectionReportManager"
                  />
                }
                label="Infection Report Manager"
              />
            </FormGroup>
            <FormHelperText>
              {t('moderators_management_page_pick_at_least_one')}
            </FormHelperText>
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

CreateNewModerator.propTypes = {
  t: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withNamespaces()(CreateNewModerator);
