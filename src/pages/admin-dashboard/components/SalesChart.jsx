import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SalesChart = ({ loading = false }) => {
  const [chartType, setChartType] = useState('bar');
  const [dateRange, setDateRange] = useState('7days');

  const salesData = [
    { name: 'Mon', sales: 4200, orders: 24 },
    { name: 'Tue', sales: 3800, orders: 19 },
    { name: 'Wed', sales: 5200, orders: 31 },
    { name: 'Thu', sales: 4600, orders: 27 },
    { name: 'Fri', sales: 6800, orders: 42 },
    { name: 'Sat', sales: 7200, orders: 48 },
    { name: 'Sun', sales: 5900, orders: 35 }
  ];

  const monthlyData = [
    { name: 'Jan', sales: 45000, orders: 280 },
    { name: 'Feb', sales: 52000, orders: 320 },
    { name: 'Mar', sales: 48000, orders: 295 },
    { name: 'Apr', sales: 61000, orders: 380 },
    { name: 'May', sales: 55000, orders: 340 },
    { name: 'Jun', sales: 67000, orders: 420 },
    { name: 'Jul', sales: 71000, orders: 450 }
  ];

  const getCurrentData = () => {
    return dateRange === '30days' ? monthlyData : salesData;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-elevated border border-border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Sales: {formatCurrency(payload?.[0]?.value)}
          </p>
          <p className="text-secondary">
            Orders: {payload?.[0]?.payload?.orders}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Sales Overview</h2>
          <div className="flex items-center space-x-3">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>

            {/* Chart Type Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="h-8 px-3"
              >
                <Icon name="BarChart3" size={16} />
              </Button>
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="h-8 px-3"
              >
                <Icon name="TrendingUp" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-6">
        <div className="w-full h-64" aria-label="Sales Chart">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="sales" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(getCurrentData()?.reduce((sum, item) => sum + item?.sales, 0))}
            </p>
            <p className="text-sm text-muted-foreground">Total Sales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {getCurrentData()?.reduce((sum, item) => sum + item?.orders, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(getCurrentData()?.reduce((sum, item) => sum + item?.sales, 0) / getCurrentData()?.reduce((sum, item) => sum + item?.orders, 0))}
            </p>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;