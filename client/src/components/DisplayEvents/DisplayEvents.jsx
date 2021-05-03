import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  CircularProgress
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    marginBottom: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

function Row(props) {
  const { event } = props;
  const [open, setOpen] = useState(false);
  const rowClasses = useRowStyles();
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={rowClasses.root}>
        <TableCell size="small" padding="none">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {event.eventName}
        </TableCell>
        <TableCell align="right">{event.eventCapacity}</TableCell>
        <TableCell align="right">{event.currentCheckIns?.length}</TableCell>
        <TableCell align="center" size="small" padding="none">
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            style={{ marginRight: '10px' }}
          >
            <PrintIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            style={{ marginRight: '10px' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Organizers
              </Typography>
              <Paper component="ul" className={classes.paper}>
                {event.organizers.map((organizer) => (
                  <li key={organizer}>
                    <Chip label={organizer} className={classes.chip} />
                  </li>
                ))}
              </Paper>
              <Typography variant="h6" gutterBottom component="div">
                Check-ins
              </Typography>
              <Table size="small" aria-label="checkIns">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Check-in Time</TableCell>
                    <TableCell>Check-out Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {event.currentCheckIns.map((checkIn) => (
                    <TableRow key={checkIn.email}>
                      <TableCell component="th" scope="row">
                        {checkIn.email}
                      </TableCell>
                      <TableCell>{checkIn.checkInTime}</TableCell>
                      <TableCell>{checkIn.checkOutTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const DisplayEvents = ({ t }) => {
  // const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.moderatorManagement.isLoading);
  const { events } = useSelector((state) => state.event);

  console.log(events);
  return (
    <Box mt={4}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : events.length === 0 ? (
        <Typography>{t('events_page_no_events_found')}</Typography>
      ) : (
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell size="small" padding="none" />
                <TableCell>Name</TableCell>
                <TableCell align="right">Capacity</TableCell>
                <TableCell align="right">Current Check-ins</TableCell>
                <TableCell size="small" padding="none" />
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <Row key={event._id} event={event} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

DisplayEvents.propTypes = {
  t: PropTypes.func.isRequired
};

Row.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    eventCapacity: PropTypes.number.isRequired,
    organizers: PropTypes.array.isRequired,
    currentCheckIns: PropTypes.array.isRequired
  }).isRequired
};

export default withNamespaces()(DisplayEvents);
