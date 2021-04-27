import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import notFoundIllustration from 'assets/illustrations/undraw_page_not_found.svg';
import { NotFoundIllustration } from './styles';

const PageNotFound = () => {
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
            Oops! Page not found
          </Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle1" align="center">
            Sorry, but the page you are looking for is not found. Please, make
            sure that you have typed the current URL
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

export default withNamespaces()(PageNotFound);
