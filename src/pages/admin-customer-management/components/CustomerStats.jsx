import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerStats = ({ customers }) => {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'inactive').length;
  const suspendedCustomers = customers.filter(c => c.status === 'suspended').length;
  
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
  
  const newCustomersThisMonth = customers.filter(customer => {
    const registrationDate = new Date(customer.registrationDate);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return registrationDate.getMonth() === currentMonth && registrationDate.getFullYear() === currentYear;
  }).length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers.toLocaleString(),
      change: `+${newCustomersThisMonth} this month`,
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-primary',
    },
    {
      title: 'Active Customers',
      value: activeCustomers.toLocaleString(),
      change: `${((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total`,
      changeType: 'neutral',
      icon: 'UserCheck',
      color: 'bg-success',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      change: `${formatCurrency(averageOrderValue)} avg per customer`,
      changeType: 'neutral',
      icon: 'DollarSign',
      color: 'bg-warning',
    },
    {
      title: 'New This Month',
      value: newCustomersThisMonth.toLocaleString(),
      change: suspendedCustomers > 0 ? `${suspendedCustomers} suspended` : 'No suspensions',
      changeType: suspendedCustomers > 0 ? 'negative' : 'positive',
      icon: 'UserPlus',
      color: 'bg-accent',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className={`text-xs font-medium ${
                stat.changeType === 'positive' 
                  ? 'text-success' 
                  : stat.changeType === 'negative' 
                    ? 'text-destructive' 
                    : 'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center flex-shrink-0`}>
              <Icon name={stat.icon} size={24} color="white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;
