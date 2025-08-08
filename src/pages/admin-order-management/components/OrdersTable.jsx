import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import OrderStatusBadge from './OrderStatusBadge';
import OrderDetailModal from './OrderDetailModal';

const OrdersTable = ({ orders = [], onBulkAction, onOrderAction }) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders?.map(order => order?.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders?.filter(id => id !== orderId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedOrders = [...orders]?.sort((a, b) => {
    if (sortConfig?.key === 'date') {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
    }
    if (sortConfig?.key === 'total') {
      return sortConfig?.direction === 'asc' ? a?.total - b?.total : b?.total - a?.total;
    }
    if (sortConfig?.key === 'customer') {
      return sortConfig?.direction === 'asc' 
        ? a?.customerName?.localeCompare(b?.customerName)
        : b?.customerName?.localeCompare(a?.customerName);
    }
    return 0;
  });

  const isAllSelected = selectedOrders?.length === orders?.length && orders?.length > 0;
  const isPartiallySelected = selectedOrders?.length > 0 && selectedOrders?.length < orders?.length;

  return (
    <>
      <div className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden">
        {/* Bulk Actions Bar */}
        {selectedOrders?.length > 0 && (
          <div className="bg-primary/5 border-b border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {selectedOrders?.length} orders selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  onClick={() => onBulkAction('generate-invoices', selectedOrders)}
                >
                  Generate Invoices
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Truck"
                  iconPosition="left"
                  onClick={() => onBulkAction('print-labels', selectedOrders)}
                >
                  Print Labels
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => onBulkAction('update-status', selectedOrders)}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isPartiallySelected}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-1 hover:text-primary transition-smooth"
                  >
                    <span>Order ID</span>
                    <Icon name={getSortIcon('id')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  <button
                    onClick={() => handleSort('customer')}
                    className="flex items-center space-x-1 hover:text-primary transition-smooth"
                  >
                    <span>Customer</span>
                    <Icon name={getSortIcon('customer')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 hover:text-primary transition-smooth"
                  >
                    <span>Date</span>
                    <Icon name={getSortIcon('date')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  <button
                    onClick={() => handleSort('total')}
                    className="flex items-center space-x-1 hover:text-primary transition-smooth"
                  >
                    <span>Total</span>
                    <Icon name={getSortIcon('total')} size={14} />
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedOrders?.map((order) => (
                <tr key={order?.id} className="hover:bg-muted/30 transition-smooth">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={(e) => handleSelectOrder(order?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm font-medium text-primary">
                      #{order?.id}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-foreground">{order?.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order?.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground">
                      {formatDate(order?.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <OrderStatusBadge status={order?.status} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground capitalize">
                        {order?.paymentMethod?.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-foreground">
                      {formatCurrency(order?.total)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => handleViewOrder(order)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="FileText"
                        onClick={() => onOrderAction('print-invoice', order?.id)}
                      />
                     {/* <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => onOrderAction('more-actions', order?.id)}
                      /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {orders?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              No orders match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        onStatusUpdate={(orderId, newStatus) => {
          onOrderAction('update-status', orderId, newStatus);
          setIsDetailModalOpen(false);
        }}
      />
    </>
  );
};

export default OrdersTable;