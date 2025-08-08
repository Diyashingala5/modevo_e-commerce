import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import CustomerHeader from '../../components/ui/CustomerHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ShippingSection from './components/ShippingSection';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import StepIndicator from './components/StepIndicator';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState({
    shipping: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      saveAddress: false
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: {
        sameAsShipping: true,
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    },
    deliveryOption: 'standard'
  });

  // Mock cart items for order summary
    // Get cart data from context or sessionStorage
 const { cartItems } = useCart();

  const [deliveryOptions] = useState([
    { id: 'standard', name: 'Standard Shipping', price: 9.99, duration: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 19.99, duration: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 39.99, duration: '1 business day' }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, name: 'Shipping', icon: 'Truck' },
    { id: 2, name: 'Payment', icon: 'CreditCard' },
    { id: 3, name: 'Review', icon: 'Eye' }
  ];

  // Calculate order totals
  const subtotal = cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  const shippingCost = deliveryOptions?.find(option => option?.id === orderData?.deliveryOption)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoDiscount;
  const total = subtotal + shippingCost + tax - discount;

  const handleStepChange = (step) => {
    if (step <= currentStep || validateCurrentStep()) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handlePlaceOrder();
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      // Validate shipping information
      if (!orderData?.shipping?.email) newErrors.email = 'Email is required';
      if (!orderData?.shipping?.firstName) newErrors.firstName = 'First name is required';
      if (!orderData?.shipping?.lastName) newErrors.lastName = 'Last name is required';
      if (!orderData?.shipping?.address) newErrors.address = 'Address is required';
      if (!orderData?.shipping?.city) newErrors.city = 'City is required';
      if (!orderData?.shipping?.state) newErrors.state = 'State is required';
      if (!orderData?.shipping?.zipCode) newErrors.zipCode = 'ZIP code is required';
    } else if (currentStep === 2) {
      // Validate payment information
      if (!orderData?.payment?.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!orderData?.payment?.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!orderData?.payment?.cvv) newErrors.cvv = 'CVV is required';
      if (!orderData?.payment?.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleApplyPromoCode = async () => {
    // Mock promo code validation
    if (promoCode?.toLowerCase() === 'save10') {
      setPromoDiscount(subtotal * 0.1); // 10% discount
    } else if (promoCode?.toLowerCase() === 'welcome20') {
      setPromoDiscount(20); // $20 discount
    } else {
      setErrors(prev => ({ ...prev, promoCode: 'Invalid promo code' }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Mock order processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful order
      const orderId = `ORD-${Date.now()}`;
      navigate('/order-confirmation', { 
        state: { 
          orderId, 
          orderData,
          cartItems,
          total
        }
      });
    } catch (error) {
      console.error('Order processing failed:', error);
      setErrors({ general: 'Order processing failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShippingSection
            shippingData={orderData?.shipping}
            deliveryOptions={deliveryOptions}
            selectedDelivery={orderData?.deliveryOption}
            errors={errors}
            onInputChange={handleInputChange}
            onDeliveryChange={(option) => setOrderData(prev => ({ ...prev, deliveryOption: option }))}
          />
        );
      case 2:
        return (
          <PaymentSection
            paymentData={orderData?.payment}
            shippingData={orderData?.shipping}
            errors={errors}
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Order Review</h3>
              
              {/* Shipping Summary */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{orderData?.shipping?.firstName} {orderData?.shipping?.lastName}</p>
                    <p>{orderData?.shipping?.address}</p>
                    {orderData?.shipping?.apartment && <p>{orderData?.shipping?.apartment}</p>}
                    <p>{orderData?.shipping?.city}, {orderData?.shipping?.state} {orderData?.shipping?.zipCode}</p>
                    <p>{orderData?.shipping?.country}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Payment Method</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>•••• •••• •••• {orderData?.payment?.cardNumber?.slice(-4)}</p>
                    <p>{orderData?.payment?.cardholderName}</p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="border-t border-border pt-4">
                <label className="flex items-start space-x-3">
                  <Input type="checkbox" className="mt-1" required />
                  <span className="text-sm text-muted-foreground">
                    I agree to the <button className="text-primary hover:underline">Terms and Conditions</button> and <button className="text-primary hover:underline">Privacy Policy</button>
                  </span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader cartItemCount={cartItemCount} />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
              <Button
                variant="ghost"
                onClick={() => navigate('/shopping-cart')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Cart
              </Button>
            </div>
            
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepChange}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={handleNextStep}
                    loading={isProcessing}
                    iconName={currentStep === 3 ? "Lock" : "ArrowRight"}
                    iconPosition={currentStep === 3 ? "left" : "right"}
                  >
                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                discount={discount}
                total={total}
                promoCode={promoCode}
                promoError={errors?.promoCode}
                onPromoCodeChange={setPromoCode}
                onApplyPromoCode={handleApplyPromoCode}
              />
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 bg-muted/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm text-foreground">SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RotateCcw" size={20} className="text-success" />
                <span className="text-sm text-foreground">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Truck" size={20} className="text-success" />
                <span className="text-sm text-foreground">Free Returns & Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;