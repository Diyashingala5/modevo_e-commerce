import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CustomerHeader from '../../components/ui/CustomerHeader';
import CartIndicator from '../../components/ui/CartIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';
import SavedItems from './components/SavedItems';
import RecentlyViewed from './components/RecentlyViewed';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ShoppingCart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    savedItems,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeFromSaved,
    addToCart,
    getCartTotal,
    getCartItemCount,
    calculateTax,
    calculateShipping
  } = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const subtotal = getCartTotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSaveForLater = (itemId) => {
    saveForLater(itemId);
  };

  const handleMoveToCart = (itemId) => {
    moveToCart(itemId);
  };

  const handleRemoveFromSaved = (itemId) => {
    removeFromSaved(itemId);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: Math.round(item.price * 100), // Convert to cents
            quantity: item.quantity,
          })),
        }),
      });

      const session = await response.json();

      if (session.error) {
        console.error(session.error);
        alert('Failed to create checkout session.');
        setIsCheckingOut(false);
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      
      if (result.error) {
        console.error(result.error);
        alert('Failed to redirect to checkout.');
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
  };

  const onProductsClick = () => navigate('/products-list-page');

  const handleNavigateToProductList = () => {
    navigate('/products-list-page');
  };

  const totalItemCount = getCartItemCount();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <CustomerHeader />
        <div className="pt-16">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader 
        onCartClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onProductsClick={onProductsClick}
      />
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <Button
                variant="ghost"
                onClick={handleNavigateToProductList}
                className="text-primary hover:text-primary"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Continue Shopping
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in cart</span>
              <span>•</span>
              <span>Free shipping on orders over $50</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems?.map((item) => (
                <CartItem
                  key={item?.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  onSaveForLater={handleSaveForLater}
                />
              ))}
              
              {/* Trust Signals */}
              <div className="bg-muted/50 rounded-lg p-4 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Shield" size={20} className="text-success" />
                    <span className="text-sm text-foreground">Secure Checkout</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="RotateCcw" size={20} className="text-success" />
                    <span className="text-sm text-foreground">30-Day Returns</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Icon name="Truck" size={20} className="text-success" />
                    <span className="text-sm text-foreground">Fast Shipping</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                total={total}
                onCheckout={handleCheckout}
                isCheckingOut={isCheckingOut}
              />
            </div>
          </div>

          {/* Saved Items */}
          <SavedItems
            savedItems={savedItems}
            onMoveToCart={handleMoveToCart}
            onRemoveFromSaved={handleRemoveFromSaved}
          />

          {/* Recently Viewed */}
          <RecentlyViewed onAddToCart={handleAddToCart} />
        </div>
      </div>
      {/* Cart Indicator (Hidden on cart page but available for other pages) */}
      <CartIndicator
        itemCount={totalItemCount}
        totalAmount={total}
        isVisible={false}
        showPreview={true}
        recentItems={cartItems?.slice(0, 3)?.map(item => ({
          name: item?.name,
          quantity: item?.quantity,
          price: item?.price
        }))}
      />
    </div>
  );
};

export default ShoppingCart;