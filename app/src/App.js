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
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
require("dotenv").config();

//set apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_DB_HOST}/graphql`,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/failed" component={Failed} />
          <Route path="/shop" component={Shop} />
          <Route path="/success" component={Success} />
          <Route path="/product" component={Product} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
