import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ViewToggle = ({ value, onChange }) => {
  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden">
      <Button
        variant={value === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
        className="rounded-none border-none"
      >
        <Icon name="Grid3X3" size={16} />
      </Button>
      <Button
        variant={value === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('list')}
        className="rounded-none border-none"
      >
        <Icon name="List" size={16} />
      </Button>
    </div>
  );
};

export default ViewToggle;