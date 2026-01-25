import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { ApiService, Product } from '../services/apiService';

export interface CartItem extends Product {
  quantity: number;
}

interface ProductListProps {
  onCartUpdate: (cart: CartItem[]) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onCartUpdate }) => {
  const { instance } = useMsal();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const api = new ApiService(instance);
        const data = await api.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [instance]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      let newCart: CartItem[];
      if (existingItem) {
        // Increase quantity if product already in cart
        newCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }
      
      onCartUpdate(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      
      onCartUpdate(newCart);
      return newCart;
    });
  };

  const getProductQuantityInCart = (productId: string): number => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className='text-center text-4xl'>Available Products</h2>
      <div className="grid grid-cols-3 gap-4 mx-auto place-items-center">
        {products.map((product) => {
          const quantityInCart = getProductQuantityInCart(product.id);
          
          return (
            <article  key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div>
                {quantityInCart === 0 ? (
                  <button onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white  hover:bg-blue-600 active:bg-blue-700 cursor-pointer">
                    Add to Cart
                  </button>
                ) : (
                  <>
                    <button onClick={() => removeFromCart(product.id)}>−</button>
                    <span>{quantityInCart}</span>
                    <button onClick={() => addToCart(product)}>+</button>
                  </>
                )}
              </div>
              {quantityInCart > 0 && (
                <p>Subtotal: ${(product.price * quantityInCart).toFixed(2)}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
