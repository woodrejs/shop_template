import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//SCREENS
import Cart from "./screens/Cart";
import Failed from "./screens/Failed";
import Shop from "./screens/Shop";
import Success from "./screens/Success";
//UTILES
import { useCounter } from "./utils/Sweet_state";
import axios from "axios";
require("dotenv").config();

const App = () => {
  //sweet state
  const [{ products }, { setProducts }] = useCounter();

  useEffect(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_DB_HOST}/products`
    );
    setProducts(data);
  }, []);

  return (
    products.length && (
      <Router>
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/failed" component={Failed} />
          <Route path="/shop" component={Shop} />
          <Route path="/success" component={Success} />
        </Switch>
      </Router>
    )
  );
};

export default App;
