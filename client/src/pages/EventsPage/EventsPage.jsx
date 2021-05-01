import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { getAllEvents } from 'services/event_service';
import CreateNewEvent from 'components/CreateNewEvent/CreateNewEvent';

const EventsPage = ({ t }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.event.isLoading);
  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [snackBarOpen]);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleSnackBarOpen = () => {
    setsnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  return (
    <div>
      <CreateNewEvent
        dialogOpen={dialogOpen}
        snackBarOpen={snackBarOpen}
        handleClose={handleClose}
        handleSnackBarOpen={handleSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleClickOpen}>
          {t('events_page_create_new_event')}
        </Button>
        <Button>{t('events_page_print_all_qr_codes')}</Button>
      </ButtonGroup>
      <Box mt={4}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : events.length === 0 ? (
          <Typography>{t('events_page_no_events_found')}</Typography>
        ) : (
          <p>good</p>
        )}
      </Box>
    </div>
  );
};

EventsPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(EventsPage);
