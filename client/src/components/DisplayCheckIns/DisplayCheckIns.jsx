import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { withNamespaces } from 'react-i18next';
import { formatContactTrace } from 'services/contact_tracing_service';

const DisplayCheckIns = ({ t, loading, checkIns }) => {
  const columns = [
    {
      field: 'eventName',
      headerName: t('report_infection_page_event_name'),
      width: 200
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
    }
  ];

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom component="div">
        Check-ins
      </Typography>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={formatContactTrace(checkIns)}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

DisplayCheckIns.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  checkIns: PropTypes.array.isRequired
};

export default withNamespaces()(DisplayCheckIns);
