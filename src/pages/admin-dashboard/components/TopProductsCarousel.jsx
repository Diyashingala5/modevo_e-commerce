import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TopProductsCarousel = ({ loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const topProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      sales: 245,
      revenue: "$12,250",
      growth: "+15%",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?w=300&h=300&fit=crop",
      sales: 189,
      revenue: "$3,780",
      growth: "+8%",
      category: "Food & Beverage"
    },
    {
       id: 3,
      name: "Fitness Tracker",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=300&h=300&fit=crop",
      sales: 198,
      revenue: "$19,800",
      growth: "+18%",
      category: "Health & Fitness"
    },
    {
      id: 4,
      name: "Smartphone Case",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop",
      sales: 312,
      revenue: "$4,680",
      growth: "+12%",
      category: "Accessories"
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      image: "https://images.pixabay.com/photo/2016/11/19/15/32/chair-1840011_1280.jpg?w=300&h=300&fit=crop",
      sales: 156,
      revenue: "$23,400",
      growth: "+22%",
      category: "Furniture"
    }
  ];

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, topProducts?.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleProducts = topProducts?.slice(currentIndex, currentIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="h-6 bg-muted rounded w-40 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)]?.map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded mb-3"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Top Selling Products</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="h-8 w-8 p-0"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleProducts?.map((product, index) => (
            <div key={product?.id} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-smooth">
              {/* Product Image */}
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                    #{index + currentIndex + 1}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">
                  {product?.name}
                </h3>
                <p className="text-xs text-muted-foreground">{product?.category}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Sales: {product?.sales}</span>
                  <span className="text-success font-medium">{product?.growth}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{product?.revenue}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(topProducts?.length / itemsPerPage) })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* View All Button 
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigation('/admin-product-management')}
          >
            <Icon name="ArrowRight" size={16} className="mr-2" />
            View All Products
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default TopProductsCarousel;