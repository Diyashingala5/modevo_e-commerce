import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({ onFiltersChange, totalOrders = 0 }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    customer: '',
    minAmount: '',
    maxAmount: '',
    paymentMethod: 'all'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Payment Methods' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'bank_transfer', label: 'Bank Transfer' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'all',
      status: 'all',
      customer: '',
      minAmount: '',
      maxAmount: '',
      paymentMethod: 'all'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.dateRange !== 'all') count++;
    if (filters?.status !== 'all') count++;
    if (filters?.customer) count++;
    if (filters?.minAmount || filters?.maxAmount) count++;
    if (filters?.paymentMethod !== 'all') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Order Filters</h3>
          <span className="text-sm text-muted-foreground">
            {totalOrders} total orders
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />

          <Select
            label="Order Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Input
            label="Customer Search"
            type="search"
            placeholder="Search by name or email"
            value={filters?.customer}
            onChange={(e) => handleFilterChange('customer', e?.target?.value)}
          />

          <Select
            label="Payment Method"
            options={paymentMethodOptions}
            value={filters?.paymentMethod}
            onChange={(value) => handleFilterChange('paymentMethod', value)}
          />
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Minimum Amount"
                type="number"
                placeholder="$0.00"
                value={filters?.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
              />

              <Input
                label="Maximum Amount"
                type="number"
                placeholder="$999,999.00"
                value={filters?.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
              />

              <div className="flex items-end">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  className="w-full"
                >
                  Export Results
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;