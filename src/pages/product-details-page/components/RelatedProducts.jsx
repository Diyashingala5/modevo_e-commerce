import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ currentProductId, category, onProductClick }) => {
  // Mock related products data
  const mockRelatedProducts = [
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 634,
      image: "https://images.pixabay.com/photo/2017/09/04/18/39/coffee-2714970_1280.jpg?w=400&h=400&fit=crop",
      badge: "Editor\'s Choice"
    },
    {
      id: 5,
      name: "Portable Power Bank",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.5,
      reviews: 1123,
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?w=400&h=400&fit=crop",
      badge: "Hot Deal"
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.4,
      reviews: 789,
      image: "https://images.pixabay.com/photo/2020/05/25/17/21/link-5219567_1280.jpg?w=400&h=400&fit=crop",
      badge: "Trending"
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.6,
      reviews: 543,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      badge: "Gaming Essential"
    }
  ];

  // Filter out current product and limit to 4 items
  const relatedProducts = mockRelatedProducts?.filter(product => product?.id !== currentProductId)?.slice(0, 4);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={12} className="text-yellow-400 fill-current" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getBadgeStyles = (badge) => {
    const badgeStyles = {
      'Best Seller': 'bg-accent text-accent-foreground',
      'New Arrival': 'bg-success text-success-foreground',
      "Editor's Choice": 'bg-primary text-primary-foreground',
      'Limited Offer': 'bg-warning text-warning-foreground',
      'Hot Deal': 'bg-destructive text-destructive-foreground',
      'Trending': 'bg-secondary text-secondary-foreground',
      'Gaming Essential': 'bg-purple-600 text-white'
    };
    return badgeStyles?.[badge] || 'bg-muted text-muted-foreground';
  };

  if (relatedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Related Products</h2>
          <p className="text-muted-foreground">You might also like these items</p>
        </div>
        <Button
          variant="outline"
          onClick={() => onProductClick && window.open('/products-list-page', '_blank')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div
            key={product?.id}
            className="group bg-background rounded-lg border border-border hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <div 
                className="cursor-pointer"
                onClick={() => onProductClick && onProductClick(product?.id)}
              >
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Badge */}
              {product?.badge && (
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(product?.badge)}`}>
                  {product?.badge}
                </div>
              )}

              {/* Discount Badge */}
              {product?.originalPrice > product?.price && (
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
                  -{Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}%
                </div>
              )}

              {/* Quick Actions */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onProductClick && onProductClick(product?.id)}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Quick View
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 
                className="font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
                onClick={() => onProductClick && onProductClick(product?.id)}
              >
                {product?.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviews?.toLocaleString()})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="font-bold text-foreground">
                  {formatCurrency(product?.price)}
                </span>
                {product?.originalPrice > product?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(product?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => console.log('Added to cart:', product?.name)}
                iconName="ShoppingCart"
                iconPosition="left"
                className="text-sm"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* View All Link */}
      <div className="text-center mt-8">
        <Button
          variant="ghost"
          onClick={() => onProductClick && window.open('/products-list-page', '_blank')}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;