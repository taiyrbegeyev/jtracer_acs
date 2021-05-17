import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import CreateNewModerator from 'components/CreateNewModerator/CreateNewModerator';
import DisplayModerators from 'components/DisplayModerators/DisplayModerators';

const ModeratorManagementPage = ({ t }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <CreateNewModerator dialogOpen={dialogOpen} handleClose={handleClose} />
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {t('moderators_management_page_create_new_moderator')}
      </Button>
      <DisplayModerators />
    </React.Fragment>
  );
};

ModeratorManagementPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(ModeratorManagementPage);
