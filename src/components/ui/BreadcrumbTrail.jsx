import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbTrail = ({ 
  customBreadcrumbs = null,
  showHome = true,
  maxItems = 4,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Default breadcrumb mapping for admin routes
  const routeMapping = {
    '/admin-dashboard': { label: 'Dashboard', icon: 'BarChart3' },
    '/admin-product-management': { label: 'Product Management', icon: 'Package' },
    '/admin-order-management': { label: 'Order Management', icon: 'ShoppingBag' },
    '/home-page': { label: 'Home', icon: 'Home' },
    '/shopping-cart': { label: 'Shopping Cart', icon: 'ShoppingCart' },
    '/user-profile-order-history': { label: 'Account & Orders', icon: 'User' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Add home if requested
    if (showHome) {
      breadcrumbs?.push({
        label: 'Admin',
        path: '/admin-dashboard',
        icon: 'Home'
      });
    }

    // Build breadcrumbs from current path
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMapping?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          icon: routeInfo?.icon,
          isActive: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Truncate breadcrumbs if too many
  const displayBreadcrumbs = breadcrumbs?.length > maxItems 
    ? [
        breadcrumbs?.[0],
        { label: '...', path: null, isEllipsis: true },
        ...breadcrumbs?.slice(-2)
      ]
    : breadcrumbs;

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {displayBreadcrumbs?.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {crumb?.isEllipsis ? (
              <span className="text-muted-foreground px-2">...</span>
            ) : crumb?.isActive ? (
              <span className="flex items-center space-x-2 text-foreground font-medium">
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(crumb?.path)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground p-1 h-auto font-normal"
              >
                {crumb?.icon && <Icon name={crumb?.icon} size={16} />}
                <span>{crumb?.label}</span>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;