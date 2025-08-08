import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentlyViewed = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const recentlyViewedItems = [
    {
      id: 101,
      name: "Premium Wireless Mouse",
      price: 34.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      stock: 15
    },
    {
      id: 102,
      name: "USB-C Hub Adapter",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 123,
      stock: 8
    },
    {
      id: 103,
      name: "Mechanical Keyboard",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 234,
      stock: 22
    },
    {
      id: 104,
      name: "Desk Organizer Set",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
      rating: 4.2,
      reviews: 45,
      stock: 12
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clock" size={20} className="text-muted-foreground" />
          Recently Viewed
        </h2>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home-page')}
          className="text-primary hover:text-primary"
        >
          View All
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentlyViewedItems?.map((item) => (
          <div
            key={item?.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth group"
          >
            <div className="aspect-square overflow-hidden bg-muted cursor-pointer"
                 onClick={() => navigate('/home-page')}>
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-2 line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate('/home-page')}>
                {item?.name}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                {renderStars(item?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({item?.reviews})
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(item?.price)}
                </span>
                {item?.originalPrice && (
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
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleAddToCart(item)}
                disabled={item?.stock === 0}
                className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;