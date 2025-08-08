import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// Move heroSlides outside the component to avoid re-creation on every render
const heroSlides = [
  {
    id: 1,
    title: "Sale of the",
    subtitle: "summer",
    description: "collection",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
    ctaText: "Shop now",
    bgColor: "from-black/10 to-black/30"
  },
  {
    id: 2,
    title: "Sale of the",
    subtitle: "summer",
    description: "collection",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
    ctaText: "Shop now",
    bgColor: "from-black/10 to-black/30"
  },
  {
    id: 3,
    title: "Sale of the",
    subtitle: "summer",
    description: "collection",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=600&fit=crop",
    ctaText: "Shop now",
    bgColor: "from-black/10 to-black/30"
  },
  {
    id: 4,
    title: "Sale of the",
    subtitle: "summer",
    description: "collection",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    ctaText: "Shop now",
    bgColor: "from-black/10 to-black/30"
  }
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides?.length]);


  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <>
      <section className="relative h-[600px] lg:h-[800px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={currentHero?.image}
            alt={currentHero?.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentHero?.bgColor}`} />
        </div>
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                  {currentHero?.title}
                </h1>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                  {currentHero?.subtitle}
                </h2>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                  {currentHero?.description}
                </h2>
                <div className="pt-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate('/products-list-page')}
                    className="bg-orange-500 text-white hover:bg-orange-600 rounded-full font-medium px-8 py-4 text-lg transition-all duration-300"
                  >
                    {currentHero?.ctaText}
                    <Icon name="ArrowRight" size={24} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Previous slide"
        >
          <Icon name="ChevronLeft" size={28} color="white" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Next slide"
        >
          <Icon name="ChevronRight" size={28} color="white" />
        </button>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Icon name="Truck" size={32} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-500">On purchases over $199</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Icon name="ThumbsUp" size={32} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">99% Satisfied Customers</h3>
                <p className="text-sm text-gray-500">Our clients' opinions speak for themselves</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Icon name="Shield" size={32} className="text-orange-500" />
              <div>
                <h3 className="font-semibold text-gray-900">Originality Guaranteed</h3>
                <p className="text-sm text-gray-500">30 days warranty for each product from our store</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;