import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import PeopleIcon from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Report';
import RoomIcon from '@material-ui/icons/Room';
import SettingsIcon from '@material-ui/icons/Settings';

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

const JTracerDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
        {['Locations', 'Report Infection', 'Moderator Management'].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{renderIcons(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <List style={{ marginTop: '48vh' }}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <label>Deutsch</label>
          <Switch
            checked={state.checked}
            onChange={handleChange}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <label>English</label>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="primary">Log out</Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default JTracerDrawer;
