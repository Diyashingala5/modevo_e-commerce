import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CategoryShowcase = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Fashion & Apparel",
      description: "Trendy clothing for all occasions",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?w=400&h=300&fit=crop",
      icon: "Shirt",
      itemCount: "2,500+ items",
      color: "from-pink-500 to-rose-600",
      products: [
        { id: 101, name: "T-Shirt", price: "$20", image: "https://via.placeholder.com/150" },
        { id: 102, name: "Jeans", price: "$40", image: "https://via.placeholder.com/150" }
      ]
    },
    {
      id: 2,
      name: "Electronics",
      description: "Latest gadgets and tech accessories",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      icon: "Smartphone",
      itemCount: "1,200+ items",
      color: "from-blue-500 to-cyan-600",
      products: [
        { id: 201, name: "Smartphone", price: "$500", image: "https://via.placeholder.com/150" },
        { id: 202, name: "Laptop", price: "$1200", image: "https://via.placeholder.com/150" }
      ]
    },
    {
      id: 3,
      name: "Home & Garden",
      description: "Everything for your perfect home",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      icon: "Home",
      itemCount: "800+ items",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      name: "Sports & Fitness",
      description: "Gear up for your active lifestyle",
      image: "https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?w=400&h=300&fit=crop",
      icon: "Dumbbell",
      itemCount: "600+ items",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 5,
      name: "Books & Media",
      description: "Knowledge and entertainment collection",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
      icon: "Book",
      itemCount: "1,500+ items",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 6,
      name: "Beauty & Health",
      description: "Self-care and wellness products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      icon: "Heart",
      itemCount: "900+ items",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of products across different categories. 
            Find exactly what you're looking for with our curated collections.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <div
              key={category?.id}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category?.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Icon name={category?.icon} size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{category?.name}</h3>
                    <p className="text-sm text-white/80">{category?.itemCount}</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 mb-4">
                  {category?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Category Products */}
        {selectedCategory && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Products in {selectedCategory.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCategory.products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                  <Image src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                  <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;