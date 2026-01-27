//import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './components/Auth/SignInButton';
import { SignOutButton } from './components/Auth/SignOutButton'
//import { UserProfile } from './components/Auth/UserProfile';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { ProductList, CartItem } from './components/ProductList';
import { Cart } from './components/Cart';
import { useState } from 'react';

function App() {
  //const isAuthenticated = useIsAuthenticated();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleCartUpdate = (cart: CartItem[]) => {
    setCartItems(cart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Checkout: Total amount is $${total.toFixed(2)}\n\nThis is a demo. Checkout functionality would be implemented here.`);
  };

  return (
    <>
      <main className="bg-slate-800 text-white">
        <ProtectedRoute fallback={
          <section className="flex items-center justify-center flex-col min-h-screen">
            <h2 className='text-xl'>Welcome to Our Store</h2>
            <p>Sign in to browse our products and start shopping</p>
            <SignInButton />
          </section>
        }>
          <div className="flex justify-end">
            <Cart cartItems={cartItems} onCheckout={handleCheckout} />
            <SignOutButton />
          </div>
          <ProductList onCartUpdate={handleCartUpdate} />
          
        </ProtectedRoute>
      </main>
    </>
  );
}

export default App;