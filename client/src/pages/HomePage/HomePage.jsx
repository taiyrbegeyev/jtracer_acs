import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import JTracerDrawer from 'components/Drawer/Drawer';
import EventsPage from 'pages/EventsPage/EventsPage';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const HomePage = ({ t }) => {
  const classes = useStyles();
  const selectedIndex = useSelector((state) => state.drawer.selectedIndex);

  const getCurrentAppBarText = (selectedInxex) => {
    switch (selectedInxex) {
      case 0:
        return 'drawer_events';
      case 1:
        return 'drawer_report_infection';
      case 2:
        return 'drawer_moderator_management';
      case 3:
        return 'drawer_settings';
    }
  };

  const getCurrentScreen = (selectedInxex) => {
    switch (selectedInxex) {
      case 0:
        return <EventsPage />;
      case 1:
        return <p>Report Infection</p>;
      case 2:
        return <p>Moderator Management</p>;
      case 3:
        return <p>Settings</p>;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {t(getCurrentAppBarText(selectedIndex))}
          </Typography>
        </Toolbar>
      </AppBar>
      <JTracerDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {getCurrentScreen(selectedIndex)}
      </main>
    </div>
  );
};

HomePage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(HomePage);
