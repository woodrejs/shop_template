import { createStore, createHook } from "react-sweet-state";
import { setStorage, getStorage } from "./Storage";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    products: [],
    cart: getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true) || [],
    adress: getStorage(process.env.REACT_APP_SESSION_STORAGE_NAME, false) || {
      name: "",
      surname: "",
      street: "",
      building: "",
      apartment: "",
      post_code: "",
      city: "",
      phone: "",
      email: "",
    },
    adressValidation: {
      name: true,
      surname: true,
      street: true,
      building: true,
      apartment: true,
      post_code: true,
      city: true,
      phone: true,
      email: true,
    },
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
      //set value in localstorage
      setStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, val, true);
    },
    setAdress: (value) => ({ setState, getState }) => {
      setState({
        adress: value,
      });

      //set value in sessionstorage
      setStorage(process.env.REACT_APP_SESSION_STORAGE_NAME, value, false);
    },
    setAdressValidation: (value) => ({ setState, getState }) => {
      setState({
        adressValidation: value,
      });
    },
  },
  name: "counter",
});

export const useCounter = createHook(Store);
