import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OrderHistorySection = ({ orders, onReorder, onTrackOrder }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const statusColors = {
    'pending': 'bg-warning/10 text-warning border-warning/20',
    'processing': 'bg-primary/10 text-primary border-primary/20',
    'shipped': 'bg-accent/10 text-accent border-accent/20',
    'delivered': 'bg-success/10 text-success border-success/20',
    'cancelled': 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders?.length },
    { value: 'pending', label: 'Pending', count: orders?.filter(o => o?.status === 'pending')?.length },
    { value: 'processing', label: 'Processing', count: orders?.filter(o => o?.status === 'processing')?.length },
    { value: 'shipped', label: 'Shipped', count: orders?.filter(o => o?.status === 'shipped')?.length },
    { value: 'delivered', label: 'Delivered', count: orders?.filter(o => o?.status === 'delivered')?.length }
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders?.filter(order => order?.status === selectedFilter);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="ShoppingBag" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Order History</h2>
            <p className="text-sm text-muted-foreground">Track and manage your orders</p>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedFilter(option?.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedFilter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {option?.label}
            {option?.count > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-background/20">
                {option?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Package" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedFilter === 'all' ? "You haven't placed any orders yet." 
                : `No ${selectedFilter} orders found.`}
            </p>
            <Button onClick={() => window.location.href = '/home-page'}>
              Start Shopping
            </Button>
          </div>
        ) : (
          filteredOrders?.map((order) => (
            <div key={order?.id} className="border border-border rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="p-4 bg-muted/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Order #{order?.orderNumber}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order?.orderDate)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors?.[order?.status]}`}>
                      {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{formatCurrency(order?.total)}</div>
                      <div className="text-sm text-muted-foreground">{order?.items?.length} items</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleOrderExpansion(order?.id)}
                    >
                      <Icon 
                        name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Details (Expandable) */}
              {expandedOrder === order?.id && (
                <div className="p-4 border-t border-border">
                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    {order?.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name="Package" size={24} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{item?.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item?.quantity} • {formatCurrency(item?.price)} each
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-foreground">
                            {formatCurrency(item?.price * item?.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p>{order?.shippingAddress?.name}</p>
                        <p>{order?.shippingAddress?.street}</p>
                        <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Order Summary</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="text-foreground">{formatCurrency(order?.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping:</span>
                          <span className="text-foreground">{formatCurrency(order?.shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax:</span>
                          <span className="text-foreground">{formatCurrency(order?.tax)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-1 border-t border-border">
                          <span className="text-foreground">Total:</span>
                          <span className="text-foreground">{formatCurrency(order?.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {order?.trackingNumber && (
                      <Button
                        variant="outline"
                        onClick={() => onTrackOrder(order?.trackingNumber)}
                        iconName="Truck"
                        iconPosition="left"
                      >
                        Track Package
                      </Button>
                    )}
                    
                    {order?.status === 'delivered' && (
                      <Button
                        variant="outline"
                        onClick={() => onReorder(order?.id)}
                        iconName="RotateCcw"
                        iconPosition="left"
                      >
                        Reorder
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Invoice
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistorySection;