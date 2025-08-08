import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileSection from './components/ProfileSection';
import OrderHistorySection from './components/OrderHistorySection';
import AddressBookSection from './components/AddressBookSection';
import PaymentMethodsSection from './components/PaymentMethodsSection';
import PreferencesSection from './components/PreferencesSection';
import SecuritySection from './components/SecuritySection';

const UserProfileOrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [cartItemCount] = useState(3);
  const [isAuthenticated] = useState(true);

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    firstName: "Diya",
    lastName: "Shingala",
    email: "dsdsd5@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    totalOrders: 24,
    totalSpent: "2,847.50",
    loyaltyPoints: 1250,
    memberSince: "2022"
  });

  const [orders] = useState([
    {
      id: "ORD-001",
      orderNumber: "2024-001234",
      orderDate: "2024-07-25",
      status: "delivered",
      total: 149.99,
      subtotal: 129.99,
      shipping: 15.00,
      tax: 5.00,
      trackingNumber: "1Z999AA1234567890",
      items: [
        { name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99 },
        { name: "Phone Case - Clear", quantity: 2, price: 25.00 }
      ],
      shippingAddress: {
        name: "Diya Shingala",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: "ORD-002",
      orderNumber: "2024-001235",
      orderDate: "2024-07-20",
      status: "shipped",
      total: 89.99,
      subtotal: 79.99,
      shipping: 10.00,
      tax: 0.00,
      trackingNumber: "1Z999AA1234567891",
      items: [
        { name: "Laptop Stand - Adjustable", quantity: 1, price: 79.99 }
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: "ORD-003",
      orderNumber: "2024-001236",
      orderDate: "2024-07-15",
      status: "processing",
      total: 299.99,
      subtotal: 279.99,
      shipping: 20.00,
      tax: 0.00,
      items: [
        { name: "4K Webcam for Streaming", quantity: 1, price: 199.99 },
        { name: "USB-C Hub - 7 in 1", quantity: 1, price: 79.99 }
      ],
      shippingAddress: {
        name: "Diya Shingala",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: "addr-1",
      type: "shipping",
      firstName: "Diya",
      lastName: "Shingala",
      company: "",
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: "addr-2",
      type: "billing",
      firstName: "John",
      lastName: "Doe",
      company: "Tech Corp",
      street: "456 Business Ave",
      apartment: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm-1",
      type: "visa",
      lastFour: "4242",
      expiryMonth: "12",
      expiryYear: "2027",
      cardholderName: "John Doe",
      isDefault: true
    },
    {
      id: "pm-2",
      type: "mastercard",
      lastFour: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      cardholderName: "John Doe",
      isDefault: false
    }
  ]);

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisible: false,
      shareOrderHistory: true,
      allowAnalytics: true
    },
    display: {
      theme: "light",
      language: "en",
      currency: "USD"
    },
    shopping: {
      saveCart: true,
      quickReorder: true,
      personalizedRecommendations: true
    },
    security: {
      twoFactorAuth: false,
      loginNotifications: true,
      sessionTimeout: true
    }
  });

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: 'User', description: 'Personal Information' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingBag', description: 'Order History' },
    { id: 'addresses', label: 'Addresses', icon: 'MapPin', description: 'Shipping & Billing' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard', description: 'Payment Methods' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings', description: 'Account Settings' },
    { id: 'security', label: 'Security', icon: 'Shield', description: 'Security Settings' }
  ];

  // Handlers
  const handleUpdateProfile = async (profileData) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserProfile(profileData);
  };

  const handleReorder = async (orderId) => {
    // Mock reorder functionality
    console.log('Reordering:', orderId);
    navigate('/shopping-cart');
  };

  const handleTrackOrder = (trackingNumber) => {
    // Mock tracking functionality
    window.open(`https://www.ups.com/track?tracknum=${trackingNumber}`, '_blank');
  };

  const handleAddAddress = async (addressData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newAddress = {
      ...addressData,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const handleUpdateAddress = async (addressId, addressData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAddresses(prev => prev?.map(addr => 
      addr?.id === addressId ? { ...addressData, id: addressId } : addr
    ));
  };

  const handleDeleteAddress = async (addressId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
  };

  const handleSetDefaultAddress = async (addressId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setAddresses(prev => prev?.map(addr => ({
      ...addr,
      isDefault: addr?.id === addressId
    })));
  };

  const handleAddPaymentMethod = async (paymentData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPaymentMethod = {
      ...paymentData,
      id: `pm-${Date.now()}`,
      type: 'visa', // Mock detection
      lastFour: paymentData?.cardNumber?.slice(-4)
    };
    setPaymentMethods(prev => [...prev, newPaymentMethod]);
  };

  const handleDeletePaymentMethod = async (paymentMethodId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setPaymentMethods(prev => prev?.filter(pm => pm?.id !== paymentMethodId));
  };

  const handleSetDefaultPaymentMethod = async (paymentMethodId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setPaymentMethods(prev => prev?.map(pm => ({
      ...pm,
      isDefault: pm?.id === paymentMethodId
    })));
  };

  const handleUpdatePreferences = async (newPreferences) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPreferences(newPreferences);
  };

  const handleChangePassword = async (passwordData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock password change - in real app, would validate current password
    if (passwordData?.currentPassword !== 'currentpass123') {
      throw new Error('Current password is incorrect');
    }
  };

  const handleDeleteAccount = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Mock account deletion
    alert('Account deleted successfully');
    navigate('/home-page');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'orders':
        return (
          <OrderHistorySection
            orders={orders}
            onReorder={handleReorder}
            onTrackOrder={handleTrackOrder}
          />
        );
      case 'addresses':
        return (
          <AddressBookSection
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        );
      case 'payments':
        return (
          <PaymentMethodsSection
            paymentMethods={paymentMethods}
            onAddPaymentMethod={handleAddPaymentMethod}
            onDeletePaymentMethod={handleDeletePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        );
      case 'preferences':
        return (
          <PreferencesSection
            preferences={preferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'security':
        return (
          <SecuritySection
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return null;
    }
  };

  // Close mobile sidebar when tab changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader 
        cartItemCount={cartItemCount}
        isAuthenticated={isAuthenticated}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Account</h1>
                <p className="text-muted-foreground">Manage your profile and account settings</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Navigation Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setIsMobileSidebarOpen(true)}
                iconName="Menu"
                iconPosition="left"
                fullWidth
              >
                Account Menu
              </Button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`lg:w-64 lg:flex-shrink-0 ${isMobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Mobile Overlay */}
              {isMobileSidebarOpen && (
                <div 
                  className="lg:hidden fixed inset-0 z-1000 bg-black/50"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
              )}
              
              {/* Sidebar Content */}
              <div className={`lg:sticky lg:top-24 ${
                isMobileSidebarOpen 
                  ? 'fixed inset-y-0 left-0 z-1100 w-64 bg-card border-r border-border shadow-elevated' 
                  : 'bg-card rounded-lg border border-border'
              } p-4`}>
                {/* Mobile Close Button */}
                {isMobileSidebarOpen && (
                  <div className="lg:hidden flex justify-end mb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <Icon name="X" size={20} />
                    </Button>
                  </div>
                )}

                <nav className="space-y-2">
                  {navigationItems?.map((item) => (
                    <button
                      key={item?.id}
                      onClick={() => setActiveTab(item?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${
                        activeTab === item?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item?.label}</div>
                        <div className="text-xs opacity-75">{item?.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* User Info */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {userProfile?.firstName} {userProfile?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userProfile?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {renderActiveSection()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileOrderHistory;