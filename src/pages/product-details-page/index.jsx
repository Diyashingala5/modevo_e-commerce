import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';
import CustomerHeader from '../../components/ui/CustomerHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';
import ReviewsSection from './components/ReviewsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams?.get('id');
  const { addToCart } = useCart();
  const { addNotification } = useNotification();

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [cartItemCount, setCartItemCount] = useState(3);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  // Mock product data - in real app, this would come from API
  const mockProducts = {
    1: {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      category: "Electronics",
      brand: "SoundTech",
      rating: 4.8,
      reviews: 1247,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 25,
      badge: "Best Seller",
      description: "Experience premium sound quality with these wireless Bluetooth headphones featuring advanced noise cancellation technology. Perfect for music lovers, professionals, and anyone who values superior audio performance.",
      features: [
        "Active Noise Cancellation",
        "40-hour battery life",
        "Wireless Bluetooth 5.0",
        "Premium materials",
        "Comfortable fit",
        "Built-in microphone"
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        "Impedance": "32 Ohms",
        "Battery Life": "40 hours",
        "Charging Time": "2 hours",
        "Weight": "250g",
        "Connectivity": "Bluetooth 5.0, 3.5mm jack",
        "Warranty": "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-3 business days",
        returnPolicy: "30-day free returns",
        warranty: "2-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "White", color: "#FFFFFF", available: true, priceAdjustment: 0 },
        { id: 3, name: "Blue", color: "#2563EB", available: true, priceAdjustment: 10 },
        { id: 4, name: "Red", color: "#DC2626", available: false, priceAdjustment: 15 }
      ],
      sizes: [
        { id: 1, name: "One Size", available: true }
      ]
    },
    2: {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      category: "Electronics",
      brand: "FitPro",
      rating: 4.6,
      reviews: 892,
      images: [
        "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?w=600&h=600&fit=crop",
        "https://images.pexels.com/photos/1999463/pexels-photo-1999463.jpeg?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 15,
      badge: "New Arrival",
      description: "Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and comprehensive health insights. Perfect companion for your active lifestyle.",
      features: [
        "Heart Rate Monitoring",
        "Built-in GPS",
        "Waterproof design",
        "Sleep tracking",
        "Multiple sport modes",
        "7-day battery life"
      ],
      specifications: {
        "Display": "1.4-inch AMOLED",
        "Battery Life": "7 days",
        "Water Resistance": "5ATM",
        "Connectivity": "Bluetooth 5.0, WiFi",
        "Sensors": "Heart rate, GPS, Accelerometer",
        "Compatibility": "iOS & Android",
        "Weight": "45g",
        "Warranty": "1 year"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "3-5 business days",
        returnPolicy: "30-day free returns",
        warranty: "1-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "Silver", color: "#C0C0C0", available: true, priceAdjustment: 0 },
        { id: 3, name: "Rose Gold", color: "#E91E63", available: true, priceAdjustment: 20 }
      ],
      sizes: [
        { id: 1, name: "Small (38mm)", available: true },
        { id: 2, name: "Large (42mm)", available: true }
      ]
    },
    3: {
      id: 3,
      name: "Premium Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      category: "Home & Kitchen",
      brand: "BrewMaster",
      rating: 4.9,
      reviews: 634,
      images: [
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 10,
      badge: "Editor's Choice",
      description: "Brew the perfect cup every time with this premium coffee maker. Features advanced brewing technology and a sleek design for your kitchen.",
      features: [
        "Advanced brewing technology",
        "Programmable timer",
        "Thermal carafe",
        "Easy-clean design",
        "Multiple brew strengths"
      ],
      specifications: {
        "Capacity": "1.5L",
        "Material": "Stainless Steel",
        "Power": "1000W",
        "Dimensions": "30x20x25cm",
        "Weight": "2.5kg",
        "Warranty": "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        returnPolicy: "30-day free returns",
        warranty: "2-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Silver", color: "#C0C0C0", available: true, priceAdjustment: 0 },
        { id: 2, name: "Black", color: "#000000", available: true, priceAdjustment: 10 }
      ],
      sizes: [
        { id: 1, name: "Standard", available: true }
      ]
    },
    4: {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 299.99,
      originalPrice: 399.99,
      category: "Office & Furniture",
      brand: "ComfortSeat",
      rating: 4.7,
      reviews: 456,
      images: [
        
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 8,
      badge: "Limited Offer",
      description: "Work in comfort with this ergonomic office chair. Adjustable features and premium materials for all-day support.",
      features: [
        "Adjustable height & tilt",
        "Lumbar support",
        "Breathable mesh",
        "Premium cushioning",
        "360-degree swivel"
      ],
      specifications: {
        "Material": "Mesh & Foam",
        "Max Weight": "120kg",
        "Color Options": "Black, Gray",
        "Warranty": "3 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "3-6 business days",
        returnPolicy: "30-day free returns",
        warranty: "3-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "Gray", color: "#808080", available: true, priceAdjustment: 0 }
      ],
      sizes: [
        { id: 1, name: "Standard", available: true }
      ]
    },
    5: {
      id: 5,
      name: "Portable Power Bank",
      price: 39.99,
      originalPrice: 59.99,
      category: "Electronics",
      brand: "ChargeGo",
      rating: 4.5,
      reviews: 1123,
      images: [
        "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 30,
      badge: "Hot Deal",
      description: "Stay powered up on the go with this portable power bank. Fast charging and high capacity for all your devices.",
      features: [
        "Fast charging",
        "High capacity",
        "Compact design",
        "Multiple device support"
      ],
      specifications: {
        "Capacity": "10000mAh",
        "Output": "2.1A",
        "Input": "Micro USB, USB-C",
        "Weight": "180g",
        "Warranty": "1 year"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-5 business days",
        returnPolicy: "30-day free returns",
        warranty: "1-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "White", color: "#FFFFFF", available: true, priceAdjustment: 0 }
      ],
      sizes: [
        { id: 1, name: "Standard", available: true }
      ]
    },
    6: {
      id: 6,
      name: "Wireless Charging Pad",
      price: 24.99,
      originalPrice: 34.99,
      category: "Electronics",
      brand: "PowerPad",
      rating: 4.4,
      reviews: 789,
      images: [
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 40,
      badge: "Trending",
      description: "Charge your devices wirelessly with this sleek charging pad. Fast charging and universal compatibility.",
      features: [
        "Fast wireless charging",
        "Universal compatibility",
        "Slim design",
        "LED indicator"
      ],
      specifications: {
        "Output": "10W",
        "Input": "USB-C",
        "Material": "Aluminum & Plastic",
        "Dimensions": "10x10x1cm",
        "Weight": "120g",
        "Warranty": "1 year"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        returnPolicy: "30-day free returns",
        warranty: "1-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "Silver", color: "#C0C0C0", available: true, priceAdjustment: 0 }
      ],
      sizes: [
        { id: 1, name: "Standard", available: true }
      ]
    },
    7: {
      id: 7,
      name: "Pro Gaming PC",
      price: 59.99,
      originalPrice: 399.99,
      category: "Gaming & Accessories",
      brand: "GameMaster",
      rating: 4.9,
      reviews: 1543,
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"
      ],
      inStock: true,
      stockQuantity: 50,
      badge: "Gamer's Choice",
      description: "Dominate your games with this high-precision pro gaming mouse. Features customizable buttons, RGB lighting, and ultra-fast response time.",
      features: [
        "Customizable buttons",
        "RGB lighting",
        "Ultra-fast response",
        "Ergonomic design",
        "High DPI sensor"
      ],
      specifications: {
        "Sensor": "Optical",
        "DPI": "16000",
        "Buttons": "8 programmable",
        "Connectivity": "Wired USB",
        "Weight": "120g",
        "Warranty": "2 years"
      },
      shippingInfo: {
        freeShipping: true,
        estimatedDelivery: "2-4 business days",
        returnPolicy: "30-day free returns",
        warranty: "2-year manufacturer warranty"
      },
      variants: [
        { id: 1, name: "Black", color: "#000000", available: true, priceAdjustment: 0 },
        { id: 2, name: "White", color: "#FFFFFF", available: true, priceAdjustment: 0 }
      ],
      sizes: [
        { id: 1, name: "Standard", available: true }
      ]
    }
  };

  // Load product data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const productData = mockProducts?.[productId] || mockProducts?.[1];
      setProduct(productData);
      setSelectedVariant(productData?.variants?.[0]);
      setLoading(false);
    }, 1000);
  }, [productId]);

  // Handle variant selection
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product?.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = (item = product) => {
    const cartProduct = {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.images?.[0] || item.image,
      variant: selectedVariant ? `${selectedVariant.color} - ${selectedVariant.size}` : 'Standard',
      stock: item.stock || 50
    };
    
    addToCart(cartProduct, quantity);
    addNotification(`${item.name} (${quantity}) added to cart!`, 'success');
    setShowCartSuccess(true);
    setTimeout(() => setShowCartSuccess(false), 1500);
  };  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/shopping-cart');
  };

  if (loading) {
    return (
      <>
        <CustomerHeader
          isAuthenticated={isAuthenticated}
          onCartClick={() => navigate('/shopping-cart')}
          onAuthClick={() => navigate('/user-profile-order-history')}
        />
        <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <CustomerHeader
          isAuthenticated={isAuthenticated}
          onCartClick={() => navigate('/shopping-cart')}
          onAuthClick={() => navigate('/user-profile-order-history')}
        />
        <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/products-list-page')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
            >
              Browse Products
            </button>
          </div>
        </div>
      </>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/home-page' },
    { label: 'Products', href: '/products-list-page' },
    { label: product?.category, href: `/products-list-page?category=${product?.category}` },
    { label: product?.name, active: true }
  ];

  return (
    <>
      <Helmet>
        <title>{product?.name} - Modévo</title>
        <meta 
          name="description" 
          content={product?.description}
        />
        <meta name="keywords" content={`${product?.name}, ${product?.brand}, ${product?.category}, online shopping`} />
        <link rel="canonical" href={`/product-details-page?id=${product?.id}`} />
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
            <BreadcrumbTrail items={breadcrumbItems} className="mb-8" />

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Product Images */}
              <ProductImageGallery images={product?.images} productName={product?.name} />

              {/* Product Info */}
              <ProductInfo
                product={product}
                selectedVariant={selectedVariant}
                quantity={quantity}
                onVariantChange={handleVariantChange}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
              {/* Add to Cart Button */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                  disabled={product?.stockQuantity === 0}
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Add to Cart
                </Button>
                {showCartSuccess && (
                  <div className="mt-2 text-success text-sm">Added to cart!</div>
                )}
              </div>
            </div>

            {/* Product Tabs */}
            <ProductTabs
              product={product}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="mb-16"
            />

            {/* Reviews Section */}
            <ReviewsSection
              productId={product?.id}
              rating={product?.rating}
              reviewCount={product?.reviews}
              className="mb-16"
            />

            {/* Related Products */}
            <RelatedProducts
              currentProductId={product?.id}
              category={product?.category}
              onProductClick={(id) => navigate(`/product-details-page?id=${id}`)}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetailsPage;