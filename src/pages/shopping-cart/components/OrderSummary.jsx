import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  total, 
  onCheckout, 
  onApplyPromoCode,
  isCheckingOut = false 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const handleApplyPromo = async () => {
    if (!promoCode?.trim()) return;
    
    setIsApplyingPromo(true);
    setPromoError('');
    
    try {
      // Mock promo code validation
      const validPromoCodes = {
        'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off' },
        'WELCOME20': { discount: 0.20, type: 'percentage', description: '20% off' },
        'FREESHIP': { discount: shipping, type: 'fixed', description: 'Free shipping' }
      };
      
      const promo = validPromoCodes?.[promoCode?.toUpperCase()];
      if (promo) {
        setAppliedPromo({ code: promoCode?.toUpperCase(), ...promo });
        onApplyPromoCode && onApplyPromoCode(promoCode?.toUpperCase(), promo);
        setPromoCode('');
      } else {
        setPromoError('Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    onApplyPromoCode && onApplyPromoCode(null, null);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    if (appliedPromo?.type === 'percentage') {
      return subtotal * appliedPromo?.discount;
    } else {
      return appliedPromo?.discount;
    }
  };

  const discountAmount = calculateDiscount();
  const finalTotal = total - discountAmount;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            error={promoError}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoCode?.trim()}
            loading={isApplyingPromo}
          >
            Apply
          </Button>
        </div>
        
        {appliedPromo && (
          <div className="flex items-center justify-between bg-success/10 text-success p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">
                {appliedPromo?.code} - {appliedPromo?.description}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePromo}
              className="text-success hover:text-success/80 p-1"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-foreground">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {discountAmount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount ({appliedPromo?.code})</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-foreground">
          <span>Estimated Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="flex justify-between text-foreground">
          <div className="flex items-center gap-2">
            <span>Shipping</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>
      {/* Shipping Info */}
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <Icon name="Truck" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">
              On orders over $50. Estimated delivery: 3-5 business days
            </p>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 mb-6 py-3 border-y border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Lock" size={16} className="text-success" />
          <span>SSL Protected</span>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onCheckout}
        loading={isCheckingOut}
        className="mb-4"
      >
        <Icon name="CreditCard" size={20} className="mr-2" />
        Proceed to Checkout
      </Button>
      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">We accept</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="CreditCard" size={12} className="text-muted-foreground" />
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="Smartphone" size={12} className="text-muted-foreground" />
          </div>
          <div className="w-8 h-5 bg-muted rounded flex items-center justify-center">
            <Icon name="Wallet" size={12} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;