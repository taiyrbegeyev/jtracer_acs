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

const ReportInfectionPage = () => {
  const [email, setEmail] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date(Date.now()));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  console.log(email);
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
        <Button variant="contained" color="secondary" style={{ height: 50 }}>
          Trace
        </Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

ReportInfectionPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(ReportInfectionPage);
