import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStatusBadge = ({ status, size = 'default', showIcon = true }) => {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: 'Clock',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20'
    },
    processing: {
      label: 'Processing',
      icon: 'Package',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      borderColor: 'border-primary/20'
    },
    shipped: {
      label: 'Shipped',
      icon: 'Truck',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
      borderColor: 'border-accent/20'
    },
    delivered: {
      label: 'Delivered',
      icon: 'CheckCircle',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    cancelled: {
      label: 'Cancelled',
      icon: 'XCircle',
      bgColor: 'bg-destructive/10',
      textColor: 'text-destructive',
      borderColor: 'border-destructive/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16
  };

  return (
    <span className={`
      inline-flex items-center space-x-1.5 font-medium rounded-full border
      ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
      ${sizeClasses?.[size]}
    `}>
      {showIcon && (
        <Icon 
          name={config?.icon} 
          size={iconSizes?.[size]} 
          className={config?.textColor}
        />
      )}
      <span>{config?.label}</span>
    </span>
  );
};

export default OrderStatusBadge;