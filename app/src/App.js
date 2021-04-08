import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//STYLE
import "./styles/normalize.css";
import "./styles/shop-template-f4799e.webflow.css";
import "./styles/webflow.css";
//SCREENS
import Cart from "./screens/Cart";
import Failed from "./screens/Failed";
import Shop from "./screens/Shop";
import Success from "./screens/Success";
import Product from "./screens/Product";
//UTILES
require("dotenv").config();

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/failed" component={Failed} />
        <Route path="/shop" component={Shop} />
        <Route path="/success" component={Success} />
        <Route path="/product" component={Product} />
      </Switch>
    </Router>
  );
};

export default App;
