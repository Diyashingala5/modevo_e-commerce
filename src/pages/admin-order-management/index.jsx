import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import OrderStats from './components/OrderStats';
import OrderFilters from './components/OrderFilters';
import OrdersTable from './components/OrdersTable';
import OrderPagination from './components/OrderPagination';
import Button from '../../components/ui/Button';


const AdminOrderManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    customer: '',
    minAmount: '',
    maxAmount: '',
    paymentMethod: 'all'
  });

  // Mock data for orders
  const mockOrders = [
    {
      id: 'ORD-2025-001',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      customerPhone: '+1 (555) 123-4567',
      createdAt: '2025-01-31T14:30:00Z',
      status: 'processing',
      paymentMethod: 'credit_card',
      total: 299.99,
      shippingAddress: {
        street: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      items: [
        {
          name: 'Wireless Bluetooth Headphones',
          description: 'Premium noise-canceling headphones',
          quantity: 1,
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        },
        {
          name: 'Phone Case',
          description: 'Protective silicone case',
          quantity: 2,
          price: 50.00,
          image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'
        }
      ],
      notes: [
        {
          author: 'Admin',
          content: 'Customer requested expedited shipping',
          createdAt: '2025-01-31T15:00:00Z'
        }
      ]
    },
    {
      id: 'ORD-2025-002',
      customerName: 'Michael Chen',
      customerEmail: 'michael.chen@email.com',
      customerPhone: '+1 (555) 987-6543',
      createdAt: '2025-01-31T10:15:00Z',
      status: 'shipped',
      paymentMethod: 'paypal',
      total: 149.99,
      shippingAddress: {
        street: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      },
      items: [
        {
          name: 'Smart Watch',
          description: 'Fitness tracking smartwatch',
          quantity: 1,
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
        }
      ],
      notes: []
    },
    {
      id: 'ORD-2025-003',
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily.rodriguez@email.com',
      customerPhone: '+1 (555) 456-7890',
      createdAt: '2025-01-30T16:45:00Z',
      status: 'delivered',
      paymentMethod: 'stripe',
      total: 89.99,
      shippingAddress: {
        street: '789 Pine Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'United States'
      },
      items: [
        {
          name: 'Wireless Mouse',
          description: 'Ergonomic wireless mouse',
          quantity: 1,
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
        },
        {
          name: 'Keyboard',
          description: 'Mechanical gaming keyboard',
          quantity: 1,
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400'
        }
      ],
      notes: []
    },
    {
      id: 'ORD-2025-004',
      customerName: 'David Thompson',
      customerEmail: 'david.thompson@email.com',
      customerPhone: '+1 (555) 321-0987',
      createdAt: '2025-01-30T09:20:00Z',
      status: 'pending',
      paymentMethod: 'credit_card',
      total: 459.99,
      shippingAddress: {
        street: '321 Elm Drive',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'United States'
      },
      items: [
        {
          name: 'Laptop Stand',
          description: 'Adjustable aluminum laptop stand',
          quantity: 1,
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
        },
        {
          name: 'External Monitor',
          description: '24-inch 4K monitor',
          quantity: 1,
          price: 379.99,
          image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
        }
      ],
      notes: []
    },
    {
      id: 'ORD-2025-005',
      customerName: 'Lisa Wang',
      customerEmail: 'lisa.wang@email.com',
      customerPhone: '+1 (555) 654-3210',
      createdAt: '2025-01-29T13:10:00Z',
      status: 'cancelled',
      paymentMethod: 'debit_card',
      total: 199.99,
      shippingAddress: {
        street: '654 Maple Lane',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'United States'
      },
      items: [
        {
          name: 'Tablet',
          description: '10-inch Android tablet',
          quantity: 1,
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
        }
      ],
      notes: [
        {
          author: 'Customer Service',
          content: 'Customer requested cancellation due to change of mind',
          createdAt: '2025-01-29T14:00:00Z'
        }
      ]
    }
  ];

  // Mock stats data
  const mockStats = {
    totalOrders: 1247,
    ordersChange: 12.5,
    pendingOrders: 23,
    pendingChange: -5.2,
    totalRevenue: 89750.50,
    revenueChange: 18.3,
    avgOrderValue: 156.75,
    avgOrderChange: 8.7
  };

  // Filter orders based on current filters
  const filteredOrders = mockOrders?.filter(order => {
    if (filters?.status !== 'all' && order?.status !== filters?.status) return false;
    if (filters?.customer && !order?.customerName?.toLowerCase()?.includes(filters?.customer?.toLowerCase()) && 
        !order?.customerEmail?.toLowerCase()?.includes(filters?.customer?.toLowerCase())) return false;
    if (filters?.paymentMethod !== 'all' && order?.paymentMethod !== filters?.paymentMethod) return false;
    if (filters?.minAmount && order?.total < parseFloat(filters?.minAmount)) return false;
    if (filters?.maxAmount && order?.total > parseFloat(filters?.maxAmount)) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders?.slice(startIndex, startIndex + itemsPerPage);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleBulkAction = (action, orderIds) => {
    console.log(`Bulk action: ${action}`, orderIds);
    // In a real app, this would call an API
    switch (action) {
      case 'generate-invoices':
        alert(`Generating invoices for ${orderIds?.length} orders`);
        break;
      case 'print-labels':
        alert(`Printing shipping labels for ${orderIds?.length} orders`);
        break;
      case 'update-status':
        alert(`Updating status for ${orderIds?.length} orders`);
        break;
      default:
        break;
    }
  };

  const handleOrderAction = (action, orderId, data) => {
    console.log(`Order action: ${action}`, orderId, data);
    // In a real app, this would call an API
    switch (action) {
      case 'print-invoice':
        alert(`Printing invoice for order ${orderId}`);
        break;
      case 'update-status':
        alert(`Updating order ${orderId} status to ${data}`);
        break;
      case 'more-actions':
        alert(`More actions for order ${orderId}`);
        break;
      default:
        break;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-layout ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <BreadcrumbTrail />
              <h1 className="text-3xl font-bold text-foreground mt-2">Order Management</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage all customer orders from a centralized dashboard
              </p>
            </div>
            
           {/* <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export Orders
              </Button>
              <Button
                iconName="Plus"
                iconPosition="left"
              >
                Manual Order
              </Button>
            </div> */}
          </div>

          {/* Stats Cards */}
          <OrderStats stats={mockStats} />

          {/* Filters */}
          <OrderFilters 
            onFiltersChange={handleFiltersChange}
            totalOrders={filteredOrders?.length}
          />

          {/* Orders Table */}
          <OrdersTable 
            orders={paginatedOrders}
            onBulkAction={handleBulkAction}
            onOrderAction={handleOrderAction}
          />

          {/* Pagination */}
          <OrderPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredOrders?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;