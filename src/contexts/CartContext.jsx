import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Default mock items
  const defaultCartItems = [
    {
      id: 1,
      name: "Premium Wireless Bluetooth Headphones",
      variant: "Color: Midnight Black",
      price: 149.99,
      originalPrice: 199.99,
      quantity: 1,
      stock: 15,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      addedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Noise Cancelling Earbuds",
      variant: "Color: White",
      price: 89.99,
      originalPrice: 119.99,
      quantity: 2,
      stock: 20,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      addedAt: new Date().toISOString()
    }
  ];

  const defaultSavedItems = [
    {
      id: 2,
      name: "Smart Fitness Tracker Watch",
      variant: "Color: Space Gray",
      price: 199.99,
      quantity: 1,
      stock: 8,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      addedAt: new Date().toISOString()
    },
    {
      id: 4,
      name: "Portable Bluetooth Speaker",
      variant: "Color: Black",
      price: 79.99,
      originalPrice: 99.99,
      quantity: 1,
      stock: 12,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      addedAt: new Date().toISOString()
    }
  ];

  const [cartItems, setCartItems] = useState(defaultCartItems);
  const [savedItems, setSavedItems] = useState(defaultSavedItems);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    const savedForLater = localStorage.getItem('saved-items');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.length > 0) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    if (savedForLater) {
      try {
        const parsedSaved = JSON.parse(savedForLater);
        if (parsedSaved.length > 0) {
          setSavedItems(parsedSaved);
        }
      } catch (error) {
        console.error('Error loading saved items from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save saved items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('saved-items', JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem = {
          ...product,
          quantity,
          addedAt: new Date().toISOString()
        };
        return [...prevItems, newItem];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const saveForLater = (itemId) => {
    const itemToSave = cartItems.find(item => item.id === itemId);
    if (itemToSave) {
      setSavedItems(prevSaved => {
        const existingItem = prevSaved.find(item => item.id === itemId);
        if (existingItem) {
          return prevSaved;
        }
        return [...prevSaved, { ...itemToSave, quantity: 1 }];
      });
      removeFromCart(itemId);
    }
  };

  const moveToCart = (itemId) => {
    const itemToMove = savedItems.find(item => item.id === itemId);
    if (itemToMove && itemToMove.stock > 0) {
      addToCart(itemToMove, 1);
      setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
    }
  };

  const removeFromSaved = (itemId) => {
    setSavedItems(prevSaved => prevSaved.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax rate
  };

  const calculateShipping = (subtotal) => {
    return subtotal >= 50 ? 0 : 9.99; // Free shipping over $50
  };

  const value = {
    cartItems,
    savedItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeFromSaved,
    clearCart,
    getCartTotal,
    getCartItemCount,
    calculateTax,
    calculateShipping
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
