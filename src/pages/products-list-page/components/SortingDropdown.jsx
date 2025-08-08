import React from 'react';
import Select from '../../../components/ui/Select';

const SortingDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'priceLowToHigh', label: 'Price: Low to High' },
    { value: 'priceHighToLow', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-foreground whitespace-nowrap hidden sm:block">
        Sort by:
      </span>
      <Select
        options={sortOptions}
        value={value}
        onChange={onChange}
        placeholder="Sort by"
        className="w-48"
      />
    </div>
  );
};

export default SortingDropdown;