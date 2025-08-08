import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderStats = ({ stats }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: formatNumber(stats?.totalOrders),
      change: stats?.ordersChange,
      icon: 'ShoppingBag',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Pending Orders',
      value: formatNumber(stats?.pendingOrders),
      change: stats?.pendingChange,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Revenue',
      value: formatCurrency(stats?.totalRevenue),
      change: stats?.revenueChange,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Avg Order Value',
      value: formatCurrency(stats?.avgOrderValue),
      change: stats?.avgOrderChange,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
          
          {stat?.change && (
            <div className="flex items-center mt-4">
              <Icon 
                name={stat?.change > 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={stat?.change > 0 ? "text-success" : "text-destructive"}
              />
              <span className={`text-sm font-medium ml-1 ${
                stat?.change > 0 ? "text-success" : "text-destructive"
              }`}>
                {Math.abs(stat?.change)}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                vs last month
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderStats;