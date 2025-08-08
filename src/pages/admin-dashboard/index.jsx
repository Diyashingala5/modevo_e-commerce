import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import MetricCard from './components/MetricCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import SalesChart from './components/SalesChart';
import TopProductsCarousel from './components/TopProductsCarousel';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    totalSales: "$47,250.00",
    totalOrders: 1,
    totalCustomers: 2847,
    inventoryAlerts: 12,
    salesChange: "+12.5%",
    ordersChange: "+8.2%",
    customersChange: "+15.3%",
    inventoryChange: "-2"
  };

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-2025-001",
      customer: "Sarah Johnson",
      status: "processing",
      total: "$299.99",
      date: "2025-01-31T14:30:00Z"
    },
    {
      id: "ORD-2025-002",
      customer: "Michael Chen",
      status: "shipped",
      total: "$149.50",
      date: "2025-01-31T11:15:00Z"
    },
    {
      id: "ORD-2025-003",
      customer: "Emily Rodriguez",
      status: "delivered",
      total: "$89.99",
      date: "2025-01-30T16:45:00Z"
    },
    {
      id: "ORD-2025-004",
      customer: "David Thompson",
      status: "pending",
      total: "$199.99",
      date: "2025-01-30T09:20:00Z"
    },
    {
      id: "ORD-2025-005",
      customer: "Lisa Wang",
      status: "cancelled",
      total: "$75.00",
      date: "2025-01-29T13:10:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar} 
      />
      {/* Main Content */}
      <main className={`transition-layout ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border shadow-subtle">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <BreadcrumbTrail />
                <h1 className="text-2xl font-bold text-foreground mt-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = '/'}
                  className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md ${
                    window.location.pathname === '/'
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  Home
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} color="white" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">diyashingala@Modévo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Sales"
              value={dashboardMetrics?.totalSales}
              change={dashboardMetrics?.salesChange}
              changeType="increase"
              icon="DollarSign"
              color="success"
              loading={loading}
            />
            <MetricCard
              title="Total Orders"
              value={dashboardMetrics?.totalOrders?.toLocaleString()}
              change={dashboardMetrics?.ordersChange}
              changeType="increase"
              icon="ShoppingBag"
              color="primary"
              loading={loading}
            />
            <MetricCard
              title="Total Customers"
              value={dashboardMetrics?.totalCustomers?.toLocaleString()}
              change={dashboardMetrics?.customersChange}
              changeType="increase"
              icon="Users"
              color="primary"
              loading={loading}
            />
            <MetricCard
              title="Inventory Alerts"
              value={dashboardMetrics?.inventoryAlerts?.toString()}
              change={dashboardMetrics?.inventoryChange}
              changeType="decrease"
              icon="AlertTriangle"
              color="warning"
              loading={loading}
            />
          </div>

          {/* Sales Chart */}
          <div className="mb-8">
            <SalesChart loading={loading} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Orders Table */}
            <div className="lg:col-span-2">
              <RecentOrdersTable orders={recentOrders} loading={loading} />
            </div>

            {/* Quick Actions Panel */}
            <div className="lg:col-span-1">
              <QuickActionsPanel
                pendingOrdersCount={recentOrders?.filter(order => order?.status === 'pending')?.length}
                lowStockCount={dashboardMetrics?.inventoryAlerts}
                newCustomersCount={8}
              />
            </div>
          </div>

          {/* Top Products Carousel */}
          <div className="mb-8">
            <TopProductsCarousel loading={loading} />
          </div>

          {/* Additional Analytics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance Summary */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <span className="text-sm font-medium text-foreground">3.2%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Order Value</span>
                  <span className="text-sm font-medium text-foreground">$127.50</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-foreground">4.8/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">New order #ORD-2025-001 received</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Product "Wireless Headphones" updated</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">Low stock alert for "Coffee Beans"</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-foreground">New customer registration</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-sm text-muted-foreground">Revenue Growth</span>
                  </div>
                  <span className="text-sm font-medium text-success">+12.5%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Active Users</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">1,247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Package" size={16} className="text-accent" />
                    <span className="text-sm text-muted-foreground">Products Listed</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">456</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-warning" />
                    <span className="text-sm text-muted-foreground">Avg Rating</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;