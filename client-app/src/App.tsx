import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { createStyles, List, ListItem, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function App() {
  <CssBaseline />
  const classes = useStyles();
  const [activities,setActivities] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response=>{
      setActivities(response.data);
    })
  }, [])
  return (
    <div className="App">
      <div className={classes.root}>
          <List component="nav" aria-label="activities">
          {activities.map((activity : any)=>(
              <ListItem key={activity.id}>
                 {activity.title}
              </ListItem>
          ))
          }
          </List>
        </div>
    </div>
  );
}

export default App;
