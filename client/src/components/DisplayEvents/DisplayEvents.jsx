import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
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
import RenderPDF from 'components/RenderPDF/RenderPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { getAllEvents, removeEvent } from 'services/event_service';
import CreateNewEvent from 'components/CreateNewEvent/CreateNewEvent';
import { Role } from 'constants/index';

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
  const { t, event, disabled } = props;
  const [dialogOpen, setdialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const rowClasses = useRowStyles();
  const classes = useStyles();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.moderator.moderator.roles) || [];

  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  const handleClose = () => {
    setdialogOpen(false);
  };

  const handleOnRemoval = async (eventId) => {
    try {
      await removeEvent(eventId);
      dispatch(getAllEvents(roles));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <CreateNewEvent
        dialogOpen={dialogOpen}
        handleClose={handleClose}
        isEdit={true}
        eventId={event._id}
        defaultEventName={event.eventName}
        defaultEventCapacity={event.eventCapacity}
        defaultOrganizers={event.organizers}
      />
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
            style={{ marginRight: '10px' }}
            disabled={disabled}
          >
            <PDFDownloadLink
              document={
                <RenderPDF eventName={event.eventName} qrCode={event.qrCode} />
              }
              fileName={`${event.eventName} CheckIn QR.pdf`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: '0',
                margin: '0',
                display: 'inherit'
              }}
            >
              <PrintIcon />
            </PDFDownloadLink>
          </IconButton>
          <IconButton
            size="small"
            onClick={handleClickOpen}
            style={{ marginRight: '10px' }}
            disabled={disabled}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOnRemoval(event._id)}
            disabled={disabled}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {t('display_events_organizers')}
              </Typography>
              <Paper component="ul" className={classes.paper}>
                {event.organizers.map((organizer) => (
                  <li key={organizer}>
                    <Chip label={organizer} className={classes.chip} />
                  </li>
                ))}
              </Paper>
              {(roles.includes(Role.Viewer) ||
                roles.includes(Role.InfectionReportManager)) && (
                  <Typography variant="h6" gutterBottom component="div">
                    {t('display_events_checkins')}
                  </Typography>
                ) && (
                  <Table size="small" aria-label="checkIns">
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('display_events_email')}</TableCell>
                        <TableCell>
                          {t('display_events_checkin_time')}
                        </TableCell>
                        <TableCell>
                          {t('display_events_checkout_time')}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {event.currentCheckIns &&
                        event.currentCheckIns.length !== 0 &&
                        event.currentCheckIns.map((checkIn) => (
                          <TableRow key={checkIn.email}>
                            <TableCell component="th" scope="row">
                              {checkIn.email}
                            </TableCell>
                            <TableCell>
                              {moment(checkIn.checkInTime)
                                .local()
                                .format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                            <TableCell>
                              {moment(checkIn.checkOutTime)
                                .local()
                                .format('YYYY-MM-DD HH:mm:ss')}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const DisplayEvents = ({ t, disabled }) => {
  const isLoading = useSelector((state) => state.moderatorManagement.isLoading);
  const { events } = useSelector((state) => state.event);

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
                <TableCell>{t('display_events_name')}</TableCell>
                <TableCell align="right">
                  {t('display_events_capacity')}
                </TableCell>
                <TableCell align="right">
                  {t('display_events_current_checkins')}
                </TableCell>
                <TableCell size="small" padding="none" />
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <Row key={event._id} event={event} disabled={disabled} t={t} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

DisplayEvents.propTypes = {
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

Row.propTypes = {
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    eventCapacity: PropTypes.number.isRequired,
    organizers: PropTypes.array.isRequired,
    currentCheckIns: PropTypes.array.isRequired,
    qrCode: PropTypes.string.isRequired
  }).isRequired
};

export default withNamespaces()(DisplayEvents);
