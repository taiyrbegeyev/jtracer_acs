/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Chip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'isRegistered',
    headerName: 'Registered',
    width: 130,
    type: 'boolean'
  },
  {
    field: 'registrationDate',
    headerName: 'Registration Date',
    width: 250
  },
  {
    field: 'roles',
    headerName: 'Roles',
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
    headerName: 'Actions',
    width: 110,
    renderCell: (params) => (
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    )
  }
];

const DisplayModerators = ({ rows }) => {
  return (
    <div style={{ height: 400 }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} autoHeight />
    </div>
  );
};

DisplayModerators.propTypes = {
  rows: PropTypes.array.isRequired
};

export default DisplayModerators;
