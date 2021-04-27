import { Box, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import notFoundIllustration from 'assets/illustrations/undraw_page_not_found.svg';
import { NotFoundIllustration } from './styles';

const PageNotFound = ({ t }) => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      justify="center"
      direction="column"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={4}>
        <Box mb={1}>
          <Typography variant="h4" align="center">
            {t('not_found_page_title')}
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle1" align="center">
            {t('not_found_page_sub_title')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" align="center">
            Home Page
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <NotFoundIllustration src={notFoundIllustration} />
      </Grid>
    </Grid>
  );
};

PageNotFound.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(PageNotFound);
