import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentMethodsSection = ({ paymentMethods, onAddPaymentMethod, onDeletePaymentMethod, onSetDefault }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    
    if (name.startsWith('billing.')) {
      const field = name.split('.')?.[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev?.billingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e?.target?.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData?.cardNumber?.replace(/\s/g, '')?.length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!formData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!formData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!formData?.cvv) newErrors.cvv = 'CVV is required';
    if (!formData?.cardholderName?.trim()) newErrors.cardholderName = 'Cardholder name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await onAddPaymentMethod(formData);
      resetForm();
      setIsAddingCard(false);
    } catch (error) {
      console.error('Failed to add payment method:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      isDefault: false
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingCard(false);
  };

  const handleDelete = async (paymentMethodId) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      try {
        await onDeletePaymentMethod(paymentMethodId);
      } catch (error) {
        console.error('Failed to delete payment method:', error);
      }
    }
  };

  const getCardIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'amex': return 'CreditCard';
      case 'discover': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  const maskCardNumber = (number) => {
    return `**** **** **** ${number?.slice(-4)}`;
  };

  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = [
    { value: '01', label: '01 - January' },
    { value: '02', label: '02 - February' },
    { value: '03', label: '03 - March' },
    { value: '04', label: '04 - April' },
    { value: '05', label: '05 - May' },
    { value: '06', label: '06 - June' },
    { value: '07', label: '07 - July' },
    { value: '08', label: '08 - August' },
    { value: '09', label: '09 - September' },
    { value: '10', label: '10 - October' },
    { value: '11', label: '11 - November' },
    { value: '12', label: '12 - December' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="CreditCard" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
            <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
          </div>
        </div>
        
        {!isAddingCard && (
          <Button
            onClick={() => setIsAddingCard(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Card
          </Button>
        )}
      </div>
      {/* Add Card Form */}
      {isAddingCard && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
          <h3 className="text-lg font-medium text-foreground mb-4">Add New Card</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Card Number"
                name="cardNumber"
                value={formData?.cardNumber}
                onChange={handleCardNumberChange}
                error={errors?.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expiry Month *
              </label>
              <select
                name="expiryMonth"
                value={formData?.expiryMonth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Month</option>
                {months?.map(month => (
                  <option key={month?.value} value={month?.value}>
                    {month?.label}
                  </option>
                ))}
              </select>
              {errors?.expiryMonth && (
                <p className="text-sm text-destructive mt-1">{errors?.expiryMonth}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Expiry Year *
              </label>
              <select
                name="expiryYear"
                value={formData?.expiryYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Year</option>
                {years?.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors?.expiryYear && (
                <p className="text-sm text-destructive mt-1">{errors?.expiryYear}</p>
              )}
            </div>
            
            <Input
              label="CVV"
              name="cvv"
              value={formData?.cvv}
              onChange={handleInputChange}
              error={errors?.cvv}
              placeholder="123"
              maxLength={4}
              required
            />
            
            <Input
              label="Cardholder Name"
              name="cardholderName"
              value={formData?.cardholderName}
              onChange={handleInputChange}
              error={errors?.cardholderName}
              placeholder="John Doe"
              required
            />
            
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-foreground mb-3">Billing Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    name="billing.street"
                    value={formData?.billingAddress?.street}
                    onChange={handleInputChange}
                  />
                </div>
                <Input
                  label="City"
                  name="billing.city"
                  value={formData?.billingAddress?.city}
                  onChange={handleInputChange}
                />
                <Input
                  label="State"
                  name="billing.state"
                  value={formData?.billingAddress?.state}
                  onChange={handleInputChange}
                />
                <Input
                  label="ZIP Code"
                  name="billing.zipCode"
                  value={formData?.billingAddress?.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData?.isDefault}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <span className="text-sm text-foreground">Set as default payment method</span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              Save Card
            </Button>
          </div>
        </div>
      )}
      {/* Payment Methods List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="border border-border rounded-lg p-4 relative">
            {method?.isDefault && (
              <div className="absolute top-2 right-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={getCardIcon(method?.type)} size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">{method?.type}</p>
                <p className="text-sm text-muted-foreground">{maskCardNumber(method?.lastFour)}</p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-4">
              <p>Expires {method?.expiryMonth}/{method?.expiryYear}</p>
              <p>{method?.cardholderName}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(method?.id)}
                iconName="Trash2"
                iconPosition="left"
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
              
              {!method?.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetDefault(method?.id)}
                >
                  Set Default
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {paymentMethods?.length === 0 && !isAddingCard && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CreditCard" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No payment methods saved</h3>
          <p className="text-muted-foreground mb-4">Add a payment method for faster checkout</p>
          <Button onClick={() => setIsAddingCard(true)}>
            Add Payment Method
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;