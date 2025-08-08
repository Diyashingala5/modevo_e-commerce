import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
            <p className="text-sm text-muted-foreground">Manage your personal details</p>
          </div>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          name="firstName"
          value={formData?.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.firstName}
          required
        />
        
        <Input
          label="Last Name"
          name="lastName"
          value={formData?.lastName}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.lastName}
          required
        />
        
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData?.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.email}
          required
        />
        
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData?.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.phone}
          required
        />
        
        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        
        <Input
          label="Gender"
          name="gender"
          value={formData?.gender}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      </div>
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      )}
      {/* Account Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{userProfile?.totalOrders}</div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">${userProfile?.totalSpent}</div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{userProfile?.loyaltyPoints}</div>
          <div className="text-sm text-muted-foreground">Loyalty Points</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{userProfile?.memberSince}</div>
          <div className="text-sm text-muted-foreground">Member Since</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;