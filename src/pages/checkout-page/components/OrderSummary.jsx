import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({
  cartItems,
  subtotal,
  shippingCost,
  tax,
  discount,
  total,
  promoCode,
  promoError,
  onPromoCodeChange,
  onApplyPromoCode
}) => {
  const [showPromoForm, setShowPromoForm] = useState(false);

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6 sticky top-24">
      <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems?.map((item) => (
          <div key={item?.id} className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-muted rounded-lg overflow-hidden">
              <img
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {item?.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item?.name}</p>
              {item?.variant && (
                <p className="text-xs text-muted-foreground">{item?.variant}</p>
              )}
            </div>
            <div className="text-sm font-medium text-foreground">
              ${(item?.price * item?.quantity)?.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      <div className="border-t border-border pt-6">
        {!showPromoForm ? (
          <Button
            variant="ghost"
            onClick={() => setShowPromoForm(true)}
            iconName="Tag"
            iconPosition="left"
            fullWidth
            className="justify-start"
          >
            Add promo code
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => onPromoCodeChange(e?.target?.value)}
                error={promoError}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={onApplyPromoCode}
                size="sm"
              >
                Apply
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPromoForm(false)}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      {/* Order Totals */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal?.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shippingCost === 0 ? 'Free' : `$${shippingCost?.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${tax?.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-success">Discount</span>
            <span className="text-success">-${discount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">${total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="border-t border-border pt-6">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="flex flex-col items-center space-y-1">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-xs text-muted-foreground">SSL Secure</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Icon name="RotateCcw" size={20} className="text-success" />
            <span className="text-xs text-muted-foreground">30-Day Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;