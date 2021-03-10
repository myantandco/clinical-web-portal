import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "#eceff1",
    flexWrap: "wrap"
  },
  boldText: {
    fontWeight: 600
  },
  root: {
    margin: 6,
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Home() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.mainContainer}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/ECGViewer"><Button size="small">View ECG</Button></Link>
        </CardActions>
    </Card>
    <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View ECG</Button>
        </CardActions>
    </Card>
    <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View ECG</Button>
        </CardActions>
    </Card>
    <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View ECG</Button>
        </CardActions>
    </Card>
    <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View ECG</Button>
        </CardActions>
    </Card>
    <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Pod Details
          </Typography>
          <Typography variant="h5" component="h2">
           4022250974
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
           M/A: 267708584286381
          </Typography>
          <Typography variant="body2" component="p">
            Firmware: 4.3.6
            <br />
            Garment ID: 255
            <br/>
            Battery Level: 1
            <br />
            Charging
            <br />
            Lead ON
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View ECG</Button>
        </CardActions>
    </Card>
  </div>);
}