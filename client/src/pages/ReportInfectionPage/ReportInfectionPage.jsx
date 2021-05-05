import 'moment';
import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import MomentUtils from '@date-io/moment';
import { Button, Grid, TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DisplayContacts from 'components/DisplayContacts/DisplayContacts';
import { contactTrace, getCheckIns } from 'services/contact_tracing_service';
import DisplayCheckIns from 'components/DisplayCheckIns/DisplayCheckIns';

const ReportInfectionPage = ({ t }) => {
  const [attendeeEmail, setAttendeeEmail] = useState();
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());
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
        startDate: startDate
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        endDate: endDate.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      };
      const res_1 = await contactTrace(params);
      const res_2 = await getCheckIns(params);

      setContacts(res_1);
      setCheckIns(res_2);

      setLoading_1(false);
      setLoading_2(false);
    } catch (err) {
      console.log(err);
      setLoading_1(false);
      setLoading_2(false);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
          format="L"
          margin="normal"
          id="date-picker-inline"
          label={t('report_infection_page_start_date')}
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="L"
          margin="normal"
          id="date-picker-inline"
          label={t('report_infection_page_end_date')}
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
          onClick={() => handleTrace()}
        >
          {t('report_infection_page_trace')}
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
