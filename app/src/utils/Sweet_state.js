import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    products: [],

    adress_store:
      JSON.parse(
        sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_NAME)
      ) || [],
    cart: JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_NAME)
    ),
  },
  // actions that trigger store mutation
  actions: {
    setProducts: (val) => ({ setState, getState }) => {
      setState({
        products: val,
      });
    },
    setCart: (val) => ({ setState, getState }) => {
      setState({
        cart: val,
      });
    },
    setAdress_store: (value) => ({ setState, getState }) => {
      setState({
        adress_store: value,
      });
    },
  },
  name: "counter",
});

export const useCounter = createHook(Store);
