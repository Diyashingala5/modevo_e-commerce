import React from 'react';
import Input from '../../../components/ui/Input';


const ShippingSection = ({
  shippingData,
  deliveryOptions,
  selectedDelivery,
  errors,
  onInputChange,
  onDeliveryChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Shipping Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={shippingData?.email}
            onChange={(e) => onInputChange('shipping', 'email', e?.target?.value)}
            error={errors?.email}
            required
            placeholder="john@example.com"
          />
          
          <div />
          
          <Input
            label="First Name"
            value={shippingData?.firstName}
            onChange={(e) => onInputChange('shipping', 'firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            placeholder="John"
          />
          
          <Input
            label="Last Name"
            value={shippingData?.lastName}
            onChange={(e) => onInputChange('shipping', 'lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            placeholder="Doe"
          />
          
          <div className="sm:col-span-2">
            <Input
              label="Company (Optional)"
              value={shippingData?.company}
              onChange={(e) => onInputChange('shipping', 'company', e?.target?.value)}
              placeholder="Your Company"
            />
          </div>
          
          <div className="sm:col-span-2">
            <Input
              label="Address"
              value={shippingData?.address}
              onChange={(e) => onInputChange('shipping', 'address', e?.target?.value)}
              error={errors?.address}
              required
              placeholder="123 Main Street"
            />
          </div>
          
          <div className="sm:col-span-2">
            <Input
              label="Apartment, suite, etc. (Optional)"
              value={shippingData?.apartment}
              onChange={(e) => onInputChange('shipping', 'apartment', e?.target?.value)}
              placeholder="Apt 4B"
            />
          </div>
          
          <Input
            label="City"
            value={shippingData?.city}
            onChange={(e) => onInputChange('shipping', 'city', e?.target?.value)}
            error={errors?.city}
            required
            placeholder="New York"
          />
          
          <Input
            label="State"
            value={shippingData?.state}
            onChange={(e) => onInputChange('shipping', 'state', e?.target?.value)}
            error={errors?.state}
            required
            placeholder="NY"
          />
          
          <Input
            label="ZIP Code"
            value={shippingData?.zipCode}
            onChange={(e) => onInputChange('shipping', 'zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
            placeholder="10001"
          />
          
          <Input
            label="Phone (Optional)"
            type="tel"
            value={shippingData?.phone}
            onChange={(e) => onInputChange('shipping', 'phone', e?.target?.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={shippingData?.saveAddress}
              onChange={(e) => onInputChange('shipping', 'saveAddress', e?.target?.checked)}
            />
            <span className="text-sm text-foreground">Save this address for future orders</span>
          </label>
        </div>
      </div>
      {/* Delivery Options */}
      <div className="border-t border-border pt-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Delivery Options</h4>
        
        <div className="space-y-3">
          {deliveryOptions?.map((option) => (
            <label
              key={option?.id}
              className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-smooth ${
                selectedDelivery === option?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Input
                  type="radio"
                  name="delivery"
                  value={option?.id}
                  checked={selectedDelivery === option?.id}
                  onChange={() => onDeliveryChange(option?.id)}
                />
                <div>
                  <div className="font-medium text-foreground">{option?.name}</div>
                  <div className="text-sm text-muted-foreground">{option?.duration}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">
                  {option?.price === 0 ? 'Free' : `$${option?.price?.toFixed(2)}`}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingSection;