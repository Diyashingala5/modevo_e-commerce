import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductModal = ({ isOpen, onClose, product, onSave, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    category: '',
    price: '',
    comparePrice: '',
    stock: '',
    status: 'active',
    images: [],
    tags: '',
    weight: '',
    dimensions: '',
    seoTitle: '',
    seoDescription: ''
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [draggedImage, setDraggedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        sku: product?.sku || '',
        category: product?.category || '',
        price: product?.price?.toString() || '',
        comparePrice: product?.comparePrice?.toString() || '',
        stock: product?.stock?.toString() || '',
        status: product?.status || 'active',
        images: product?.images || [product?.image],
        tags: product?.tags?.join(', ') || '',
        weight: product?.weight?.toString() || '',
        dimensions: product?.dimensions || '',
        seoTitle: product?.seoTitle || '',
        seoDescription: product?.seoDescription || ''
      });
    } else {
      // Reset form for add mode
      setFormData({
        name: '',
        description: '',
        sku: `SKU-${Date.now()}`,
        category: '',
        price: '',
        comparePrice: '',
        stock: '',
        status: 'active',
        images: [],
        tags: '',
        weight: '',
        dimensions: '',
        seoTitle: '',
        seoDescription: ''
      });
    }
    setActiveTab('basic');
  }, [product, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const newImages = files?.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev?.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter((_, i) => i !== index)
    }));
  };

  const handleDragStart = (e, index) => {
    setDraggedImage(index);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    if (draggedImage === null) return;

    const newImages = [...formData?.images];
    const draggedItem = newImages?.[draggedImage];
    newImages?.splice(draggedImage, 1);
    newImages?.splice(dropIndex, 0, draggedItem);

    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setDraggedImage(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price) || 0,
        comparePrice: parseFloat(formData?.comparePrice) || 0,
        stock: parseInt(formData?.stock) || 0,
        weight: parseFloat(formData?.weight) || 0,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(Boolean),
        image: formData?.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        id: mode === 'edit' ? product?.id : `prod-${Date.now()}`
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'images', label: 'Images', icon: 'Image' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'inventory', label: 'Inventory', icon: 'Package' },
    { id: 'seo', label: 'SEO', icon: 'Search' }
  ];

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Toys & Games'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-smooth ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="text-sm font-medium">{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Product Name"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    placeholder="Enter product name"
                    required
                  />
                  <Input
                    label="SKU"
                    type="text"
                    value={formData?.sku}
                    onChange={(e) => handleInputChange('sku', e?.target?.value)}
                    placeholder="Product SKU"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    placeholder="Product description..."
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData?.category}
                      onChange={(e) => handleInputChange('category', e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option value="">Select category</option>
                      {categories?.map((category) => (
                        <option key={category} value={category?.toLowerCase()?.replace(/\s+/g, '-')}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Status
                    </label>
                    <select
                      value={formData?.status}
                      onChange={(e) => handleInputChange('status', e?.target?.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Tags"
                  type="text"
                  value={formData?.tags}
                  onChange={(e) => handleInputChange('tags', e?.target?.value)}
                  placeholder="Enter tags separated by commas"
                  description="Use commas to separate multiple tags"
                />
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Product Images
                  </label>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">Drop images here or click to upload</p>
                    <p className="text-muted-foreground text-sm mb-4">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Image Preview Grid */}
                {formData?.images?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Uploaded Images ({formData?.images?.length})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData?.images?.map((image, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className="relative group cursor-move border border-border rounded-lg overflow-hidden"
                        >
                          <div className="aspect-square">
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImage(index)}
                              className="h-8 w-8"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Price"
                    type="number"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <Input
                    label="Compare at Price"
                    type="number"
                    value={formData?.comparePrice}
                    onChange={(e) => handleInputChange('comparePrice', e?.target?.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    description="Show a higher price for comparison"
                  />
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Stock Quantity"
                    type="number"
                    value={formData?.stock}
                    onChange={(e) => handleInputChange('stock', e?.target?.value)}
                    placeholder="0"
                    min="0"
                    required
                  />
                  <Input
                    label="Weight (lbs)"
                    type="number"
                    value={formData?.weight}
                    onChange={(e) => handleInputChange('weight', e?.target?.value)}
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                  />
                </div>
                <Input
                  label="Dimensions"
                  type="text"
                  value={formData?.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e?.target?.value)}
                  placeholder="L x W x H (inches)"
                />
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <Input
                  label="SEO Title"
                  type="text"
                  value={formData?.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e?.target?.value)}
                  placeholder="SEO optimized title"
                  maxLength="60"
                />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SEO Description
                  </label>
                  <textarea
                    value={formData?.seoDescription}
                    onChange={(e) => handleInputChange('seoDescription', e?.target?.value)}
                    placeholder="SEO meta description..."
                    rows={3}
                    maxLength="160"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData?.seoDescription?.length}/160 characters
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {mode === 'edit' ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;