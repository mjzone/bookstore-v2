import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
// import EmptyCart from "../components/Cart/EmptyCart";
// import CartItem from "../components/Cart/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = false;
  const { cart, total, increaseAmount, decreaseAmount } = useContext(CartContext);

  if (!cart.length) {
    return <h3>Cart is empty</h3>
  }
  return (
    <section className="cart">
      <header>
        <h2>My Cart</h2>
      </header>
      <div className="cart-wrapper">
        {cart.map(({ id, title, price, image, amount }) => (
          <article key={id} className="cart-item">
            <div className="image">
              <img src={image} alt="cart item" />
            </div>
            <div className="details">
              <p>{title}</p>
              <p>$ {price}</p>
            </div>
            <div className="amount">
              <button onClick={() => increaseAmount(id)}><FiChevronUp /></button>
              <p>{amount}</p>
              <button onClick={() => decreaseAmount(id, amount)}><FiChevronDown /></button>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3>Total: $ {total}</h3>
      </div>
      <div>
        <button className="btn">Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
