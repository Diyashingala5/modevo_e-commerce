import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName?.trim()) {
      onAddCategory({
        id: `cat-${Date.now()}`,
        name: newCategoryName?.trim(),
        description: newCategoryDescription?.trim(),
        productCount: 0,
        slug: newCategoryName?.toLowerCase()?.replace(/\s+/g, '-'),
        createdAt: new Date()?.toISOString()
      });
      setNewCategoryName('');
      setNewCategoryDescription('');
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category?.id);
    setNewCategoryName(category?.name);
    setNewCategoryDescription(category?.description || '');
  };

  const handleSaveEdit = () => {
    if (newCategoryName?.trim()) {
      onEditCategory(editingCategory, {
        name: newCategoryName?.trim(),
        description: newCategoryDescription?.trim(),
        slug: newCategoryName?.toLowerCase()?.replace(/\s+/g, '-')
      });
      setEditingCategory(null);
      setNewCategoryName('');
      setNewCategoryDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setIsAddingCategory(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'electronics': 'Smartphone',
      'clothing': 'Shirt',
      'home-garden': 'Home',
      'sports': 'Dumbbell',
      'books': 'Book',
      'toys': 'Gamepad2'
    };
    return iconMap?.[categoryName?.toLowerCase()?.replace(/\s+/g, '-')] || 'Tag';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Tag" size={20} className="text-primary" />
            <span>Categories</span>
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingCategory(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {/* Add Category Form */}
        {isAddingCategory && (
          <div className="p-4 border-b border-border bg-muted/20">
            <div className="space-y-3">
              <Input
                label="Category Name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e?.target?.value)}
                placeholder="Enter category name"
                className="text-sm"
              />
              <Input
                label="Description"
                type="text"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e?.target?.value)}
                placeholder="Optional description"
                className="text-sm"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddCategory}
                  iconName="Check"
                  iconPosition="left"
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="divide-y divide-border">
          {categories?.map((category) => (
            <div key={category?.id} className="p-4 hover:bg-muted/30 transition-smooth">
              {editingCategory === category?.id ? (
                <div className="space-y-3">
                  <Input
                    label="Category Name"
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e?.target?.value)}
                    className="text-sm"
                  />
                  <Input
                    label="Description"
                    type="text"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e?.target?.value)}
                    className="text-sm"
                  />
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSaveEdit}
                      iconName="Check"
                      iconPosition="left"
                    >
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      iconName="X"
                      iconPosition="left"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon 
                        name={getCategoryIcon(category?.name)} 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">
                        {category?.name}
                      </h4>
                      {category?.description && (
                        <p className="text-xs text-muted-foreground">
                          {category?.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {category?.productCount} products
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /{category?.slug}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCategory(category)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteCategory(category?.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {categories?.length === 0 && !isAddingCategory && (
          <div className="p-6 text-center">
            <Icon name="Tag" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-1">No Categories</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Create your first product category to get started.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingCategory(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Category
            </Button>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Total: {categories?.length} categories</span>
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;