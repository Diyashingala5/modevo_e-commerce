import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const CartIndicator = ({ 
  itemCount = 0, 
  totalAmount = 0, 
  isVisible = true, 
  position = 'bottom-right',
  onCartClick,
  showPreview = false,
  recentItems = []
}) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      navigate('/shopping-cart');
    }
  };

  if (!isVisible || itemCount === 0) {
    return null;
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-20 right-6',
    'top-left': 'top-20 left-6'
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className={`fixed ${positionClasses?.[position]} z-1000 group`}>
      {/* Main Cart Button */}
      <Button
        onClick={handleCartClick}
        className="relative bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-full p-4"
        size="lg"
      >
        <Icon name="ShoppingCart" size={24} />
        
        {/* Item Count Badge */}
        <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center min-w-[24px] px-1">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      </Button>
      {/* Quick Preview Tooltip */}
      {showPreview && (
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-popover text-popover-foreground rounded-lg shadow-elevated p-4 min-w-[280px] border border-border">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Shopping Cart</h3>
              <span className="text-xs text-muted-foreground">{itemCount} items</span>
            </div>

            {/* Recent Items Preview */}
            {recentItems?.length > 0 && (
              <div className="space-y-2 mb-3">
                {recentItems?.slice(0, 3)?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-xs">
                    <div className="w-8 h-8 bg-muted rounded flex-shrink-0 flex items-center justify-center">
                      <Icon name="Package" size={14} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item?.name}</p>
                      <p className="text-muted-foreground">Qty: {item?.quantity}</p>
                    </div>
                    <span className="font-medium">{formatCurrency(item?.price)}</span>
                  </div>
                ))}
                {recentItems?.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{recentItems?.length - 3} more items
                  </p>
                )}
              </div>
            )}

            {/* Total */}
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium text-sm">Total:</span>
              <span className="font-semibold text-primary">{formatCurrency(totalAmount)}</span>
            </div>

            {/* Action Hint */}
            <div className="mt-2 text-center">
              <span className="text-xs text-muted-foreground">Click to view cart</span>
            </div>

            {/* Tooltip Arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-popover"></div>
          </div>
        </div>
      )}
      {/* Floating Total (Alternative Display) */}
      {totalAmount > 0 && !showPreview && (
        <div className="absolute -top-2 -left-2 bg-card text-card-foreground text-xs font-medium rounded-full px-2 py-1 shadow-subtle border border-border whitespace-nowrap">
          {formatCurrency(totalAmount)}
        </div>
      )}
    </div>
  );
};

export default CartIndicator;