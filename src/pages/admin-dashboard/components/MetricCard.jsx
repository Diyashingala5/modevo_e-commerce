import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'primary',
  loading = false 
}) => {
  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    };
    return colors?.[color] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-success' : 'text-error';
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-8 w-8 bg-muted rounded"></div>
          </div>
          <div className="h-8 bg-muted rounded w-20 mb-2"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle hover:shadow-elevated transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
              className={getChangeColor(changeType)}
            />
            <span className={`text-sm font-medium ${getChangeColor(changeType)}`}>
              {change}
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;