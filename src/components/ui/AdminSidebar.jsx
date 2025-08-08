import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;

  const navigationItems = [
    {
      path: '/admin-dashboard',
      label: 'Dashboard',
      icon: 'BarChart3',
      description: 'Overview & Analytics'
    },
    {
      path: '/admin-product-management',
      label: 'Products',
      icon: 'Package',
      description: 'Catalog Management'
    },
    {
      path: '/admin-order-management',
      label: 'Orders',
      icon: 'ShoppingBag',
      description: 'Order Fulfillment'
    },
    {
      path: '/admin-customer-management',
      label: 'Customers',
      icon: 'Users',
      description: 'Customer Management'
    }
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center px-2' : 'px-6'} py-4 border-b border-border`}>
        {isCollapsed && !isMobile ? (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} color="white" />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Modévo</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navigationItems?.map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`w-full flex items-center transition-smooth rounded-lg ${
              isActivePath(item?.path)
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-foreground hover:bg-muted hover:text-foreground'
            } ${isCollapsed && !isMobile ? 'justify-center p-3' : 'px-3 py-3'}`}
            title={isCollapsed && !isMobile ? item?.label : undefined}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className={isCollapsed && !isMobile ? '' : 'mr-3'} 
            />
            {(!isCollapsed || isMobile) && (
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{item?.label}</div>
                <div className="text-xs opacity-75">{item?.description}</div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle (Desktop Only) */}
      {!isMobile && onToggleCollapse && (
        <div className="px-3 py-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={`w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              className={isCollapsed ? '' : 'mr-2'} 
            />
            {!isCollapsed && <span className="text-sm">Collapse</span>}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-900 lg:flex-col bg-card border-r border-border shadow-subtle transition-layout ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-1100">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="bg-card shadow-elevated"
        >
          <Icon name="Menu" size={20} />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-1100 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="relative flex flex-col w-64 bg-card shadow-elevated">
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <SidebarContent isMobile />
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;