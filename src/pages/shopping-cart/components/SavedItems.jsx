import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedItems = ({ savedItems, onMoveToCart, onRemoveFromSaved }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  if (!savedItems || savedItems?.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Heart" size={20} className="text-accent" />
        Saved for Later ({savedItems?.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {savedItems?.map((item) => (
          <div
            key={item?.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                {item?.name}
              </h3>
              
              {item?.variant && (
                <p className="text-sm text-muted-foreground mb-2">
                  {item?.variant}
                </p>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(item?.price)}
                </span>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(item?.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-3">
                <Icon 
                  name={item?.stock > 10 ? "CheckCircle" : item?.stock > 0 ? "AlertCircle" : "XCircle"} 
                  size={14} 
                  className={item?.stock > 10 ? "text-success" : item?.stock > 0 ? "text-warning" : "text-destructive"}
                />
                <span className={`text-xs ${item?.stock > 10 ? "text-success" : item?.stock > 0 ? "text-warning" : "text-destructive"}`}>
                  {item?.stock > 10 ? "In Stock" : item?.stock > 0 ? `Only ${item?.stock} left` : "Out of Stock"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onMoveToCart(item?.id)}
                  disabled={item?.stock === 0}
                  className="flex-1"
                >
                  <Icon name="ShoppingCart" size={14} className="mr-1" />
                  Move to Cart
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFromSaved(item?.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItems;