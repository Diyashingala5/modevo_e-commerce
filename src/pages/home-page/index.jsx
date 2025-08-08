import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from '../../contexts/CartContext';
import CustomerHeader from '../../components/ui/CustomerHeader';
import CartIndicator from '../../components/ui/CartIndicator';
import HeroSection from './components/HeroSection';
import CategoryShowcase from './components/CategoryShowcase';
import BenefitsSection from './components/BenefitsSection';
import TrendingProducts from './components/TrendingProducts';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';


const HomePage = () => {
  const { getCartItemCount, getCartTotal, cartItems } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cartItemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  // Get recent cart items for preview
  const recentCartItems = cartItems.slice(0, 3).map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price
  }));

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock authentication check
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };
    
    checkAuth();
  }, []);

  const handleCartClick = () => {
    console.log('Cart clicked - navigating to shopping cart');
  };

  const handleAuthClick = () => {
    console.log('Auth clicked - navigating to user profile');
  };

  return (
    <>
      <Helmet>
        <title>Modévo - Your Premier Online Shopping Destination</title>
        <meta 
          name="description" 
          content="Discover amazing deals on electronics, fashion, home goods and more. Shop with confidence at Modévo - your trusted online marketplace with fast shipping and excellent customer service." 
        />
        <meta name="keywords" content="online shopping, electronics, fashion, home goods, deals, free shipping" />
        <meta property="og:title" content="Modévo - Your Premier Online Shopping Destination" />
        <meta property="og:description" content="Discover amazing deals on electronics, fashion, home goods and more." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/home-page" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <CustomerHeader
          isAuthenticated={isAuthenticated}
          onCartClick={handleCartClick}
          onAuthClick={handleAuthClick}
        />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Modévo</h1>
            <p className="text-lg mb-6">Your one-stop shop for amazing deals and fast shipping</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition">Shop Now</button>
          </HeroSection>

          
          {/* Trending Products */}
          <TrendingProducts className="py-12" />

          {/* Benefits Section */}
          <BenefitsSection className="py-12 bg-orange-50" />

          {/* Category Showcase */}
          <CategoryShowcase className="py-12 bg-gray-100" />


          {/* Newsletter Section */}
          <NewsletterSection className="py-12 bg-gray-100" />
        </main>

        {/* Footer */}
        <Footer className="bg-gray-800 text-white py-6" />

        {/* Floating Cart Indicator */}
        <CartIndicator
          itemCount={cartItemCount}
          totalAmount={cartTotal}
          isVisible={cartItemCount > 0}
          position="bottom-right"
          showPreview={true}
          recentItems={recentCartItems}
          onCartClick={handleCartClick}
        />
      </div>
    </>
  );
};

export default HomePage;