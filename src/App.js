import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import SignIn from "./SignIn";
import Home from "./Home";
import ECGViewer from "./ECGViewer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/ECGViewer">
          <ECGViewer></ECGViewer>
        </Route>
        <Route path="/">
          {/* <SignIn></SignIn> */}
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
