import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Chip,
  IconButton,
  CircularProgress,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import { withNamespaces } from 'react-i18next';
import {
  formatModerator,
  getModerators,
  removeModerator
} from 'services/moderator_management_service';

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
      width: 110,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          onClick={() => handleOnRemoval(params.getValue('id'))}
        >
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.moderatorManagement.isLoading);
  const moderators = useSelector(
    (state) => state.moderatorManagement.moderators
  );

  useEffect(() => {
    dispatch(getModerators());
  }, []);

  const handleOnRemoval = async (moderatorId) => {
    try {
      await removeModerator(moderatorId);
      dispatch(getModerators());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ height: 400 }}>
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
