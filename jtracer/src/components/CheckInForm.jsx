import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckInForm({
  setEmail,
  setIsGuest,
  setPhoneNumber,
  setZipCode,
  setCheckOutTime,
  isGuest,
}) {
  const handleOnChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "isGuest":
        setIsGuest(checked);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "zip":
        setZipCode(value);
        break;
      case "checkOutTime":
        setCheckOutTime(value);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Check In
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="isGuest" value={isGuest} />
            }
            label="I'm an external guest"
            onChange={handleOnChange}
          />
        </Grid>
        {isGuest && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              onChange={handleOnChange}
            />
          </Grid>
        )}
        {isGuest && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={handleOnChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            id="checkOutTime"
            name="checkOutTime"
            label="Check Out"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
