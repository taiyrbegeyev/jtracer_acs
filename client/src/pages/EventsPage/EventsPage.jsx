import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import CreateNewEvent from 'components/CreateNewEvent/CreateNewEvent';
import DisplayEvents from 'components/DisplayEvents/DisplayEvents';
import { Role } from 'constants/index';

const EventsPage = ({ t, roles }) => {
  const [dialogOpen, setdialogOpen] = useState(false);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleEvents = () => {
    return roles?.includes(Role.EventManager);
  };

  return (
    <div>
      <CreateNewEvent
        dialogOpen={dialogOpen}
        handleClose={handleClose}
        isEdit={false}
      />
      <ButtonGroup
        variant="contained"
        color="secondary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleClickOpen} disabled={!handleEvents()}>
          {t('events_page_create_new_event')}
        </Button>
      </ButtonGroup>
      <DisplayEvents disabled={!handleEvents()} />
    </div>
  );
};

EventsPage.propTypes = {
  t: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};

export default withNamespaces()(EventsPage);
