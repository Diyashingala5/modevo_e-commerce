import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PaymentSection = ({ paymentData, shippingData, errors, onInputChange }) => {
  const handleCardNumberChange = (e) => {
    // Format card number with spaces
    let value = e?.target?.value?.replace(/\D/g, '');
    value = value?.replace(/(\d{4})(?=\d)/g, '$1 ');
    value = value?.substring(0, 19); // Limit to 16 digits + 3 spaces
    onInputChange('payment', 'cardNumber', value);
  };

  const handleExpiryChange = (e) => {
    // Format expiry date as MM/YY
    let value = e?.target?.value?.replace(/\D/g, '');
    if (value?.length >= 2) {
      value = value?.substring(0, 2) + '/' + value?.substring(2, 4);
    }
    onInputChange('payment', 'expiryDate', value);
  };

  const handleCvvChange = (e) => {
    // Limit CVV to 4 digits
    let value = e?.target?.value?.replace(/\D/g, '')?.substring(0, 4);
    onInputChange('payment', 'cvv', value);
  };

  const handleBillingAddressToggle = (e) => {
    onInputChange('payment', 'billingAddress', {
      ...paymentData?.billingAddress,
      sameAsShipping: e?.target?.checked
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Information</h3>
        
        {/* Security Notice */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Secure Payment</p>
              <p className="text-xs text-muted-foreground">Your payment information is encrypted and secure</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Card Number"
            value={paymentData?.cardNumber}
            onChange={handleCardNumberChange}
            error={errors?.cardNumber}
            required
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              value={paymentData?.expiryDate}
              onChange={handleExpiryChange}
              error={errors?.expiryDate}
              required
              placeholder="MM/YY"
              maxLength={5}
            />
            
            <Input
              label="CVV"
              value={paymentData?.cvv}
              onChange={handleCvvChange}
              error={errors?.cvv}
              required
              placeholder="123"
              maxLength={4}
            />
          </div>
          
          <Input
            label="Cardholder Name"
            value={paymentData?.cardholderName}
            onChange={(e) => onInputChange('payment', 'cardholderName', e?.target?.value)}
            error={errors?.cardholderName}
            required
            placeholder="John Doe"
          />
        </div>
      </div>
      {/* Billing Address */}
      <div className="border-t border-border pt-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Billing Address</h4>
        
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={paymentData?.billingAddress?.sameAsShipping}
              onChange={handleBillingAddressToggle}
            />
            <span className="text-sm text-foreground">Same as shipping address</span>
          </label>
        </div>

        {!paymentData?.billingAddress?.sameAsShipping && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Address"
                value={paymentData?.billingAddress?.address}
                onChange={(e) => onInputChange('payment', 'billingAddress', {
                  ...paymentData?.billingAddress,
                  address: e?.target?.value
                })}
                required
                placeholder="123 Main Street"
              />
            </div>
            
            <div className="sm:col-span-2">
              <Input
                label="Apartment, suite, etc. (Optional)"
                value={paymentData?.billingAddress?.apartment}
                onChange={(e) => onInputChange('payment', 'billingAddress', {
                  ...paymentData?.billingAddress,
                  apartment: e?.target?.value
                })}
                placeholder="Apt 4B"
              />
            </div>
            
            <Input
              label="City"
              value={paymentData?.billingAddress?.city}
              onChange={(e) => onInputChange('payment', 'billingAddress', {
                ...paymentData?.billingAddress,
                city: e?.target?.value
              })}
              required
              placeholder="New York"
            />
            
            <Input
              label="State"
              value={paymentData?.billingAddress?.state}
              onChange={(e) => onInputChange('payment', 'billingAddress', {
                ...paymentData?.billingAddress,
                state: e?.target?.value
              })}
              required
              placeholder="NY"
            />
            
            <Input
              label="ZIP Code"
              value={paymentData?.billingAddress?.zipCode}
              onChange={(e) => onInputChange('payment', 'billingAddress', {
                ...paymentData?.billingAddress,
                zipCode: e?.target?.value
              })}
              required
              placeholder="10001"
            />
          </div>
        )}
      </div>
      {/* Payment Method Icons */}
      <div className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground mb-2">We accept:</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 px-3 py-2 bg-muted rounded-lg">
            <Icon name="CreditCard" size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Visa</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-2 bg-muted rounded-lg">
            <Icon name="CreditCard" size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Mastercard</span>
          </div>
          <div className="flex items-center space-x-1 px-3 py-2 bg-muted rounded-lg">
            <Icon name="CreditCard" size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">American Express</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;