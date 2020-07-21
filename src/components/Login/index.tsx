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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import { auth, provider } from './../firebase';
import GoogleSignin from './../GoogleSignin';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type UserInfo = {
  email: string;
  password: string;
};

const Login = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
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
    setDisabled(true);
    if (error === null && userInfo.email.trim() && userInfo.password.trim()) {
      auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((result) => {
          setDisabled(false);
          const user = JSON.stringify(result.user);
          alert('Login Successful');
          localStorage.user = user;
          setUser(user);
        })
        .catch((error) => {
          setError(error.message);
          setDisabled(false);
        });
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setUserInfo((info) => ({
      ...info,
      [name]: value,
    }));
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => submitForm(e)}>
          {error !== '' && <Alert severity="error">{error}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            placeholder="Enter email address"
            value={userInfo.email}
            onChange={(e) => onChangeHandler(e)}
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
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={(e) => onChangeHandler(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      
      <Box mt={8}></Box>
      <Typography component="h2" variant="h5">
        OR
      </Typography>
      <GoogleSignin content="Sign in with Google" />
      </div>
    </Container>
  );
};

export default Login;
