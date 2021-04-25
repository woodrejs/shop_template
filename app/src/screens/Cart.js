import React, { useEffect, useState } from "react";
//components
import AdressForm from "../components/AdressForm";
import ProductsInCart from "../components/ProductsInCart";
//utiles
import { useCounter } from "../utils/Sweet_state";
import { Link } from "react-router-dom";

const Cart = () => {
  const [{ cart }, { setCart }] = useCounter();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClearCart = () => setCart([]);

  useEffect(() => setTotalPrice(getTotalPrice(cart)), [cart]);

  return (
    <div className="mysection">
      <div className="mycontainer">
        <div className="menu manu--cart">
          <div className="menu__cart">
            <Link to="/shop" className="heading-2">
              go back
            </Link>
          </div>
        </div>
        <div className="title_box">
          <h1 className="title">cart</h1>
        </div>
        <div className="w-row">
          <div className="w-col w-col-6">
            <div className="w-form">
              <AdressForm totalPrice={totalPrice} />
            </div>
          </div>
          <div className="w-col w-col-6">
            <ProductsInCart />
            <div className="cart__panel">
              <h3 className="cart__panel__total_price">
                <span>total price: {totalPrice} PLN</span>
              </h3>
              <button
                onClick={handleClearCart}
                className="cart__panel__btn w-button"
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

function getTotalPrice(arr) {
  let total = 0;
  if (arr) {
    arr.forEach(({ quantity, unit_amount }) => {
      total += unit_amount * quantity;
    });
  }

  return total / 100;
}
