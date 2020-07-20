import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { auth, provider } from './../firebase';

const GoogleSignin = ({ content }: any) => {
  const history = useHistory();
  const [user, setUser] = useState(localStorage.user);
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user) {
      history.push('/account');
    }
  }, [user]);

  const handleGoogleSignin = () => {
    auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = JSON.stringify(result.user);
        localStorage.user = user;
        setUser(user);
      })
      .catch((error) => {
        setError(error.message);
        setDisabled(false);
      });
  };
  return (
    <Grid container>
      <Button
        variant="contained"
        fullWidth
        color="secondary"
        onClick={handleGoogleSignin}
      >
        {content}
      </Button>
    </Grid>
  );
};

export default GoogleSignin;
