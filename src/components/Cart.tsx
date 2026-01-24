import { CartItem } from './ProductList';

interface CartProps {
  cartItems: CartItem[];
  onCheckout?: () => void;
}

export const Cart: React.FC<CartProps> = ({ cartItems, onCheckout }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <aside>
        <h2>Shopping Cart</h2>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '48px', height: '48px', margin: '0 auto', display: 'block' }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p>Your cart is empty</p>
        <p>Add some products to get started!</p>
      </aside>
    );
  }

  return (
    <aside>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <article key={item.id}>
          <h4>{item.name}</h4>
          <p>${item.price.toFixed(2)} × {item.quantity}</p>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </article>
      ))}
      <footer>
        <p>
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </p>
        <p>
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </p>
      </footer>
      {onCheckout && (
        <button onClick={onCheckout}>
          Proceed to Checkout
        </button>
      )}
    </aside>
  );
};
