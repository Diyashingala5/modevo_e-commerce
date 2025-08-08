import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import Icon from '../AppIcon';
import Button from './Button';

const CustomerHeader = ({ isAuthenticated = false, onCartClick, onAuthClick, onProductsClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemCount } = useCart();
  
  const cartItemCount = getCartItemCount();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick(navigate);
    } else {
      navigate('/shopping-cart');
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (onAuthClick) {
      onAuthClick(navigate);
    } else {
      navigate('/user-profile-order-history');
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">Modévo</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                isActivePath('/')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              Home
            </button>
            
             <button
              onClick={() => {
                if (onProductsClick) {
                  onProductsClick();
                } else {
                  handleNavigation('/products-list-page');
                }
              }}
              className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                isActivePath('/products-list-page')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              Products
            </button>

            <button
              onClick={() => handleNavigation('/shopping-cart')}
              className={`relative flex items-center space-x-2 text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                isActivePath('/shopping-cart')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name="ShoppingCart" size={18} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavigation('/user-profile-order-history')}
              className={`flex items-center space-x-2 text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                isActivePath('/user-profile-order-history')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name="User" size={18} />
              <span>{isAuthenticated ? 'Account' : 'My Account'}</span>
            </button>

             <button
              onClick={() => handleNavigation('/admin-dashboard')}
              className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                isActivePath('/admin-dashboard')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              Admin Panel
            </button>

          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative"
            >
              <Icon name="Menu" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleNavigation('/')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                  isActivePath('/')
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Home" size={18} />
                  <span>Home</span>
                </div>
              </button>

              <button
                onClick={handleCartClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                  isActivePath('/shopping-cart')
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="ShoppingCart" size={18} />
                    <span>Shopping Cart</span>
                  </div>
                  {cartItemCount > 0 && (
                    <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={handleAuthClick}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                  isActivePath('/user-profile-order-history')
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="User" size={18} />
                  <span>{isAuthenticated ? 'Account & Orders' : 'Sign In'}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CustomerHeader;