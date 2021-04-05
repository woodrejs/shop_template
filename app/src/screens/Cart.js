import React from "react";
//COMPONENTS
import ProductInCart from "../components/ProductInCart";
import CustomInput from "../components/CustomInput";
//UTILES
import axios from "axios";
import { useCounter } from "../utils/Sweet_state";
import { v4 as uuidv4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";
import { getProductsInCart } from "../utils/Cart";
import { getStorage } from "../utils/Storage";
import { Link } from "react-router-dom";
//DATA
const INPUTS = [
  {
    name: "name",
    selector: "name",
    id: uuidv4(),
  },
  {
    name: "surname",
    selector: "surname",
    id: uuidv4(),
  },
  {
    name: "street",
    selector: "street",
    id: uuidv4(),
  },
  {
    name: "building",
    selector: "building",
    id: uuidv4(),
  },
  {
    name: "apartment",
    selector: "apartment",
    id: uuidv4(),
  },
  {
    name: "city",
    selector: "city",
    id: uuidv4(),
  },
  {
    name: "post code",
    selector: "post_code",
    id: uuidv4(),
  },
  {
    name: "phone",
    selector: "phone",
    id: uuidv4(),
  },
  {
    name: "email",
    selector: "email",
    id: uuidv4(),
  },
];

const Cart = () => {
  const [
    { cart, products, adress, adressValidation },
    { setCart, setAdressValidation },
  ] = useCounter();

  //display fn
  const displayProductsInCart = () =>
    cart &&
    getProductsInCart(cart, products).map(({ item, quantity }) => (
      <ProductInCart key={uuidv4()} product={item} quantity={quantity} />
    ));
  const displayInputs = () =>
    INPUTS.map((data) => (
      <CustomInput
        key={data.id}
        data={data}
        isValid={adressValidation[data.selector]}
      />
    ));
  //handlers
  const handleClearCart = () => setCart([]);
  const handleCheckout = (e) => {
    e.preventDefault();

    showTotalPrice(cart) > 2 &&
      addressIsValid(adress, setAdressValidation) &&
      goToStripeCheckout();
  };

  return (
    <div class="mysection">
      <div class="mycontainer">
        <div class="menu manu--cart">
          <div class="menu__cart">
            <Link to="/shop" class="heading-2">
              go back
            </Link>
          </div>
        </div>
        <div class="title_box">
          <h1 class="title">cart</h1>
        </div>
        <div class="w-row">
          <div class="w-col w-col-6">
            <div class="w-form">
              <form id="email-form">
                {displayInputs()}
                <button
                  type="submit"
                  class="w-button"
                  children="Checkout"
                  onClick={(e) => handleCheckout(e)}
                />
              </form>
            </div>
          </div>
          <div class="w-col w-col-6">
            <div class="w-layout-grid grid-2">{displayProductsInCart()}</div>
            <div class="cart__panel">
              <h3 class="cart__panel__total_price">
                total price: <span>{showTotalPrice(cart)}</span> pLN
              </h3>
              <button
                onClick={handleClearCart}
                class="cart__panel__btn w-button"
                children="clear cart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

//FUNCTIONS
async function goToStripeCheckout() {
  const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);
  const path = `${process.env.REACT_APP_DB_HOST}/create-checkout-session`;
  const items = getStorage(process.env.REACT_APP_LOCAL_STORAGE_NAME, true);
  const address = getStorage(process.env.REACT_APP_SESSION_STORAGE_NAME, false);

  //get sessionId
  const {
    data: { id: sessionId },
  } = await axios.post(path, { items, address });

  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId,
  });

  // if error from redirectToCheckout
  if (result.error) {
    console.error(result.error);
  }
}
function showTotalPrice(arr) {
  let total = 0;
  if (arr) {
    arr.forEach(({ quantity, unit_amount }) => {
      total += unit_amount * quantity;
    });
  }
  return total / 100;
}
function addressIsValid(data, clb) {
  //validation
  const validationObj = {
    name: isValid(
      `^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð -]{3,30}$`,
      data.name
    ),
    surname: isValid(
      `^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð -]{3,30}$`,
      data.surname
    ),
    street: isValid(
      `[#.0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,-]{3,30}`,
      data.street
    ),
    building: isValid(
      `^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9]{1,10}$`,
      data.building
    ),
    apartment: isValid(
      `^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð0-9]{1,10}$`,
      data.apartment
    ),
    post_code: isValid(`^[0-9]{2}[- ]{0,1}[0-9]{3}$`, data.post_code),
    city: isValid(
      `^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð -]{3,25}$`,
      data.city
    ),
    phone: isValid(`^[0-9]{9}$`, data.phone),
    email: isValid(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
      data.email
    ),
  };

  //set in sweet_state
  clb(validationObj);

  //return validation result
  const validationArr = Object.values(validationObj);
  const validationResult = validationArr.findIndex((item) => !item);
  return validationResult !== -1 ? false : true;
}
function isValid(pattern, obj) {
  return new RegExp(pattern).test(obj.trim());
}
