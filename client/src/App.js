import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MyNavbar from "./components/generic/navbar";
import Stories from "./pages/stories"
import SignUp from "./pages/signUp"





function App() {
  return (
    <Router>
      <MyNavbar />
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Stories} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
