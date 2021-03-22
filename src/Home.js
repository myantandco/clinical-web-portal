import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { OpenSocket, SendRequest, getConnectedPods, ECGStream, getPodList } from "./WebSocket/webSocket";
import {AmplifySignOut } from '@aws-amplify/ui-react'
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
  signoutBtn: {
    // width: 400,
    display: "flex",
    verticalAlign: "center",
    justifyContent: "space-between"
  },
  pageTitle: {
    margin: 0, 
    marginTop: 10, 
    marginLeft: 10,
    fontFamily: "sans-serif"
  }
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

export default function Home({ route, navigation }) {
  const posListSubscription = useRef(null)
  const [podList, setPodList] = useState([]);
  useEffect(()=>{
    OpenSocket().then(()=>{
      getConnectedPods();
    })
    if (posListSubscription.current === null) {
      posListSubscription.current = getPodList().subscribe((data)=>{
        let tempArr = [];
        for(let key of Object.keys(data)) {
          let referenceObj = data[key];
          referenceObj["pod_id"] = key;
          tempArr.push(referenceObj)
        }
        setPodList(tempArr);
        console.log("Pod data", tempArr);
      })
    }
    return () => {
      if(posListSubscription.current != null) {
        posListSubscription.current?.unsubscribe();
        posListSubscription.current = null;
      }
    }
  }, [])
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
    <div className={classes.signoutBtn}>
      <h2 className={classes.pageTitle}>SKIIN POD List</h2>
      <AmplifySignOut></AmplifySignOut>
    </div>
    <div className={classes.mainContainer}>
      {
        podList.map((podDetails)=>{
          return (<Card className={classes.root} key={podDetails.pod_id}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Pod Details
              </Typography>
              <Typography variant="h5" component="h2">
               {podDetails.pod_id}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
               M/A: {podDetails.macaddress}
              </Typography>
              <Typography variant="body2" component="p">
                Firmware: {podDetails.fw_version}
                <br />
                Garment ID: {podDetails.garment_id}
                <br/>
                Battery Level: {podDetails.batt_level}
                <br />
                {podDetails.charging ? "Charging" : "Not-Charging" }
                <br />
                Lead ON
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/CanvasECG/${podDetails.pod_id}`} params={{ testvalue: "hello" }}><Button size="small">View ECG</Button></Link>
            </CardActions>
        </Card>)
        })
      }
  </div>
  </>);
}