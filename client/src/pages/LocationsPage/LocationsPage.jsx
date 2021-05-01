import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { getAllLocations } from 'services/location_service';
import CreateNewLocation from 'components/CreateNewLocation/CreateNewLocation';

const LocationsPage = ({ t }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.location.isLoading);
  const locations = useSelector((state) => state.location.locations);

  useEffect(() => {
    dispatch(getAllLocations());
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
      <CreateNewLocation
        dialogOpen={dialogOpen}
        snackBarOpen={snackBarOpen}
        handleClose={handleClose}
        handleSnackBarOpen={handleSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleClickOpen}>
          {t('locations_page_create_new_location')}
        </Button>
        <Button>{t('locations_page_print_all_qr_codes')}</Button>
      </ButtonGroup>
      <Box mt={4}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : locations.length === 0 ? (
          <Typography>{t('locations_page_no_locations_found')}</Typography>
        ) : (
          <p>good</p>
        )}
      </Box>
    </div>
  );
};

LocationsPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(LocationsPage);
