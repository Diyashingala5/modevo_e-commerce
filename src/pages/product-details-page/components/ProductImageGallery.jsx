import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = '' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images?.length);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!images || images?.length === 0) {
    return (
      <div className="bg-muted rounded-lg flex items-center justify-center h-96">
        <Icon name="Image" size={48} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-card rounded-lg overflow-hidden">
        <div
          className="relative w-full aspect-square cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={toggleZoom}
        >
          <Image
            src={images?.[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={{
              transformOrigin: isZoomed ? `${zoomPosition?.x}% ${zoomPosition?.y}%` : 'center'
            }}
          />
          
          {/* Zoom Icon */}
          <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
          </div>
        </div>

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevImage}
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handleNextImage}
            >
              <Icon name="ChevronRight" size={24} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images?.length}
          </div>
        )}
      </div>
      {/* Thumbnail Images */}
      {images?.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square bg-card rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-0 bg-primary/10" />
              )}
            </button>
          ))}
        </div>
      )}
      {/* Zoom Instructions */}
      <div className="text-center text-sm text-muted-foreground hidden md:block">
        Click or hover on image to zoom
      </div>
    </div>
  );
};

export default ProductImageGallery;