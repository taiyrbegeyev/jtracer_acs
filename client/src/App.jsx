import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { withNamespaces } from 'react-i18next';

App.propTypes = {
  t: PropTypes.func.isRequired
};

const App = ({ t }) => {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Typography variant="h3">{t('Welcome to React')}</Typography>
      </div>
    </ThemeProvider>
  );
};

export default withNamespaces()(App);
