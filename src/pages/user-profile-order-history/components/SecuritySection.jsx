import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySection = ({ onChangePassword, onDeleteAccount }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handlePasswordInputChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordData?.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    try {
      await onChangePassword(passwordData);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    } catch (error) {
      setErrors({ currentPassword: 'Current password is incorrect' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsChangingPassword(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }
    
    setIsLoading(true);
    try {
      await onDeleteAccount();
    } catch (error) {
      console.error('Failed to delete account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { label: 'Weak', color: 'text-destructive' };
      case 2:
      case 3: return { label: 'Medium', color: 'text-warning' };
      case 4:
      case 5: return { label: 'Strong', color: 'text-success' };
      default: return { label: 'Weak', color: 'text-destructive' };
    }
  };

  const passwordStrength = getPasswordStrength(passwordData?.newPassword);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Shield" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account security</p>
        </div>
      </div>
      <div className="space-y-8">
        {/* Password Section */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2 text-primary" />
            Password
          </h3>
          
          {!isChangingPassword ? (
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsChangingPassword(true)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Change Password
                </Button>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-4 space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData?.currentPassword}
                onChange={handlePasswordInputChange}
                error={errors?.currentPassword}
                required
              />
              
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData?.newPassword}
                onChange={handlePasswordInputChange}
                error={errors?.newPassword}
                description="Must be at least 8 characters with uppercase, lowercase, and number"
                required
              />
              
              {passwordData?.newPassword && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Strength:</span>
                  <span className={`text-sm font-medium ${strengthInfo?.color}`}>
                    {strengthInfo?.label}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength <= 1 ? 'bg-destructive' :
                        passwordStrength <= 3 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={handlePasswordInputChange}
                error={errors?.confirmPassword}
                required
              />
              
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleCancelPasswordChange}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleChangePassword}
                  loading={isLoading}
                  iconName="Save"
                  iconPosition="left"
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Smartphone" size={20} className="mr-2 text-primary" />
            Two-Factor Authentication
          </h3>
          
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">2FA Status</p>
                <p className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1 text-warning" />
                    Not enabled - Add extra security to your account
                  </span>
                </p>
              </div>
              <Button
                variant="outline"
                iconName="Shield"
                iconPosition="left"
              >
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>

        {/* Login Sessions */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Monitor" size={20} className="mr-2 text-primary" />
            Active Sessions
          </h3>
          
          <div className="border border-border rounded-lg divide-y divide-border">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Monitor" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Current Session</p>
                    <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                    <p className="text-xs text-muted-foreground">Last active: Now</p>
                  </div>
                </div>
                <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Smartphone" size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Mobile App</p>
                    <p className="text-sm text-muted-foreground">iPhone • New York, NY</p>
                    <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="text-lg font-medium text-destructive mb-4 flex items-center">
            <Icon name="AlertTriangle" size={20} className="mr-2 text-destructive" />
            Danger Zone
          </h3>
          
          <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-foreground mb-4">
                Are you sure you want to delete your account? All your data, including orders, addresses, and preferences will be permanently removed.
              </p>
              
              <Input
                label="Type 'DELETE' to confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e?.target?.value)}
                placeholder="DELETE"
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                loading={isLoading}
                disabled={deleteConfirmText !== 'DELETE'}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;