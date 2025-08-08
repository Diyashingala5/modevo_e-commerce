import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll, 
  onEditProduct, 
  onDuplicateProduct, 
  onDeleteProduct,
  sortBy,
  sortOrder,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      'out-of-stock': { color: 'bg-destructive text-destructive-foreground', label: 'Out of Stock' }
    };

    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'text-destructive', icon: 'AlertCircle' };
    if (stock <= 10) return { color: 'text-warning', icon: 'AlertTriangle' };
    return { color: 'text-success', icon: 'CheckCircle' };
  };

  const handleSort = (column) => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(column, newOrder);
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length && products?.length > 0}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Product</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('sku')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>SKU</span>
                  <Icon name={getSortIcon('sku')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Price</span>
                  <Icon name={getSortIcon('price')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('stock')}
                  className="flex items-center space-x-1 hover:text-primary transition-smooth"
                >
                  <span>Stock</span>
                  <Icon name={getSortIcon('stock')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products?.map((product) => {
              const stockStatus = getStockStatus(product?.stock);
              const isSelected = selectedProducts?.includes(product?.id);
              const isHovered = hoveredRow === product?.id;

              return (
                <tr
                  key={product?.id}
                  className={`transition-smooth ${isHovered ? 'bg-muted/30' : 'hover:bg-muted/20'} ${isSelected ? 'bg-primary/5' : ''}`}
                  onMouseEnter={() => setHoveredRow(product?.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onSelectProduct(product?.id, e?.target?.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{product?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{product?.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-foreground">{product?.sku}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground">{product?.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-foreground">{formatCurrency(product?.price)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={stockStatus?.icon} size={16} className={stockStatus?.color} />
                      <span className={`text-sm font-medium ${stockStatus?.color}`}>{product?.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(product?.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditProduct(product)}
                        className="h-8 w-8"
                      >
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDuplicateProduct(product)}
                        className="h-8 w-8"
                      >
                        <Icon name="Copy" size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteProduct(product)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {products?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Get started by adding your first product.</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;