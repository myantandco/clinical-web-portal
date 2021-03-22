
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import ECGViewer from "./ECGViewer";
import SciChart from "./SciChart";
import CanvasECG from "./CanvasECG/CanvasECG";
// import ECGPlot from "./ECGPlot";
import Amplify from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

let awsconfig = {
  "aws_project_region": "ca-central-1",
  "aws_cognito_identity_pool_id": "ca-central-1:6caff98b-cd88-4792-b199-161e5deabbd1",
  "aws_cognito_region": "ca-central-1",
  "aws_user_pools_id": "ca-central-1_72AvhBx7V",
  "aws_user_pools_web_client_id": "314ca2pa0o0f7lk5a3nkoga45j",
  "oauth": {}
}
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
})

function App() {
  return (
    <>
    
    <Router>
      <Switch>
        {/* <Route path="/home">
          <Home></Home>
        </Route> */}
        <Route path="/ECGViewer/:podid" render={props => <ECGViewer {...props}/>}/>
        <Route path="/SciChart/:podid" render={props => <SciChart {...props}/>}/>
        <Route path="/CanvasECG/:podid" render={props => <CanvasECG {...props}/>}/>
        {/* <Route path="/ECGPlot/:podid" render={props => <ECGPlot {...props}/>}/> */}
        <Route path="/">
          {/* <SignIn></SignIn> */}
          <Home></Home>
          {/* <CanvasECG></CanvasECG> */}
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default withAuthenticator(App);
