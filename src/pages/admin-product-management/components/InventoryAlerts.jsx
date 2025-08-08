import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InventoryAlerts = ({ alerts, onViewProduct, onRestockProduct }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'out-of-stock':
        return { icon: 'AlertCircle', color: 'text-destructive' };
      case 'low-stock':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'overstock':
        return { icon: 'TrendingUp', color: 'text-primary' };
      default:
        return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const getAlertBadge = (type) => {
    const config = {
      'out-of-stock': { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Out of Stock' },
      'low-stock': { bg: 'bg-warning/10', text: 'text-warning', label: 'Low Stock' },
      'overstock': { bg: 'bg-primary/10', text: 'text-primary', label: 'Overstock' }
    };

    const alert = config?.[type] || config?.['low-stock'];
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${alert.bg} ${alert.text}`}>
        {alert.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <span>Inventory Alerts</span>
          </h3>
          <span className="text-sm text-muted-foreground">
            {alerts?.length} alerts
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-1">All Good!</h4>
            <p className="text-xs text-muted-foreground">No inventory alerts at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {alerts?.map((alert) => {
              const alertConfig = getAlertIcon(alert.type);
              
              return (
                <div key={alert.id} className="p-4 hover:bg-muted/30 transition-smooth">
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={alertConfig?.icon} 
                      size={20} 
                      className={`mt-0.5 ${alertConfig?.color}`} 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {alert.productName}
                        </h4>
                        {getAlertBadge(alert.type)}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2">
                        SKU: {alert.sku}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">
                            Stock: <span className="font-medium text-foreground">{alert.currentStock}</span>
                          </span>
                          {alert.threshold && (
                            <span className="text-muted-foreground">
                              Threshold: <span className="font-medium text-foreground">{alert.threshold}</span>
                            </span>
                          )}
                          <span className="text-muted-foreground">
                            Value: <span className="font-medium text-foreground">{formatCurrency(alert.value)}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => onViewProduct(alert.productId)}
                          iconName="Eye"
                          iconPosition="left"
                        >
                          View
                        </Button>
                        
                        {alert.type !== 'overstock' && (
                          <Button
                            variant="default"
                            size="xs"
                            onClick={() => onRestockProduct(alert.productId)}
                            iconName="Plus"
                            iconPosition="left"
                          >
                            Restock
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {alerts?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
            <Button variant="ghost" size="xs" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryAlerts;