import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { useNotification } from '../../../contexts/NotificationContext';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  const [currentPage, setCurrentPage] = useState(0);

  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.8,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      badge: "Best Seller",
      badgeColor: "bg-accent text-accent-foreground"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.6,
      reviews: 892,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=400&h=400&fit=crop",
      badge: "New Arrival",
      badgeColor: "bg-success text-success-foreground"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      rating: 4.9,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop",
      badge: "Editor\'s Choice",
      badgeColor: "bg-primary text-primary-foreground"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.7,
      reviews: 456,
      image:  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=600&fit=crop",
      badge: "Limited Offer",
      badgeColor: "bg-warning text-warning-foreground"
    },
    {
      id: 5,
      name: "Portable Power Bank",
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.5,
      reviews: 1123,
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?w=400&h=400&fit=crop",
      badge: "Hot Deal",
      badgeColor: "bg-destructive text-destructive-foreground"
    },
    {
      id: 7,
     name: "Pro Gaming PC",
     price: 59.99,
     originalPrice: 399.99,
      discount: 33,
      rating: 4.9,
      reviews: 1543,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop", // Corrected property
      badge: "Trending",
      badgeColor: "bg-secondary text-secondary-foreground"
    }
  ];

  const visibleProducts = trendingProducts; // Display all products

  const handleAddToCart = (product) => {
    // Add product to cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      variant: `Badge: ${product.badge}`,
      stock: 50 // Default stock value
    };
    
    addToCart(cartProduct, 1);
    
    // Show success notification
    addNotification(`${product.name} added to cart!`, 'success');
  };

   // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product-details-page?id=${productId}`);
  };

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

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Trending Products
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover what's popular right now
            </p>
          </div>
        </div>

        {/* Products Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleProducts?.map((product) => (
            <div
              key={product?.id}
               className="group bg-gray-100 rounded-2xl border border-border shadow-subtle hover:shadow-elevated transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${product?.badgeColor}`}>
                  {product?.badge}
                </div>

                {/* Discount Badge */}
                {product?.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
                    -{product?.discount}%
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleProductClick(product.id)}
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 
                  className="text-lg font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors duration-200 line-clamp-2"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product?.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product?.rating} ({product?.reviews?.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {formatCurrency(product?.price)}
                  </span>
                  {product?.originalPrice > product?.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatCurrency(product?.originalPrice)}
                    </span>
                  )}
                </div>

                 {/* Show Details Button */}
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => handleProductClick(product.id)}
                  iconName="Eye"
                  iconPosition="left"
                  className="mb-2 font-medium"
                >
                  Show Details
                </Button>
                
                {/* Add to Cart Button */}
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  className="font-medium"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;