import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AnimePage from "./pages/AnimePage";
import HomePage from "./pages/HomePage";
import AnimePageSingle from "./pages/AnimePageSingle";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import AlternativeRoute from "./pages/AlternativeRoute";
import UpdateProfile from "./pages/UpdateProfile";
import AnimeList from "./pages/AnimeList";
import AnimeListPublic from "./pages/AnimeListPublic";
import NavigationBar from "./components/NavigationBar";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Router>
            <AuthProvider>
              <NavigationBar title="AnimeList"></NavigationBar>
              <Switch>
                <Route exact path="/anime">
                  <AnimePage></AnimePage>
                </Route>
                <Route exact path="/anime/:id">
                  <AnimePageSingle></AnimePageSingle>
                </Route>
                <Route
                  exact
                  path="/animelist/:username"
                >
                  <AlternativeRoute 
                    Component={AnimeList}
                    Component2={AnimeListPublic} />
                </Route>
                <Route exact path="/">
                  {true ? <Redirect to="/anime" /> : <HomePage></HomePage>}
                </Route>
                <Route exact path="/signin">
                  <SignIn></SignIn>
                </Route>
                <Route exact path="/signup">
                  <SignUp></SignUp>
                </Route>
                <Route exact path="/forgot-password">
                  <ForgotPassword></ForgotPassword>
                </Route>
                <PrivateRoute
                  exact
                  path="/update-profile"
                  component={UpdateProfile}
                />
              </Switch>
            </AuthProvider>
          </Router>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
