import 'date-fns';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DisplayContacts from 'components/DisplayContacts/DisplayContacts';
import { contactTrace, getCheckIns } from 'services/contact_tracing_service';
import DisplayCheckIns from 'components/DisplayCheckIns/DisplayCheckIns';

const ReportInfectionPage = () => {
  const [attendeeEmail, setAttendeeEmail] = useState();
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [loading_1, setLoading_1] = useState(false);
  const [loading_2, setLoading_2] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [checkIns, setCheckIns] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setAttendeeEmail(value);
  };

  const handleTrace = async () => {
    try {
      setLoading_1(true);
      setLoading_2(true);

      const params = {
        attendeeEmail,
        startDate: new Date(startDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        endDate: new Date(endDate.setUTCHours(23, 59, 59, 999)).toISOString()
      };
      const res_1 = await contactTrace(params);
      const res_2 = await getCheckIns(params);
      const { data_1 } = res_1.data;
      const { data_2 } = res_2.data;
      console.log(data_2);

      setContacts(data_1);
      setCheckIns(data_2);
      setLoading_1(false);
      setLoading_2(false);
    } catch (err) {
      console.log(err);
      setLoading_1(false);
      setLoading_2(false);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" alignItems="center">
        <TextField
          size="medium"
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleOnChange}
          style={{ width: 400 }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ height: 50 }}
          onClick={handleTrace}
        >
          Trace
        </Button>
      </Grid>
      <DisplayContacts loading={loading_1} contacts={contacts} />
      <DisplayCheckIns loading={loading_2} checkIns={checkIns} />
    </MuiPickersUtilsProvider>
  );
};

ReportInfectionPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(ReportInfectionPage);
