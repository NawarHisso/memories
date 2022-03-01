import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/auth"><Auth /></Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
