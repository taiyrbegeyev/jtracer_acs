import React from 'react';
import PropTypes from 'prop-types';
import { Chip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import { withNamespaces } from 'react-i18next';
import { removeModerator } from 'services/moderator_management_service';

const DisplayModerators = ({
  t,
  rows,
  handleModeratorDeletionSnackBarOpen
}) => {
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

  const handleOnRemoval = async (moderatorId) => {
    console.log(moderatorId);
    try {
      await removeModerator(moderatorId);
      handleModeratorDeletionSnackBarOpen();
    } catch (err) {
      console.log(err);
      handleModeratorDeletionSnackBarOpen();
    }
  };

  return (
    <div style={{ height: 400 }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
    </div>
  );
};

DisplayModerators.propTypes = {
  t: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  moderatorDeletionSnackBarOpen: PropTypes.bool.isRequired,
  handleModeratorDeletionSnackBarOpen: PropTypes.func.isRequired,
  handleModeratorDeletionSnackBarClose: PropTypes.func.isRequired
};

export default withNamespaces()(DisplayModerators);
