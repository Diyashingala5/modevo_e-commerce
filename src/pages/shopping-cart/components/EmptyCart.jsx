import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  const recommendedProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: "Portable Phone Charger",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1609592806787-3d9c4d5b4b8e?w=300&h=300&fit=crop",
      rating: 4.3,
      reviews: 256
    },
    {
      id: 4,
      name: "Laptop Stand Adjustable",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 94
    }
  ];

  const categories = [
    { name: "Electronics", icon: "Smartphone", count: 245 },
    { name: "Fashion", icon: "Shirt", count: 189 },
    { name: "Home & Garden", icon: "Home", count: 156 },
    { name: "Sports", icon: "Dumbbell", count: 98 },
    { name: "Books", icon: "Book", count: 312 },
    { name: "Beauty", icon: "Sparkles", count: 87 }
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Empty Cart Illustration */}
      <div className="text-center mb-12">
        <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
        </p>
        
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate('/home-page')}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Continue Shopping
        </Button>
      </div>
      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate('/home-page')}
              className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-elevated transition-smooth hover:border-primary/20"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">
                {category?.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category?.count} items
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Recommended Products */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          You might like these
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth group cursor-pointer"
              onClick={() => navigate('/home-page')}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product?.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(product?.rating)}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product?.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(product?.price)}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={(e) => {
                    e?.stopPropagation();
                    navigate('/home-page');
                  }}
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
      {/* Help Section */}
      <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
        <Icon name="HelpCircle" size={32} className="text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Need help finding something?
        </h3>
        <p className="text-muted-foreground mb-4">
          Our customer service team is here to help you find exactly what you're looking for.
        </p>
        <Button variant="outline" onClick={() => navigate('/home-page')}>
          <Icon name="MessageCircle" size={16} className="mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;