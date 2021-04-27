import { Grid } from '@material-ui/core';
import React from 'react';
import { withNamespaces } from 'react-i18next';
import notFoundIllustrations from 'assets/illustrations/undraw_page_not_found.svg';

const PageNotFound = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      direction="row"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <img
          src={notFoundIllustrations}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </Grid>
    </Grid>
  );
};

export default withNamespaces()(PageNotFound);
