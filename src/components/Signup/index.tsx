import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import GoogleSignin from './../GoogleSignin';
import { auth } from './../firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type SignupInfo = {
  store: string;
  phone: string;
  email: string;
  storeowner: string;
  password: string;
};

const Signup = () => {
  const history = useHistory();
  const classes = useStyles();
  const [formInfo, setFormInfo] = useState<SignupInfo>({
    store: '',
    phone: '',
    email: '',
    storeowner: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState(localStorage.user);
  useEffect(() => {
    if (user) {
      history.push('/account');
    }
  }, [user]);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (!error && formInfo.email.trim() && formInfo.password.trim()) {
      setDisabled(true);
      auth()
        .createUserWithEmailAndPassword(formInfo.email, formInfo.password)
        .then((result) => {
          setDisabled(false);
          const user = JSON.stringify(result.user);
          localStorage.user = user;
          setUser(user);
          // alert('Account created successfully');
          history.push('/account');
        })
        .catch((error) => {
          setDisabled(false);
          setError(error.message);
        });
    } else {
      setDisabled(false);
      setError('Invalid details');
    }
  };

  const onChangeHandler = (e: React.ChangeEvent) => {
    const { name, value } = e.currentTarget as HTMLInputElement;

    setFormInfo((formInfo) => ({
      ...formInfo,
      [name]: value,
    }));
  };

  const fields = [
    { name: 'store', label: 'Store Name' },
    { name: 'storeowner', label: 'Store Owner Name' },
    { name: 'phone', label: 'Phone number' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => submitForm(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error !== '' && <Alert severity="error">{error}</Alert>}
            </Grid>
            {fields.map((field, i) => (
              <Grid item key={field.name} xs={12} sm={i <= 1 ? 6 : 12}>
                <TextField
                  name={field.name}
                  variant="outlined"
                  required
                  fullWidth
                  id={field.name}
                  label={field.label}
                  value={formInfo[field.name as keyof SignupInfo]}
                  type={field.type || 'text'}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
      <Typography component="h2" variant="h5">
        OR
      </Typography>
      <GoogleSignin content="Signup with Google" />
    </Container>
  );
};

export default Signup;
