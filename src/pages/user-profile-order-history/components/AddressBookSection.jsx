import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressBookSection = ({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress, onSetDefault }) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'shipping',
    firstName: '',
    lastName: '',
    company: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.street?.trim()) newErrors.street = 'Street address is required';
    if (!formData?.city?.trim()) newErrors.city = 'City is required';
    if (!formData?.state?.trim()) newErrors.state = 'State is required';
    if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      if (editingAddress) {
        await onUpdateAddress(editingAddress?.id, formData);
        setEditingAddress(null);
      } else {
        await onAddAddress(formData);
        setIsAddingAddress(false);
      }
      resetForm();
    } catch (error) {
      console.error('Failed to save address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setIsAddingAddress(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsAddingAddress(false);
    setEditingAddress(null);
  };

  const resetForm = () => {
    setFormData({
      type: 'shipping',
      firstName: '',
      lastName: '',
      company: '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
      isDefault: false
    });
    setErrors({});
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await onDeleteAddress(addressId);
      } catch (error) {
        console.error('Failed to delete address:', error);
      }
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Address Book</h2>
            <p className="text-sm text-muted-foreground">Manage your shipping and billing addresses</p>
          </div>
        </div>
        
        {!isAddingAddress && !editingAddress && (
          <Button
            onClick={() => setIsAddingAddress(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Address
          </Button>
        )}
      </div>
      {/* Add/Edit Address Form */}
      {(isAddingAddress || editingAddress) && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="shipping"
                    checked={formData?.type === 'shipping'}
                    onChange={handleInputChange}
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">Shipping Address</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value="billing"
                    checked={formData?.type === 'billing'}
                    onChange={handleInputChange}
                    className="text-primary"
                  />
                  <span className="text-sm text-foreground">Billing Address</span>
                </label>
              </div>
            </div>
            
            <Input
              label="First Name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              error={errors?.firstName}
              required
            />
            
            <Input
              label="Last Name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              error={errors?.lastName}
              required
            />
            
            <div className="md:col-span-2">
              <Input
                label="Company (Optional)"
                name="company"
                value={formData?.company}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                name="street"
                value={formData?.street}
                onChange={handleInputChange}
                error={errors?.street}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label="Apartment, suite, etc. (Optional)"
                name="apartment"
                value={formData?.apartment}
                onChange={handleInputChange}
              />
            </div>
            
            <Input
              label="City"
              name="city"
              value={formData?.city}
              onChange={handleInputChange}
              error={errors?.city}
              required
            />
            
            <Input
              label="State"
              name="state"
              value={formData?.state}
              onChange={handleInputChange}
              error={errors?.state}
              required
            />
            
            <Input
              label="ZIP Code"
              name="zipCode"
              value={formData?.zipCode}
              onChange={handleInputChange}
              error={errors?.zipCode}
              required
            />
            
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              required
            />
            
            <div className="md:col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData?.isDefault}
                  onChange={handleInputChange}
                  className="text-primary"
                />
                <span className="text-sm text-foreground">Set as default address</span>
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
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </div>
        </div>
      )}
      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.map((address) => (
          <div key={address?.id} className="border border-border rounded-lg p-4 relative">
            {address?.isDefault && (
              <div className="absolute top-2 right-2">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={address?.type === 'shipping' ? 'Truck' : 'CreditCard'} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="text-sm font-medium text-primary capitalize">
                  {address?.type} Address
                </span>
              </div>
            </div>
            
            <div className="text-sm text-foreground space-y-1">
              <p className="font-medium">{address?.firstName} {address?.lastName}</p>
              {address?.company && <p>{address?.company}</p>}
              <p>{address?.street}</p>
              {address?.apartment && <p>{address?.apartment}</p>}
              <p>{address?.city}, {address?.state} {address?.zipCode}</p>
              <p>{address?.phone}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(address)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(address?.id)}
                  iconName="Trash2"
                  iconPosition="left"
                  className="text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>
              
              {!address?.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSetDefault(address?.id)}
                >
                  Set Default
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {addresses?.length === 0 && !isAddingAddress && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-4">Add your first address to speed up checkout</p>
          <Button onClick={() => setIsAddingAddress(true)}>
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressBookSection;