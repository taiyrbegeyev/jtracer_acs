import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import {
  formatModerator,
  getModerators
} from 'services/moderator_management_service';
import CreateNewModerator from 'components/CreateNewModerator/CreateNewModerator';
import DisplayModerators from 'components/DisplayModerators/DisplayModerators';

const ModeratorManagementPage = ({ t }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.moderatorManagement.isLoading);
  const moderators = useSelector(
    (state) => state.moderatorManagement.moderators
  );

  useEffect(() => {
    dispatch(getModerators());
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
      <CreateNewModerator
        dialogOpen={dialogOpen}
        snackBarOpen={snackBarOpen}
        handleClose={handleClose}
        handleSnackBarOpen={handleSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {t('moderators_management_page_create_new_moderator')}
      </Button>
      <Box mt={4}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : moderators.length === 0 ? (
          <Typography>
            {t('moderators_management_page_no_events_found')}
          </Typography>
        ) : (
          <DisplayModerators rows={formatModerator(moderators)} />
        )}
      </Box>
    </div>
  );
};

ModeratorManagementPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(ModeratorManagementPage);
