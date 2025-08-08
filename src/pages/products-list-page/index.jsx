import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import CustomerHeader from '../../components/ui/CustomerHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import FiltersSidebar from './components/FiltersSidebar';
import ProductGrid from './components/ProductGrid';
import SortingDropdown from './components/SortingDropdown';
import ViewToggle from './components/ViewToggle';
import PaginationControls from './components/PaginationControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductsListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    brands: [],
    rating: 0,
    availability: 'all'
  });

  const itemsPerPage = 12;

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      category: "Electronics",
      brand: "SoundTech",
      rating: 4.8,
      reviews: 1247,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      inStock: true,
      badge: "Best Seller",
      description: "Premium wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      category: "Electronics",
      brand: "FitPro",
      rating: 4.6,
      reviews: 892,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=400&h=400&fit=crop",
      inStock: true,
      badge: "New Arrival",
      description: "Advanced fitness tracking with heart rate monitor"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      category: "Home & Kitchen",
      brand: "BrewMaster",
      rating: 4.9,
      reviews: 634,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop",
      inStock: true,
      badge: "Editor\'s Choice",
      description: "Professional-grade coffee maker with precision brewing"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 299.99,
      originalPrice: 399.99,
      category: "Furniture",
      brand: "ComfortSeating",
      rating: 4.7,
      reviews: 456,
      image:  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=600&fit=crop",
      inStock: false,
      badge: "Limited Offer",
      description: "Ergonomic design with lumbar support and adjustable features"
    },
    {
      id: 5,
      name: "Portable Power Bank",
      price: 39.99,
      originalPrice: 59.99,
      category: "Electronics",
      brand: "PowerCore",
      rating: 4.5,
      reviews: 1123,
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?w=400&h=400&fit=crop",
      inStock: true,
      badge: "Hot Deal",
      description: "High-capacity portable charger with fast charging"
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 24.99,
      originalPrice: 34.99,
      category: "Electronics",
      brand: "ChargePro",
      rating: 4.4,
      reviews: 789,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=600&fit=crop",
      inStock: true,
      badge: "Trending",
      description: "Fast wireless charging for compatible devices"
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 159.99,
      category: "Electronics",
      brand: "GameTech",
      rating: 4.6,
      reviews: 543,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      inStock: true,
      badge: "Gaming Essential",
      description: "RGB backlit mechanical keyboard with custom switches"
    },
    {
      id: 8,
      name: "Stainless Steel Water Bottle",
      price: 29.99,
      originalPrice: 39.99,
      category: "Sports & Outdoors",
      brand: "HydroFlask",
      rating: 4.8,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      inStock: true,
      badge: "Eco-Friendly",
      description: "Insulated stainless steel bottle keeps drinks cold/hot"
    }
  ];

  // Initialize products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Apply price range filter
    filtered = filtered?.filter(product => 
      product?.price >= filters?.priceRange?.[0] && product?.price <= filters?.priceRange?.[1]
    );

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product => filters?.brands?.includes(product?.brand));
    }

    // Apply rating filter
    if (filters?.rating > 0) {
      filtered = filtered?.filter(product => product?.rating >= filters?.rating);
    }

    // Apply availability filter
    if (filters?.availability === 'inStock') {
      filtered = filtered?.filter(product => product?.inStock);
    } else if (filters?.availability === 'outOfStock') {
      filtered = filtered?.filter(product => !product?.inStock);
    }

    // Apply sorting
    switch (sortOption) {
      case 'priceLowToHigh':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'priceHighToLow':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'popularity':
        filtered?.sort((a, b) => b?.reviews - a?.reviews);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters, sortOption]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle sorting change
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product-details-page?id=${productId}`);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      variant: product.category || 'Standard',
      stock: product.stock || 50
    };
    
    addToCart(cartProduct, 1);
    addNotification(`${product.name} added to cart!`, 'success');
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts?.slice(startIndex, endIndex);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/home-page' },
    { label: 'Products', href: '/products-list-page', active: true }
  ];

  return (
    <>
      <Helmet>
        <title>Products - Modévo</title>
        <meta 
          name="description" 
          content="Browse our extensive collection of high-quality products. Find electronics, home goods, fashion, and more with fast shipping and great prices." 
        />
        <meta name="keywords" content="products, online shopping, electronics, home goods, fashion" />
        <link rel="canonical" href="/products-list-page" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <CustomerHeader
          isAuthenticated={isAuthenticated}
          onCartClick={() => navigate('/shopping-cart')}
          onAuthClick={() => navigate('/user-profile-order-history')}
        />

        {/* Main Content */}
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <BreadcrumbTrail items={breadcrumbItems} className="mb-6" />

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
                <p className="text-muted-foreground">
                  {loading ? 'Loading products...' : `${filteredProducts?.length} products found`}
                </p>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  onClick={() => setIsSidebarOpen(true)}
                  iconName="Filter"
                  className="lg:hidden"
                >
                  Filters
                </Button>
                
                <div className="flex items-center space-x-2">
                  <SortingDropdown value={sortOption} onChange={handleSortChange} />
                  <ViewToggle value={viewMode} onChange={handleViewModeChange} />
                </div>
              </div>
            </div>

            <div className="flex gap-8">
              {/* Filters Sidebar */}
              <FiltersSidebar
                filters={filters}
                onFiltersChange={handleFilterChange}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                products={products}
              />

              {/* Products Grid */}
              <div className="flex-1">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading products...</p>
                    </div>
                  </div>
                ) : filteredProducts?.length === 0 ? (
                  <div className="text-center py-20">
                    <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results</p>
                    <Button
                      variant="outline"
                      onClick={() => setFilters({
                        category: '',
                        priceRange: [0, 1000],
                        brands: [],
                        rating: 0,
                        availability: 'all'
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <ProductGrid
                      products={currentProducts}
                      viewMode={viewMode}
                      onProductClick={handleProductClick}
                      onAddToCart={handleAddToCart}
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        className="mt-8"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductsListPage;