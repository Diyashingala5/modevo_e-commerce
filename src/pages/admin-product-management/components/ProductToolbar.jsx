import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductToolbar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedProducts,
  onBulkAction,
  onAddProduct,
  onExportProducts
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'books', label: 'Books' },
    { value: 'toys', label: 'Toys & Games' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const bulkActions = [
    { value: 'activate', label: 'Activate Selected', icon: 'CheckCircle' },
    { value: 'deactivate', label: 'Deactivate Selected', icon: 'XCircle' },
    { value: 'delete', label: 'Delete Selected', icon: 'Trash2', destructive: true },
    { value: 'export', label: 'Export Selected', icon: 'Download' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedProducts);
    setShowBulkActions(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-subtle">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
          {/* Search */}
          <div className="w-full sm:w-80">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories?.map((category) => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-40">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statuses?.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Bulk Actions */}
          {selectedProducts?.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowBulkActions(!showBulkActions)}
                iconName="ChevronDown"
                iconPosition="right"
              >
                Bulk Actions ({selectedProducts?.length})
              </Button>

              {showBulkActions && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-50">
                  <div className="py-2">
                    {bulkActions?.map((action) => (
                      <button
                        key={action?.value}
                        onClick={() => handleBulkAction(action?.value)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                          action?.destructive
                            ? 'text-destructive hover:bg-destructive/10' :'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={action?.icon} size={16} />
                        <span>{action?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Button 
          <Button
            variant="outline"
            onClick={onExportProducts}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button> */}

          {/* Add Product Button */}
          <Button
            variant="outline"
            onClick={onAddProduct}
            iconName="Plus"
            iconPosition="left"
          >
            Add Product
          </Button>
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery) && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
              <span>Search: "{searchQuery}"</span>
              <button onClick={() => onSearchChange('')}>
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
              <span>Category: {categories?.find(c => c?.value === selectedCategory)?.label}</span>
              <button onClick={() => onCategoryChange('all')}>
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
              <span>Status: {statuses?.find(s => s?.value === selectedStatus)?.label}</span>
              <button onClick={() => onStatusChange('all')}>
                <Icon name="X" size={12} />
              </button>
            </span>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
              onStatusChange('all');
            }}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductToolbar;