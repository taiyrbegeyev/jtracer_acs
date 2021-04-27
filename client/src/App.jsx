import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PageNotFound from 'containers/PageNotFound/PageNotFound';
import React from 'react';
import { withNamespaces } from 'react-i18next';

const App = () => {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageNotFound />
    </ThemeProvider>
  );
};

// App.propTypes = {
//   t: PropTypes.func.isRequired
// };

export default withNamespaces()(App);
