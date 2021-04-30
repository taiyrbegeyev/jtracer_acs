import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInPending, signInSuccess, signInFail } from 'reducers/auth_slice';
import { getModeratorProfile, signIn } from 'services/auth_service';
import {
  Avatar,
  Button,
  Box,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignInPage = ({ t }) => {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSnackBarOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert('Fill up all the form!');
    }
    dispatch(signInPending());
    try {
      await signIn({ email, password });
      dispatch(signInSuccess());
      dispatch(getModeratorProfile(email));
      history.push('/');
    } catch (error) {
      console.log(error);
      if (error.response)
        dispatch(signInFail(error.response.data.error.message));
      handleClick();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      maxWidth="xs"
    >
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('sign_in_page_sign_in')}
          </Typography>
          <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('sign_in_page_sign_in')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('sign_in_page_forgot_password')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {t('sign_in_page_contact_admin')}
                </Link>
              </Grid>
            </Grid>
          </form>
          {isLoading && (
            <Box mt={4}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </Container>
    </Box>
  );
};

SignInPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(SignInPage);
