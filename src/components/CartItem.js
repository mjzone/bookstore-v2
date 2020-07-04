import React, { useContext } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
// import { CartContext } from "../../context/cart";

const CartItem = ({ id, image, title, price, amount }) => {
  // const { removeItem, increaseAmount, decreaseAmount } = useContext(CartContext);
  return (
    <article className="cart-item">
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>$ {price}</h5>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            console.log("Item removed")
            //removeItem(id);
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            console.log("Quantity increased")
            // increaseAmount(id);
          }}
        >
          <FaAngleUp />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          onClick={() => {
            console.log("quantity decreased");
            // decreaseAmount(id, amount);
          }}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
