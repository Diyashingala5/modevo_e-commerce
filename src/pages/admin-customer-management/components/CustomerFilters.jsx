import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CustomerFilters = ({ customers, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    registrationDateRange: 'all',
    orderCountRange: 'all',
    spentAmountRange: 'all',
    lastLoginRange: 'all'
  });

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters, [filterKey]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      registrationDateRange: 'all',
      orderCountRange: 'all',
      spentAmountRange: 'all',
      lastLoginRange: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsExpanded(true)}
        iconName="Filter"
        iconPosition="left"
        className="whitespace-nowrap"
      >
        More Filters
        {hasActiveFilters && (
          <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
            {Object.values(filters).filter(filter => filter !== 'all').length}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div className="bg-muted/30 rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Icon name="Filter" size={16} />
          Advanced Filters
        </h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Registration Date
          </label>
          <Select
            value={filters.registrationDateRange}
            onValueChange={(value) => handleFilterChange('registrationDateRange', value)}
            className="text-sm"
          >
            <option value="all">All Time</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="thisyear">This Year</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Order Count
          </label>
          <Select
            value={filters.orderCountRange}
            onValueChange={(value) => handleFilterChange('orderCountRange', value)}
            className="text-sm"
          >
            <option value="all">Any Amount</option>
            <option value="0">No Orders</option>
            <option value="1-5">1-5 Orders</option>
            <option value="6-10">6-10 Orders</option>
            <option value="11-20">11-20 Orders</option>
            <option value="20+">20+ Orders</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Amount Spent
          </label>
          <Select
            value={filters.spentAmountRange}
            onValueChange={(value) => handleFilterChange('spentAmountRange', value)}
            className="text-sm"
          >
            <option value="all">Any Amount</option>
            <option value="0">$0</option>
            <option value="1-100">$1-$100</option>
            <option value="101-500">$101-$500</option>
            <option value="501-1000">$501-$1,000</option>
            <option value="1000+">$1,000+</option>
          </Select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2">
            Last Login
          </label>
          <Select
            value={filters.lastLoginRange}
            onValueChange={(value) => handleFilterChange('lastLoginRange', value)}
            className="text-sm"
          >
            <option value="all">Any Time</option>
            <option value="never">Never</option>
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="30+days">30+ Days Ago</option>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value === 'all') return null;
              
              const labelMap = {
                registrationDateRange: 'Registration',
                orderCountRange: 'Orders',
                spentAmountRange: 'Spent',
                lastLoginRange: 'Last Login'
              };

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 rounded-md px-2 py-1 text-xs"
                >
                  {labelMap[key]}: {value}
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;
