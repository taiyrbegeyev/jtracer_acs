import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import CreateNewEvent from 'components/CreateNewEvent/CreateNewEvent';
import DisplayEvents from 'components/DisplayEvents/DisplayEvents';

const EventsPage = ({ t }) => {
  const [dialogOpen, setdialogOpen] = useState(false);

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
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
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleClickOpen}>
          {t('events_page_create_new_event')}
        </Button>
      </ButtonGroup>
      <DisplayEvents />
    </div>
  );
};

EventsPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(EventsPage);
