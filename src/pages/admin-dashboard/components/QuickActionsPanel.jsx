import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ 
  pendingOrdersCount = 0, 
  lowStockCount = 0, 
  newCustomersCount = 0 
}) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create and publish new products",
      icon: "Plus",
      color: "bg-primary/10 text-primary",
      action: () => navigate('/admin-product-management'),
      buttonText: "Add Product"
    },
    {
      title: "Pending Orders",
      description: `${pendingOrdersCount} orders need attention`,
      icon: "Clock",
      color: "bg-warning/10 text-warning",
      action: () => navigate('/admin-order-management'),
      buttonText: "View Orders",
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null
    },
    {
      title: "Low Stock Alert",
      description: `${lowStockCount} products running low`,
      icon: "AlertTriangle",
      color: "bg-error/10 text-error",
      action: () => navigate('/admin-product-management'),
      buttonText: "Check Inventory",
      badge: lowStockCount > 0 ? lowStockCount : null
    },
    {
      title: "Customer Management",
      description: `${newCustomersCount} new customers this week`,
      icon: "Users",
      color: "bg-success/10 text-success",
      action: () => navigate('/admin-order-management'),
      buttonText: "Manage Users",
      badge: newCustomersCount > 0 ? newCustomersCount : null
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      {quickActions?.map((action, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 shadow-subtle hover:shadow-elevated transition-smooth">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${action?.color}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{action?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action?.description}</p>
              </div>
            </div>
            {action?.badge && (
              <span className="bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {action?.badge > 99 ? '99+' : action?.badge}
              </span>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={action?.action}
            className="w-full"
          >
            {action?.buttonText}
          </Button>
        </div>
      ))}
      {/* Additional Quick Stats */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-medium text-foreground mb-3">Today's Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Orders Processed</span>
            <span className="text-sm font-medium text-foreground">24</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Revenue Generated</span>
            <span className="text-sm font-medium text-success">$3,247.50</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">New Customers</span>
            <span className="text-sm font-medium text-foreground">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Products Sold</span>
            <span className="text-sm font-medium text-foreground">156</span>
          </div>
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-subtle">
        <h3 className="font-medium text-foreground mb-3">System Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Payment Gateway</span>
            </div>
            <span className="text-xs text-success">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Inventory Sync</span>
            </div>
            <span className="text-xs text-success">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-muted-foreground">Email Service</span>
            </div>
            <span className="text-xs text-warning">Delayed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;