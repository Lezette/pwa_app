import React, {useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const tomatoTypes: string[] = ["Gino","Gino Someting","Heiz"];
const productCategory: string[] = ["Soap","Indomie","Maggi","Mama gold"];

type StoreInfo = {
  agentId: string,
  storeName: string,
  storeOwner: string,
  tomatoType: string[],
  productCategories: string[]
}
const Agents = () => {
  const classes = useStyles();
  const [checked, setChecked]: number[] = useState([1]);

  const handleToggle = (value: number, list: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <Container maxWidth="sm">
        <CssBaseline />
        <div className="form-container">
        <Typography component="h1" variant="h5">
          Add Store
        </Typography>
        <form>
          <TextField 
            id="agent-id"
            name="agent-id"
            label="Agent Id"
            margin="normal"
            variant="filled"
            fullWidth
            required
           />
          <TextField 
            id="store-name"
            name="store-name"
            label="Store Name"
            margin="normal"
            variant="filled"
            fullWidth 
            required
           />
          <TextField 
            id="store-owner"
            name="store-owner"
            label="Store Owner"
            margin="normal"
            variant="filled"
            fullWidth 
            required
           />
          
          <Typography
            variant="overline" 
            display="block"
            gutterBottom
          >
          Location
        </Typography>
        <Divider variant="middle" />
        <TextField 
            id="address"
            name="address"
            label="Enter Store Address"
            margin="normal"
            variant="filled"
            fullWidth 
            required
           />
           
          <Typography
            variant="overline" 
            display="block"
            gutterBottom
          >
          Store Products Information
        </Typography>
        <Divider variant="middle" />
        <List dense className={classes.root}>
            <Typography
                variant="caption" 
                align="center"
                display="block"
                gutterBottom
              >
              What type of tomato paste do you sell?
            </Typography>
            {tomatoTypes.map((category, value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button>
                  <ListItemText id={labelId} primary={category} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      color="default"
                      onChange={handleToggle(value, category)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </List>
      <Divider variant="middle" />
          <List dense className={classes.root}>
          <Typography
              variant="caption" 
              align="center"
              display="block"
              gutterBottom
            >
            What category of products do you sell?
          </Typography>
        {productCategory.map((type, value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemText id={labelId} primary={type} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  color="default"
                  onChange={handleToggle(value, type)}
                  checked={checked.indexOf(value) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

        </form>
        </div>
      </Container>
    </>
  )
}

export default Agents
