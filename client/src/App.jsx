import CssBaseline from '@material-ui/core/CssBaseline';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SignIn from 'containers/SignIn/SignIn';
// import PageNotFound from 'containers/PageNotFound/PageNotFound';
import React from 'react';
import { withNamespaces } from 'react-i18next';

const App = () => {
  let theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500]
      }
    }
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignIn />
      {/* <PageNotFound /> */}
    </ThemeProvider>
  );
};

export default withNamespaces()(App);
