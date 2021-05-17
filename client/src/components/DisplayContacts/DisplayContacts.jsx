import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { withNamespaces } from 'react-i18next';
import { formatContactTrace } from 'services/contact_tracing_service';

const DisplayContacts = ({ t, loading, contacts }) => {
  const columns = [
    {
      field: 'eventName',
      headerName: t('report_infection_page_event_name'),
      width: 200
    },
    {
      field: 'email',
      headerName: t('report_infection_page_email'),
      width: 300
    },
    {
      field: 'checkInTime',
      headerName: t('report_infection_page_checkIn_time'),
      width: 250
    },
    {
      field: 'checkOutTime',
      headerName: t('report_infection_page_checkOut_time'),
      width: 250
    },
    {
      field: 'isGuest',
      headerName: t('report_infection_page_guest'),
      width: 100,
      type: 'boolean'
    },
    {
      field: 'phoneNumber',
      headerName: t('report_infection_page_phone_number'),
      width: 250
    },
    {
      field: 'zipCode',
      headerName: t('report_infection_page_zip_code'),
      width: 150
    }
  ];

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom component="div">
        Potential Contacts
      </Typography>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={formatContactTrace(contacts)}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

DisplayContacts.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.array.isRequired
};

export default withNamespaces()(DisplayContacts);
