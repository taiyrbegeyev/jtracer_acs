import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Report';
import RoomIcon from '@material-ui/icons/Room';
import SettingsIcon from '@material-ui/icons/Settings';
import { handleSelectedIndex } from 'reducers/drawer_slice';
import { signOut } from 'services/auth_service';
import { Role } from 'constants/index';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

const renderIcons = (index) => {
  switch (index) {
    case 0:
      return <RoomIcon />;
    case 1:
      return <ReportIcon />;
    case 2:
      return <PeopleIcon />;
  }
};

const JTracerDrawer = ({ t }) => {
  const classes = useStyles();
  const selectedIndex = useSelector((state) => state.drawer.selectedIndex);
  const roles = useSelector((state) => state.moderator.moderator.roles) || [];
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEvents = () => {
    return roles.includes(Role.Viewer) || roles.includes(Role.EventManager);
  };

  const handleReportInfection = () => {
    return roles.includes(Role.InfectionReportManager);
  };

  const handleModeratorManagement = () => {
    return roles.includes(Role.ModeratorManager);
  };

  const handleLogOut = async () => {
    try {
      await signOut();
      history.push('/signin');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      style={{ display: 'flex' }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {handleEvents() && (
          <ListItem
            button
            key={t('drawer_events')}
            onClick={() => dispatch(handleSelectedIndex(0))}
            selected={selectedIndex == 0}
          >
            <ListItemIcon>{renderIcons(0)}</ListItemIcon>
            <ListItemText primary={t('drawer_events')} />
          </ListItem>
        )}
        {handleReportInfection() && (
          <ListItem
            button
            key={t('drawer_report_infection')}
            onClick={() => dispatch(handleSelectedIndex(1))}
            selected={selectedIndex == 1}
          >
            <ListItemIcon>{renderIcons(1)}</ListItemIcon>
            <ListItemText primary={t('drawer_report_infection')} />
          </ListItem>
        )}
        {handleModeratorManagement() && (
          <ListItem
            button
            key={t('drawer_moderator_management')}
            onClick={() => dispatch(handleSelectedIndex(2))}
            selected={selectedIndex == 2}
          >
            <ListItemIcon>{renderIcons(2)}</ListItemIcon>
            <ListItemText primary={t('drawer_moderator_management')} />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {[t('drawer_settings')].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => dispatch(handleSelectedIndex(3))}
            selected={selectedIndex == 3}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="primary" onClick={handleLogOut}>
            Log out
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

JTracerDrawer.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(JTracerDrawer);
