import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import OrderStatusBadge from './OrderStatusBadge';
import Image from '../../../components/AppImage';

const OrderDetailModal = ({ order, isOpen, onClose, onStatusUpdate }) => {
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!isOpen || !order) return null;

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = () => {
    if (newStatus) {
      onStatusUpdate(order?.id, newStatus);
      setNewStatus('');
    }
  };

  const handleAddNote = () => {
    if (notes?.trim()) {
      // In a real app, this would call an API to add the note
      console.log('Adding note:', notes);
      setNotes('');
    }
  };

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-elevated max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              Order #{order?.id}
            </h2>
            <OrderStatusBadge status={order?.status} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Customer Information</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">{order?.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order?.customerEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{order?.customerPhone}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Order Details</h3>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Order Date:</span>
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(order?.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Method:</span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {order?.paymentMethod?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Amount:</span>
                    <span className="text-lg font-semibold text-primary">
                      {formatCurrency(order?.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Shipping Address</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
                  <div className="text-sm text-foreground">
                    <div>{order?.shippingAddress?.street}</div>
                    <div>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</div>
                    <div>{order?.shippingAddress?.country}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Order Items</h3>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="divide-y divide-border">
                  {order?.items?.map((item, index) => (
                    <div key={index} className="p-4 flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{item?.name}</h4>
                        <p className="text-sm text-muted-foreground">{item?.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-muted-foreground">
                            Qty: {item?.quantity}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {formatCurrency(item?.price)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-foreground">
                          {formatCurrency(item?.price * item?.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Update */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Update Status</h3>
                <div className="space-y-3">
                  <Select
                    label="New Status"
                    options={statusOptions}
                    value={newStatus}
                    onChange={setNewStatus}
                    placeholder="Select new status"
                  />
                  <Button
                    onClick={handleStatusUpdate}
                    disabled={!newStatus}
                    iconName="RefreshCw"
                    iconPosition="left"
                    className="w-full"
                  >
                    Update Status
                  </Button>
                </div>
              </div>

              {/* Tracking Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">Tracking Information</h3>
                <div className="space-y-3">
                  <Input
                    label="Tracking Number"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e?.target?.value)}
                  />
                  <Button
                    variant="outline"
                    iconName="Truck"
                    iconPosition="left"
                    className="w-full"
                  >
                    Add Tracking
                  </Button>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Order Notes</h3>
              <div className="space-y-3">
                <Input
                  label="Add Note"
                  placeholder="Enter order note or customer communication"
                  value={notes}
                  onChange={(e) => setNotes(e?.target?.value)}
                />
                <Button
                  onClick={handleAddNote}
                  disabled={!notes?.trim()}
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Note
                </Button>
              </div>
              
              {/* Existing Notes */}
              <div className="space-y-2">
                {order?.notes && order?.notes?.map((note, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{note?.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(note?.createdAt)}</span>
                    </div>
                    <p className="text-sm text-foreground">{note?.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
            >
              Print Invoice
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Download PDF
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="destructive"
              iconName="RefundIcon"
              iconPosition="left"
            >
              Process Refund
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;