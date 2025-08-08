import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [authMethod, setAuthMethod] = useState('login'); // 'login' or 'register'

  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/home-page';

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!loginData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(loginData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginData?.password) {
      newErrors.password = 'Password is required';
    } else if (loginData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock authentication API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authentication logic
      if (loginData?.email === 'demo@example.com' && loginData?.password === 'password') {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', loginData?.email);
        
        // Redirect to the originally requested page or home
        navigate(from, { replace: true });
      } else {
        // Invalid credentials
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        general: 'Login failed. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', loginData?.email);
      
      // Redirect to home or originally requested page
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        general: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // Mock social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      navigate(from, { replace: true });
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      setErrors({
        general: `${provider} login failed. Please try again.`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    // Mock forgot password API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader cartItemCount={0} />
      
      <div className="pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="User" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              {authMethod === 'login' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {authMethod === 'login' ?'Welcome back! Please sign in to your account' :'Join us today and start shopping'
              }
            </p>
          </div>

          {/* Demo Credentials Notice */}
          {authMethod === 'login' && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Demo Account</p>
                  <p className="text-muted-foreground">
                    Email: demo@example.com<br />
                    Password: password
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errors?.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <p className="text-sm text-destructive">{errors?.general}</p>
              </div>
            </div>
          )}

          <div className="bg-card rounded-lg border border-border p-6 space-y-6">
            {/* Social Login */}
            <SocialLogin
              onSocialLogin={handleSocialLogin}
              isLoading={isLoading}
            />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">or continue with email</span>
              </div>
            </div>

            {/* Login/Register Form */}
            <LoginForm
              authMethod={authMethod}
              loginData={loginData}
              errors={errors}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onSubmit={authMethod === 'login' ? handleLogin : handleRegister}
              onForgotPassword={() => setShowForgotPassword(true)}
            />

            {/* Switch Auth Method */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {authMethod === 'login' ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <button
                  onClick={() => setAuthMethod(authMethod === 'login' ? 'register' : 'login')}
                  className="text-primary hover:underline font-medium"
                  disabled={isLoading}
                >
                  {authMethod === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Continue as Guest */}
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => navigate(from)}
                disabled={isLoading}
                className="text-sm"
              >
                Continue as Guest
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-xs text-muted-foreground">Secure Login</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Users" size={20} className="text-success" />
                <span className="text-xs text-muted-foreground">Trusted by 50K+</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Icon name="Lock" size={20} className="text-success" />
                <span className="text-xs text-muted-foreground">Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPassword}
      />
    </div>
  );
};

export default LoginPage;