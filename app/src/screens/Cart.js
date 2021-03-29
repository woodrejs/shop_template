import React from "react";
//COMPONENTS
import ProductInCart from "../components/ProductInCart";
import AdressForm from "../components/AdressForm";
//UTILES
import { useCounter } from "../utils/Sweet_state";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { clearCart, getProductsInCart } from "../utils/Cart";

const Cart = () => {
  const [{ cart, products, adress_store }, { setCart }] = useCounter();

  const handleClearCart = (e) => clearCart(e, setCart);
  const handleDisplayTotalPrice = () => displayTotalPrice(cart);
  const handleCheckout = (e) => goToCheckout(e, adress_store);
  const handleDisplayProductsInCart = () =>
    displayProductsInCart(cart, products);

  return (
    <div>
      {handleDisplayProductsInCart()}
      <hr />
      <button onClick={(e) => handleClearCart(e)}>clear cart</button>
      <button onClick={(e) => handleCheckout(e)}>Checkout</button>
      <br />
      <div>
        Total <span>{handleDisplayTotalPrice()} PLN</span>
      </div>
      <hr />
      <AdressForm />
    </div>
  );
};

export default Cart;

//FUNCTIONS
function displayProductsInCart(cart, products) {
  if (cart && products) {
    const productsToDisplay = getProductsInCart(cart, products);

    return productsToDisplay.map(({ item, quantity }) => (
      <ProductInCart key={uuidv4()} product={item} quantity={quantity} />
    ));
  } else return null;
}
function displayTotalPrice(cart) {
  let total = 0;
  if (cart) {
    cart.forEach(({ quantity, unit_amount }) => {
      total += unit_amount * quantity;
    });
  }
  return total / 100;
}
async function goToCheckout(e, adress_store) {
  e.preventDefault();

  if (adressValidation(adress_store)) {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
    const stripe = await stripePromise;

    const storage_name = process.env.REACT_APP_LOCAL_STORAGE_NAME;
    const local_storage = localStorage.getItem(storage_name);

    const {
      data,
    } = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/create-checkout-session`,
      { items: local_storage }
    );

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
}
function adressValidation(adress_store) {
  const {
    name,
    surname,
    building,
    flat,
    street,
    post_code,
    email,
    phone,
  } = adress_store;

  const nameValid = /^[a-zA-Z\s]{2,}$/.test(name.trim());
  const surnameValid = /^[a-zA-Z\-]{2,}$/.test(surname.trim());
  const buldingValid = /[a-zA-Z0-9]{1,10}/.test(building.trim());
  const flatValid = flat.length < 10;
  const streetValid = /^[#.0-9a-zA-Z\s,-]+$/.test(street.trim());
  const post_codeValid = /^\d{2}[- ]{0,1}\d{3}$/.test(post_code.trim());
  const phoneValid = /[0-9]{9}/.test(phone.trim());
  const emailValid = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(
    email.trim()
  );

  return (
    nameValid &&
    surnameValid &&
    buldingValid &&
    flatValid &&
    streetValid &&
    post_codeValid &&
    emailValid &&
    phoneValid
  );
}
