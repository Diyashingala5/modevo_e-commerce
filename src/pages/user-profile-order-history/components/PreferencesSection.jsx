import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreferencesSection = ({ preferences, onUpdatePreferences }) => {
  const [formData, setFormData] = useState(preferences);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (category, key) => {
    const newFormData = {
      ...formData,
      [category]: {
        ...formData?.[category],
        [key]: !formData?.[category]?.[key]
      }
    };
    setFormData(newFormData);
    setHasChanges(true);
  };

  const handleSelectChange = (category, key, value) => {
    const newFormData = {
      ...formData,
      [category]: {
        ...formData?.[category],
        [key]: value
      }
    };
    setFormData(newFormData);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdatePreferences(formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(preferences);
    setHasChanges(false);
  };

  const PreferenceToggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground">{label}</h4>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const PreferenceSelect = ({ label, description, value, options, onChange }) => (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">{label}</h4>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Settings" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your account settings</p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Bell" size={20} className="mr-2 text-primary" />
            Notifications
          </h3>
          <div className="space-y-1 border border-border rounded-lg p-4">
            <PreferenceToggle
              label="Email Notifications"
              description="Receive order updates and promotional emails"
              checked={formData?.notifications?.email}
              onChange={() => handleToggle('notifications', 'email')}
            />
            <PreferenceToggle
              label="SMS Notifications"
              description="Get text messages for order status updates"
              checked={formData?.notifications?.sms}
              onChange={() => handleToggle('notifications', 'sms')}
            />
            <PreferenceToggle
              label="Push Notifications"
              description="Receive browser notifications for important updates"
              checked={formData?.notifications?.push}
              onChange={() => handleToggle('notifications', 'push')}
            />
            <PreferenceToggle
              label="Marketing Communications"
              description="Receive promotional offers and product recommendations"
              checked={formData?.notifications?.marketing}
              onChange={() => handleToggle('notifications', 'marketing')}
            />
          </div>
        </div>

        {/* Privacy Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Shield" size={20} className="mr-2 text-primary" />
            Privacy
          </h3>
          <div className="space-y-1 border border-border rounded-lg p-4">
            <PreferenceToggle
              label="Profile Visibility"
              description="Allow other users to see your profile information"
              checked={formData?.privacy?.profileVisible}
              onChange={() => handleToggle('privacy', 'profileVisible')}
            />
            <PreferenceToggle
              label="Order History Sharing"
              description="Share purchase history for better recommendations"
              checked={formData?.privacy?.shareOrderHistory}
              onChange={() => handleToggle('privacy', 'shareOrderHistory')}
            />
            <PreferenceToggle
              label="Analytics Tracking"
              description="Help improve our service by sharing usage data"
              checked={formData?.privacy?.allowAnalytics}
              onChange={() => handleToggle('privacy', 'allowAnalytics')}
            />
          </div>
        </div>

        {/* Display Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Monitor" size={20} className="mr-2 text-primary" />
            Display
          </h3>
          <div className="space-y-4 border border-border rounded-lg p-4">
            <PreferenceSelect
              label="Theme"
              description="Choose your preferred color scheme"
              value={formData?.display?.theme}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System Default' }
              ]}
              onChange={(value) => handleSelectChange('display', 'theme', value)}
            />
            <PreferenceSelect
              label="Language"
              description="Select your preferred language"
              value={formData?.display?.language}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' }
              ]}
              onChange={(value) => handleSelectChange('display', 'language', value)}
            />
            <PreferenceSelect
              label="Currency"
              description="Choose your preferred currency for pricing"
              value={formData?.display?.currency}
              options={[
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'GBP', label: 'British Pound (GBP)' },
                { value: 'CAD', label: 'Canadian Dollar (CAD)' }
              ]}
              onChange={(value) => handleSelectChange('display', 'currency', value)}
            />
          </div>
        </div>

        {/* Shopping Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="ShoppingCart" size={20} className="mr-2 text-primary" />
            Shopping
          </h3>
          <div className="space-y-1 border border-border rounded-lg p-4">
            <PreferenceToggle
              label="Save Items for Later"
              description="Automatically save cart items when you leave"
              checked={formData?.shopping?.saveCart}
              onChange={() => handleToggle('shopping', 'saveCart')}
            />
            <PreferenceToggle
              label="Quick Reorder"
              description="Enable one-click reordering for previous purchases"
              checked={formData?.shopping?.quickReorder}
              onChange={() => handleToggle('shopping', 'quickReorder')}
            />
            <PreferenceToggle
              label="Personalized Recommendations"
              description="Show product suggestions based on your browsing history"
              checked={formData?.shopping?.personalizedRecommendations}
              onChange={() => handleToggle('shopping', 'personalizedRecommendations')}
            />
          </div>
        </div>

        {/* Security Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2 text-primary" />
            Security
          </h3>
          <div className="space-y-1 border border-border rounded-lg p-4">
            <PreferenceToggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={formData?.security?.twoFactorAuth}
              onChange={() => handleToggle('security', 'twoFactorAuth')}
            />
            <PreferenceToggle
              label="Login Notifications"
              description="Get notified when someone logs into your account"
              checked={formData?.security?.loginNotifications}
              onChange={() => handleToggle('security', 'loginNotifications')}
            />
            <PreferenceToggle
              label="Session Timeout"
              description="Automatically log out after 30 minutes of inactivity"
              checked={formData?.security?.sessionTimeout}
              onChange={() => handleToggle('security', 'sessionTimeout')}
            />
          </div>
        </div>
      </div>
      {/* Save Changes */}
      {hasChanges && (
        <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset Changes
          </Button>
          <Button
            onClick={handleSave}
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;