import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerTable = ({ customers, onEdit, onView, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        className: 'bg-success/10 text-success border-success/20',
        icon: 'CheckCircle',
        label: 'Active'
      },
      inactive: {
        className: 'bg-warning/10 text-warning border-warning/20',
        icon: 'Clock',
        label: 'Inactive'
      },
      suspended: {
        className: 'bg-destructive/10 text-destructive border-destructive/20',
        icon: 'XCircle',
        label: 'Suspended'
      }
    };

    const config = statusConfig[status] || statusConfig.inactive;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${config.className}`}>
        <Icon name={config.icon} size={12} />
        {config.label}
      </span>
    );
  };

  if (customers.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No customers found</h3>
        <p className="text-muted-foreground">
          No customers match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-foreground">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Orders</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Total Spent</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Registered</th>
              <th className="text-left py-3 px-4 font-medium text-foreground">Last Login</th>
              <th className="text-right py-3 px-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      {customer.avatar ? (
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm text-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(customer.status)}
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground font-medium">{customer.totalOrders}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground text-sm">
                    {formatDate(customer.registrationDate)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground text-sm">
                    {customer.lastLogin === 'Never' ? 'Never' : formatDate(customer.lastLogin)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(customer)}
                      className="text-primary hover:text-primary"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(customer)}
                      className="text-primary hover:text-primary"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(customer.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
