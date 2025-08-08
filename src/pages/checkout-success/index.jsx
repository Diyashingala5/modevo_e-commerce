import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sessionId] = useState(searchParams.get('session_id'));

  useEffect(() => {
    // Here you could verify the session with your backend
    // and update order status in your database
    if (sessionId) {
      console.log('Payment successful for session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />
      <div className="pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            
            {sessionId && (
              <div className="bg-muted/50 rounded-lg p-4 mb-8">
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="font-mono">{sessionId}</span>
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <Button
                onClick={() => navigate('/products-list-page')}
                className="w-full sm:w-auto"
              >
                Continue Shopping
              </Button>
              
              <div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/user-profile-order-history')}
                  className="w-full sm:w-auto ml-0 sm:ml-4"
                >
                  View Order History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
