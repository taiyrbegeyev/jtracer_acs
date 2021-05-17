import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Chip,
  IconButton,
  CircularProgress,
  Typography,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import { DataGrid } from '@material-ui/data-grid';
import { withNamespaces } from 'react-i18next';
import {
  formatModerator,
  getModerators,
  removeModerator,
  resendInvitationLink
} from 'services/moderator_management_service';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DisplayModerators = ({ t }) => {
  const columns = [
    {
      field: 'email',
      headerName: t('moderators_management_page_email'),
      width: 300
    },
    {
      field: 'firstName',
      headerName: t('moderators_management_page_first_name'),
      width: 150
    },
    {
      field: 'lastName',
      headerName: t('moderators_management_page_last_name'),
      width: 150
    },
    {
      field: 'isRegistered',
      headerName: t('moderators_management_page_registered'),
      width: 130,
      type: 'boolean'
    },
    {
      field: 'registrationDate',
      headerName: t('moderators_management_page_registration_date'),
      width: 250
    },
    {
      field: 'roles',
      headerName: t('moderators_management_page_roles'),
      width: 550,
      renderCell: (params) =>
        params
          .getValue('roles')
          .map((key) => (
            <Chip key={key} label={key} style={{ marginRight: '4px' }} />
          ))
    },
    {
      field: 'id',
      headerName: t('moderators_management_page_registration_actions'),
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <IconButton
            aria-label="delete"
            onClick={() => handleOnRemoval(params.getValue('id'))}
          >
            <DeleteIcon />
          </IconButton>
          {params.getValue('isRegistered') === false && (
            <IconButton
              aria-label="resend"
              onClick={() => handleResendInvitationLink(params.getValue('id'))}
            >
              <SendIcon />
            </IconButton>
          )}
        </React.Fragment>
      )
    }
  ];

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.moderatorManagement.isLoading);
  const moderators = useSelector(
    (state) => state.moderatorManagement.moderators
  );
  const [snackBarOpen, setsnackBarOpen] = useState(false);
  const [resendSuccessful, setResendSuccessful] = useState(true);

  const handleSnackBarOpen = () => {
    setsnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  const handleOnRemoval = async (moderatorId) => {
    try {
      await removeModerator(moderatorId);
      dispatch(getModerators());
    } catch (err) {
      console.log(err);
    }
  };

  const handleResendInvitationLink = async (moderatorId) => {
    try {
      await resendInvitationLink(moderatorId);
      setResendSuccessful(true);
      handleSnackBarOpen();
    } catch (err) {
      console.log(err);
      setResendSuccessful(false);
      handleSnackBarOpen();
    }
  };

  return (
    <div style={{ height: 400 }}>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        {resendSuccessful ? (
          <Alert severity="success">
            {t('moderators_management_page_successful_resend')}
          </Alert>
        ) : (
          <Alert severity="error">
            {t('moderators_management_page_failed_resend')}
          </Alert>
        )}
      </Snackbar>
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
          <DataGrid
            rows={formatModerator(moderators)}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
          />
        )}
      </Box>
    </div>
  );
};

DisplayModerators.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(DisplayModerators);
