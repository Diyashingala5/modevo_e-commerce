import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import CustomerTable from './components/CustomerTable';
import CustomerModal from './components/CustomerModal';
import CustomerStats from './components/CustomerStats';
import CustomerFilters from './components/CustomerFilters';

const AdminCustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  // Mock customer data
  const mockCustomers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      registrationDate: "2024-01-15",
      lastLogin: "2024-12-15",
      status: "active",
      totalOrders: 12,
      totalSpent: 1245.67,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      registrationDate: "2024-02-20",
      lastLogin: "2024-12-14",
      status: "active",
      totalOrders: 8,
      totalSpent: 892.34,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Pine Rd, Chicago, IL 60601",
      registrationDate: "2024-03-10",
      lastLogin: "2024-11-28",
      status: "inactive",
      totalOrders: 3,
      totalSpent: 234.56,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Sarah Davis",
      email: "sarah.davis@email.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm St, Houston, TX 77001",
      registrationDate: "2024-04-05",
      lastLogin: "2024-12-13",
      status: "active",
      totalOrders: 15,
      totalSpent: 1876.23,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      registrationDate: "2024-05-12",
      lastLogin: "2024-12-10",
      status: "suspended",
      totalOrders: 2,
      totalSpent: 156.78,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    // Simulate loading customer data
    const loadCustomers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCustomers(mockCustomers);
      setFilteredCustomers(mockCustomers);
      setIsLoading(false);
    };

    loadCustomers();
  }, []);

  // Filter customers based on search and status
  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  const handleCreateCustomer = () => {
    setSelectedCustomer(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    }
  };

  const handleSaveCustomer = (customerData) => {
    if (modalMode === 'create') {
      const newCustomer = {
        ...customerData,
        id: Math.max(...customers.map(c => c.id)) + 1,
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        totalOrders: 0,
        totalSpent: 0,
      };
      setCustomers(prev => [...prev, newCustomer]);
    } else if (modalMode === 'edit') {
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...customerData }
            : customer
        )
      );
    }
    setIsModalOpen(false);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/admin-dashboard' },
    { label: 'Customer Management', href: '/admin-customer-management' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="flex items-center justify-center h-64">
              <Icon name="Loader2" size={48} className="animate-spin text-primary" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbTrail items={breadcrumbItems} />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Customer Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage customer accounts and registrations
                </p>
              </div>
              <Button onClick={handleCreateCustomer} iconName="Plus" iconPosition="left">
                Add New Customer
              </Button>
            </div>
          </div>

          {/* Stats */}
          <CustomerStats customers={customers} />

          {/* Filters and Search */}
          <div className="mb-6 bg-card rounded-lg border border-border p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  iconName="Search"
                  iconPosition="left"
                />
              </div>
              <div className="sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  placeholder="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </Select>
              </div>
              <CustomerFilters 
                customers={customers}
                onFilterChange={(filters) => {
                  // Handle additional filters if needed
                }}
              />
            </div>
          </div>

          {/* Customer Table */}
          <CustomerTable
            customers={filteredCustomers}
            onEdit={handleEditCustomer}
            onView={handleViewCustomer}
            onDelete={handleDeleteCustomer}
          />

          {/* Customer Modal */}
          <CustomerModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            customer={selectedCustomer}
            mode={modalMode}
            onSave={handleSaveCustomer}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerManagement;
