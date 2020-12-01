import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import Routes from "./routes";
const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default App;
