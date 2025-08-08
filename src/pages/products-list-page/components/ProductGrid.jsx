import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ products, viewMode, onProductClick, onAddToCart }) => {
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
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
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
      'Gaming Essential': 'bg-purple-600 text-white',
      'Eco-Friendly': 'bg-green-600 text-white'
    };
    return badgeStyles?.[badge] || 'bg-muted text-muted-foreground';
  };

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div 
                  className="w-full md:w-48 h-48 cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => onProductClick(product?.id)}
                >
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div className="flex-1">
                    {/* Badge */}
                    {product?.badge && (
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getBadgeStyles(product?.badge)}`}>
                        {product?.badge}
                      </div>
                    )}

                    {/* Product Name */}
                    <h3 
                      className="text-xl font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors duration-200"
                      onClick={() => onProductClick(product?.id)}
                    >
                      {product?.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {product?.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(product?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product?.rating} ({product?.reviews?.toLocaleString()})
                      </span>
                    </div>

                    {/* Brand & Stock Status */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Brand: {product?.brand}</span>
                      <span className={`${product?.inStock ? 'text-success' : 'text-destructive'}`}>
                        {product?.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex-shrink-0 text-right">
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-foreground">
                        {formatCurrency(product?.price)}
                      </div>
                      {product?.originalPrice > product?.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatCurrency(product?.originalPrice)}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        disabled={!product?.inStock}
                        iconName="ShoppingCart"
                        iconPosition="left"
                        className="w-full md:w-auto"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onProductClick(product?.id)}
                        className="w-full md:w-auto"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <div
          key={product?.id}
          className="group bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <div 
              className="cursor-pointer"
              onClick={() => onProductClick(product?.id)}
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

            {/* Stock Status */}
            {!product?.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="default"
                size="sm"
                onClick={() => onProductClick(product?.id)}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Quick View
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 
              className="text-lg font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
              onClick={() => onProductClick(product?.id)}
            >
              {product?.name}
            </h3>

            {/* Brand */}
            <p className="text-sm text-muted-foreground mb-2">{product?.brand}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(product?.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product?.reviews?.toLocaleString()})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-foreground">
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
              variant="default"
              fullWidth
              onClick={() => onAddToCart(product)}
              disabled={!product?.inStock}
              iconName="ShoppingCart"
              iconPosition="left"
              className="font-medium"
            >
              {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;