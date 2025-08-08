import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProductToolbar from './components/ProductToolbar';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import InventoryAlerts from './components/InventoryAlerts';
import CategoryManager from './components/CategoryManager';
import BulkImportTool from './components/BulkImportTool';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminProductManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Mock data
  const mockProducts = [
    {
      id: 'prod-1',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
      sku: 'WBH-001',
      category: 'electronics',
      price: 199.99,
      comparePrice: 249.99,
      stock: 45,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      tags: ['electronics', 'audio', 'wireless'],
      weight: 0.8,
      dimensions: '7x6x3 inches',
      seoTitle: 'Premium Wireless Bluetooth Headphones - Modévo',
      seoDescription: 'Experience superior sound quality with our premium wireless headphones featuring noise cancellation and long battery life.'
    },
    {
      id: 'prod-2',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable organic cotton t-shirt available in multiple colors',
      sku: 'OCT-002',
      category: 'clothing',
      price: 29.99,
      stock: 120,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      tags: ['clothing', 'organic', 'cotton'],
      weight: 0.3,
      dimensions: '12x8x1 inches'
    },
    {
      id: 'prod-3',
      name: 'Smart Home Security Camera',
      description: '1080p HD security camera with night vision and mobile app control',
      sku: 'SHSC-003',
      category: 'electronics',
      price: 89.99,
      stock: 8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      tags: ['electronics', 'security', 'smart-home'],
      weight: 0.5,
      dimensions: '4x4x6 inches'
    },
    {
      id: 'prod-4',
      name: 'Ceramic Plant Pot Set',
      description: 'Set of 3 decorative ceramic plant pots with drainage holes',
      sku: 'CPP-004',
      category: 'home-garden',
      price: 45.99,
      stock: 0,
      status: 'out-of-stock',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      tags: ['home', 'garden', 'ceramic'],
      weight: 2.1,
      dimensions: '8x8x6 inches'
    },
    {
      id: 'prod-5',
      name: 'Yoga Mat Premium',
      description: 'Non-slip premium yoga mat with carrying strap',
      sku: 'YMP-005',
      category: 'sports',
      price: 39.99,
      stock: 75,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      tags: ['sports', 'yoga', 'fitness'],
      weight: 1.2,
      dimensions: '72x24x0.25 inches'
    },
    {
      id: 'prod-6',
      name: 'JavaScript Programming Book',
      description: 'Complete guide to modern JavaScript programming',
      sku: 'JSB-006',
      category: 'books',
      price: 24.99,
      stock: 200,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      tags: ['books', 'programming', 'javascript'],
      weight: 0.9,
      dimensions: '9x7x1 inches'
    },
    {
      id: 'prod-7',
      name: 'Wooden Building Blocks',
      description: 'Educational wooden building blocks set for children',
      sku: 'WBB-007',
      category: 'toys',
      price: 34.99,
      stock: 3,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1558877385-8c1b8e6e8e8e?w=400',
      tags: ['toys', 'educational', 'wooden'],
      weight: 1.5,
      dimensions: '12x8x4 inches'
    },
    {
      id: 'prod-8',
      name: 'Stainless Steel Water Bottle',
      description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours',
      sku: 'SSWB-008',
      category: 'sports',
      price: 19.99,
      stock: 150,
      status: 'draft',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      tags: ['sports', 'hydration', 'stainless-steel'],
      weight: 0.6,
      dimensions: '10x3x3 inches'
    }
  ];

  const mockCategories = [
    { id: 'cat-1', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 3, slug: 'electronics' },
    { id: 'cat-2', name: 'Clothing', description: 'Apparel and fashion items', productCount: 1, slug: 'clothing' },
    { id: 'cat-3', name: 'Home & Garden', description: 'Home decor and gardening supplies', productCount: 1, slug: 'home-garden' },
    { id: 'cat-4', name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear', productCount: 2, slug: 'sports' },
    { id: 'cat-5', name: 'Books', description: 'Books and educational materials', productCount: 1, slug: 'books' },
    { id: 'cat-6', name: 'Toys & Games', description: 'Toys and games for all ages', productCount: 1, slug: 'toys' }
  ];

  const mockInventoryAlerts = [
    {
      id: 'alert-1',
      productId: 'prod-4',
      productName: 'Ceramic Plant Pot Set',
      sku: 'CPP-004',
      type: 'out-of-stock',
      currentStock: 0,
      threshold: 5,
      value: 0
    },
    {
      id: 'alert-2',
      productId: 'prod-3',
      productName: 'Smart Home Security Camera',
      sku: 'SHSC-003',
      type: 'low-stock',
      currentStock: 8,
      threshold: 10,
      value: 719.92
    },
    {
      id: 'alert-3',
      productId: 'prod-7',
      productName: 'Wooden Building Blocks',
      sku: 'WBB-007',
      type: 'low-stock',
      currentStock: 3,
      threshold: 10,
      value: 104.97
    }
  ];

  const [categories, setCategories] = useState(mockCategories);
  const [inventoryAlerts, setInventoryAlerts] = useState(mockInventoryAlerts);

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.sku?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(product => product?.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered?.filter(product => product?.status === selectedStatus);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedStatus, sortBy, sortOrder]);

  const handleSelectProduct = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts?.filter(id => id !== productId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedProducts(filteredProducts?.map(product => product?.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSort = (column, order) => {
    setSortBy(column);
    setSortOrder(order);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalMode('add');
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setModalMode('edit');
    setShowProductModal(true);
  };

  const handleDuplicateProduct = (product) => {
    const duplicatedProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product?.name} (Copy)`,
      sku: `${product?.sku}-COPY`,
      status: 'draft'
    };
    setProducts([...products, duplicatedProduct]);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products?.filter(p => p?.id !== productToDelete?.id));
      setSelectedProducts(selectedProducts?.filter(id => id !== productToDelete?.id));
      setProductToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleSaveProduct = (productData) => {
    if (modalMode === 'edit') {
      setProducts(products?.map(p => p?.id === productData?.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }
    setShowProductModal(false);
  };

  const handleBulkAction = (action, productIds) => {
    switch (action) {
      case 'activate':
        setProducts(products?.map(p => 
          productIds?.includes(p?.id) ? { ...p, status: 'active' } : p
        ));
        break;
      case 'deactivate':
        setProducts(products?.map(p => 
          productIds?.includes(p?.id) ? { ...p, status: 'inactive' } : p
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${productIds?.length} products?`)) {
          setProducts(products?.filter(p => !productIds?.includes(p?.id)));
          setSelectedProducts([]);
        }
        break;
      case 'export':
        console.log('Exporting products:', productIds);
        break;
    }
  };

  const handleExportProducts = () => {
    console.log('Exporting all products');
  };

  const handleViewProduct = (productId) => {
    const product = products?.find(p => p?.id === productId);
    if (product) {
      handleEditProduct(product);
    }
  };

  const handleRestockProduct = (productId) => {
    const product = products?.find(p => p?.id === productId);
    if (product) {
      const newStock = prompt(`Enter new stock quantity for ${product?.name}:`, '50');
      if (newStock && !isNaN(newStock)) {
        setProducts(products?.map(p => 
          p?.id === productId ? { ...p, stock: parseInt(newStock) } : p
        ));
      }
    }
  };

  const handleAddCategory = (categoryData) => {
    setCategories([...categories, categoryData]);
  };

  const handleEditCategory = (categoryId, categoryData) => {
    setCategories(categories?.map(c => 
      c?.id === categoryId ? { ...c, ...categoryData } : c
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories?.filter(c => c?.id !== categoryId));
    }
  };

  const handleImportProducts = (importResults) => {
    console.log('Import completed:', importResults);
    // In a real app, you would process the imported products here
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-layout ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbTrail />
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Product Management</h1>
                <p className="text-muted-foreground">
                  Manage your product catalog, inventory, and categories
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total Products</div>
                  <div className="text-2xl font-bold text-foreground">{products?.length}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Toolbar */}
              <ProductToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedProducts={selectedProducts}
                onBulkAction={handleBulkAction}
                onAddProduct={handleAddProduct}
                onExportProducts={handleExportProducts}
              />

              {/* Product Table */}
              <ProductTable
                products={filteredProducts}
                selectedProducts={selectedProducts}
                onSelectProduct={handleSelectProduct}
                onSelectAll={handleSelectAll}
                onEditProduct={handleEditProduct}
                onDuplicateProduct={handleDuplicateProduct}
                onDeleteProduct={handleDeleteProduct}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Inventory Alerts */}
              <InventoryAlerts
                alerts={inventoryAlerts}
                onViewProduct={handleViewProduct}
                onRestockProduct={handleRestockProduct}
              />

              {/* Category Manager */}
              <CategoryManager
                categories={categories}
                onAddCategory={handleAddCategory}
                onEditCategory={handleEditCategory}
                onDeleteCategory={handleDeleteCategory}
              />

              {/* Bulk Import Tool */}
              <BulkImportTool
                onImportProducts={handleImportProducts}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
        mode={modalMode}
      />
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-card rounded-lg shadow-elevated p-6 w-full max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Delete Product</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteProduct}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManagement;