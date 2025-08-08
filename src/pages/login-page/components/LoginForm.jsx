import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({
  authMethod,
  loginData,
  errors,
  isLoading,
  onInputChange,
  onSubmit,
  onForgotPassword
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Email Address"
        type="email"
        value={loginData?.email}
        onChange={(e) => onInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
        placeholder="Enter your email"
        disabled={isLoading}
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginData?.password}
          onChange={(e) => onInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
          placeholder={authMethod === 'login' ? 'Enter your password' : 'Create a password'}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
          disabled={isLoading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>
      {authMethod === 'register' && (
        <div className="text-sm text-muted-foreground">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li className={loginData?.password?.length >= 6 ? 'text-success' : ''}>
              At least 6 characters
            </li>
            <li className={/[A-Z]/?.test(loginData?.password) ? 'text-success' : ''}>
              One uppercase letter
            </li>
            <li className={/[0-9]/?.test(loginData?.password) ? 'text-success' : ''}>
              One number
            </li>
          </ul>
        </div>
      )}
      {authMethod === 'login' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={loginData?.rememberMe}
              onChange={(e) => onInputChange('rememberMe', e?.target?.checked)}
              disabled={isLoading}
            />
            <span className="text-sm text-foreground">Remember me</span>
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:underline"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>
      )}
      {authMethod === 'register' && (
        <div className="space-y-3">
          <label className="flex items-start space-x-2">
            <Input
              type="checkbox"
              required
              disabled={isLoading}
              className="mt-1"
            />
            <span className="text-sm text-foreground">
              I agree to the <button type="button" className="text-primary hover:underline">Terms of Service</button> and <button type="button" className="text-primary hover:underline">Privacy Policy</button>
            </span>
          </label>

          <label className="flex items-start space-x-2">
            <Input
              type="checkbox"
              disabled={isLoading}
              className="mt-1"
            />
            <span className="text-sm text-foreground">
              I would like to receive marketing emails and special offers
            </span>
          </label>
        </div>
      )}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        iconName={authMethod === 'login' ? 'LogIn' : 'UserPlus'}
        iconPosition="left"
      >
        {authMethod === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  );
};

export default LoginForm;