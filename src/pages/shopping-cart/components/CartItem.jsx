import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.stock) return;
    
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
                {item?.name}
              </h3>
              
              {item?.variant && (
                <p className="text-sm text-muted-foreground mb-2">
                  {item?.variant}
                </p>
              )}

              <div className="flex items-center gap-4 mb-3">
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(item?.price)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(item?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                <Icon 
                  name={item?.stock > 10 ? "CheckCircle" : item?.stock > 0 ? "AlertCircle" : "XCircle"} 
                  size={16} 
                  className={item?.stock > 10 ? "text-success" : item?.stock > 0 ? "text-warning" : "text-destructive"}
                />
                <span className={`text-sm ${item?.stock > 10 ? "text-success" : item?.stock > 0 ? "text-warning" : "text-destructive"}`}>
                  {item?.stock > 10 ? "In Stock" : item?.stock > 0 ? `Only ${item?.stock} left` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price and Subtotal - Desktop */}
            <div className="hidden sm:block text-right">
              <div className="text-xl font-bold text-foreground">
                {formatPrice(item?.price * item?.quantity)}
              </div>
              <div className="text-sm text-muted-foreground">
                {formatPrice(item?.price)} × {item?.quantity}
              </div>
            </div>
          </div>

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Qty:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={isUpdating || item?.quantity <= 1}
                  className="h-10 w-10 p-0"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                
                <div className="flex items-center justify-center w-12 h-10 text-sm font-medium border-x border-border">
                  {isUpdating ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    item?.quantity
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={isUpdating || item?.quantity >= item?.stock}
                  className="h-10 w-10 p-0"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveForLater(item?.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Heart" size={16} className="mr-2" />
                Save for Later
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item?.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Remove
              </Button>
            </div>
          </div>

          {/* Mobile Subtotal */}
          <div className="sm:hidden mt-3 pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(item?.price * item?.quantity)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;