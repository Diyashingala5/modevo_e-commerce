import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      className: 'border-border hover:bg-muted'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Smartphone',
      className: 'border-border hover:bg-muted'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialLogin(provider?.id)}
          disabled={isLoading}
          iconName={provider?.icon}
          iconPosition="left"
          className={provider?.className}
        >
          Continue with {provider?.name}
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;