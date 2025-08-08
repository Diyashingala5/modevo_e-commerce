import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FiltersSidebar = ({ filters, onFiltersChange, isOpen, onClose, products }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState(filters?.priceRange);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
    setPriceRange(filters?.priceRange);
  }, [filters]);

  // Extract unique categories and brands from products
  const categories = [...new Set(products?.map(p => p.category))]?.sort();
  const brands = [...new Set(products?.map(p => p.brand))]?.sort();

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat, label: cat }))
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'inStock', label: 'In Stock Only' },
    { value: 'outOfStock', label: 'Out of Stock' }
  ];

  // Handle filter changes
  const handleCategoryChange = (value) => {
    const newFilters = { ...localFilters, category: value === 'all' ? '' : value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
    
    const newFilters = { ...localFilters, priceRange: newRange };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBrandChange = (brand, checked) => {
    let newBrands;
    if (checked) {
      newBrands = [...localFilters?.brands, brand];
    } else {
      newBrands = localFilters?.brands?.filter(b => b !== brand);
    }
    
    const newFilters = { ...localFilters, brands: newBrands };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (value) => {
    const newFilters = { ...localFilters, rating: Number(value) };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAvailabilityChange = (value) => {
    const newFilters = { ...localFilters, availability: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: [0, 1000],
      brands: [],
      rating: 0,
      availability: 'all'
    };
    setLocalFilters(clearedFilters);
    setPriceRange([0, 1000]);
    onFiltersChange(clearedFilters);
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-sm"
          >
            Clear All
          </Button>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Category</h4>
        <Select
          options={categoryOptions}
          value={localFilters?.category || 'all'}
          onChange={handleCategoryChange}
          placeholder="Select category"
        />
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Price Range</h4>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange?.[0]}
            onChange={(e) => handlePriceRangeChange(0, e?.target?.value)}
            min="0"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange?.[1]}
            onChange={(e) => handlePriceRangeChange(1, e?.target?.value)}
            min="0"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          ${priceRange?.[0]} - ${priceRange?.[1]}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Brand</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands?.map(brand => (
            <label key={brand} className="flex items-center space-x-2">
              <Checkbox
                checked={localFilters?.brands?.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e?.target?.checked)}
              />
              <span className="text-sm text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Customer Rating</h4>
        <Select
          options={ratingOptions}
          value={localFilters?.rating}
          onChange={handleRatingChange}
          placeholder="Select rating"
        />
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Availability</h4>
        <Select
          options={availabilityOptions}
          value={localFilters?.availability}
          onChange={handleAvailabilityChange}
          placeholder="Select availability"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
          {sidebarContent}
        </div>
      </div>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onClose}>
          <div 
            className="fixed inset-y-0 left-0 w-80 bg-card shadow-xl overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersSidebar;