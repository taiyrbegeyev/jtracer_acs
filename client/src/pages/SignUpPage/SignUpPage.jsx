import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { verifyEmailToken, signUp } from 'services/auth_service';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#FFFFFF'
  }
}));

// A custom hook that builds on useLocation to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignUpPage = ({ t }) => {
  const classes = useStyles();
  let query = useQuery();
  const history = useHistory();

  const [urlValid, setUrlValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const checkUrlValidity = async () => {
      const result = await verifyEmailToken({
        emailToken: query.get('token'),
        email: query.get('email')
      });
      setUrlValid(result);
    };
    checkUrlValidity();
  }, []);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const validatePassword = () => {
    const regExpStr =
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    return new RegExp(regExpStr, 'g').test(password);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      return alert(t('fill_all_the_form'));
    }
    if (!validatePassword()) {
      return setError(t('sign_up_page_password_error'));
    }

    try {
      setError('');
      setLoading(true);
      await signUp({
        emailToken: query.get('token'),
        email: query.get('email'),
        password
      });
      setLoading(false);
      history.push('/signin');
    } catch (err) {
      console.log(err);
      setLoading(false);
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
        {urlValid ? (
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('sign_up_page_sign_up')}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    disabled
                    defaultValue={query.get('email')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleOnChange}
                    error={error.length > 0}
                    helperText={error}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleOnSubmit}
              >
                {t('sign_up_page_sign_up')}
              </Button>
            </form>
            {loading && (
              <Box mt={4}>
                <CircularProgress />
              </Box>
            )}
          </div>
        ) : (
          <Grid>
            <Box mb={1}>
              <Typography variant="h4" align="center">
                Oops! :(
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant="subtitle1" align="center">
                The invitation link is either wrong or expired.
              </Typography>
            </Box>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

SignUpPage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(SignUpPage);
