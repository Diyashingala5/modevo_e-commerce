import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductInfo = ({
  product,
  selectedVariant,
  quantity,
  onVariantChange,
  onQuantityChange,
  onAddToCart,
  onBuyNow
}) => {
  const [isWishListed, setIsWishListed] = useState(false);

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
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-yellow-400 fill-current" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
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
      'Trending': 'bg-secondary text-secondary-foreground'
    };
    return badgeStyles?.[badge] || 'bg-muted text-muted-foreground';
  };

  const calculateCurrentPrice = () => {
    const basePrice = product?.price || 0;
    const variantAdjustment = selectedVariant?.priceAdjustment || 0;
    return basePrice + variantAdjustment;
  };

  const handleWishlistToggle = () => {
    setIsWishListed(!isWishListed);
  };

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: variant?.name,
    disabled: !variant?.available
  })) || [];

  const sizeOptions = product?.sizes?.map(size => ({
    value: size?.id,
    label: size?.name,
    disabled: !size?.available
  })) || [];

  return (
    <div className="space-y-6">
      {/* Badge */}
      {product?.badge && (
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBadgeStyles(product?.badge)}`}>
          {product?.badge}
        </div>
      )}
      {/* Product Name */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{product?.name}</h1>
        <p className="text-lg text-muted-foreground">by {product?.brand}</p>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">{product?.rating}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          ({product?.reviews?.toLocaleString()} reviews)
        </div>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-foreground">
            {formatCurrency(calculateCurrentPrice())}
          </span>
          {product?.originalPrice > calculateCurrentPrice() && (
            <span className="text-xl text-muted-foreground line-through">
              {formatCurrency(product?.originalPrice)}
            </span>
          )}
          {product?.originalPrice > calculateCurrentPrice() && (
            <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-sm font-bold">
              -{Math.round(((product?.originalPrice - calculateCurrentPrice()) / product?.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-success">Free shipping on orders over $50</p>
      </div>
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <Icon 
          name={product?.inStock ? "CheckCircle" : "XCircle"} 
          size={20} 
          className={product?.inStock ? "text-success" : "text-destructive"} 
        />
        <span className={`font-medium ${product?.inStock ? "text-success" : "text-destructive"}`}>
          {product?.inStock ? `In Stock (${product?.stockQuantity} available)` : 'Out of Stock'}
        </span>
      </div>
      {/* Variant Selection */}
      {product?.variants && product?.variants?.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Color:</h3>
          <div className="flex items-center space-x-2">
            {product?.variants?.map((variant) => (
              <button
                key={variant?.id}
                onClick={() => variant?.available && onVariantChange(variant)}
                disabled={!variant?.available}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedVariant?.id === variant?.id
                    ? 'border-primary shadow-md scale-110'
                    : 'border-border hover:border-primary/50'
                } ${!variant?.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ backgroundColor: variant?.color }}
                title={variant?.name}
              >
                {!variant?.available && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="X" size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Selected: {selectedVariant?.name}
            {selectedVariant?.priceAdjustment !== 0 && (
              <span className="ml-1">
                ({selectedVariant?.priceAdjustment > 0 ? '+' : ''}{formatCurrency(selectedVariant?.priceAdjustment)})
              </span>
            )}
          </p>
        </div>
      )}
      {/* Size Selection */}
      {product?.sizes && product?.sizes?.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Size:</h3>
          <Select
            options={sizeOptions}
            placeholder="Select size"
            className="w-full"
          />
        </div>
      )}
      {/* Quantity Selector */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Quantity:</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="rounded-none border-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= product?.stockQuantity}
              className="rounded-none border-none"
            >
              <Icon name="Plus" size={16} />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stockQuantity} available
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onAddToCart}
            disabled={!product?.inStock}
            iconName="ShoppingCart"
            iconPosition="left"
            fullWidth
          >
            Add to Cart
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={onBuyNow}
            disabled={!product?.inStock}
            iconName="CreditCard"
            iconPosition="left"
            fullWidth
          >
            Buy Now
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleWishlistToggle}
          iconName={isWishListed ? "Heart" : "Heart"}
          iconPosition="left"
          fullWidth
          className={isWishListed ? "text-red-500" : ""}
        >
          {isWishListed ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>
      {/* Product Features */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground">Key Features:</h3>
        <ul className="space-y-2">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Check" size={16} className="text-success" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Shipping Info */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Truck" size={16} className="text-success" />
          <span className="text-foreground">
            {product?.shippingInfo?.freeShipping ? 'Free shipping' : 'Paid shipping'}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">
            Estimated delivery: {product?.shippingInfo?.estimatedDelivery}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="RotateCcw" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">
            {product?.shippingInfo?.returnPolicy}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;