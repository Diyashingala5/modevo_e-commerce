import React from 'react';
import { cn } from '../../../utils/cn';

const ProductTabs = ({ product, activeTab, onTabChange, className }) => {
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'shipping', label: 'Shipping & Returns' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              {product?.description}
            </p>
            {product?.features && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground mb-4">Technical Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product?.specifications && Object.entries(product?.specifications)?.map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium text-foreground">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Shipping Information</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Shipping:</strong> {product?.shippingInfo?.freeShipping ? 'Free shipping on all orders' : 'Standard shipping rates apply'}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong> {product?.shippingInfo?.estimatedDelivery}
                </p>
                <p>
                  <strong>Processing Time:</strong> 1-2 business days
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Returns & Exchanges</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Return Policy:</strong> {product?.shippingInfo?.returnPolicy}
                </p>
                <p>
                  <strong>Condition:</strong> Items must be unused and in original packaging
                </p>
                <p>
                  <strong>Return Shipping:</strong> Free return shipping for defective items
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Warranty</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Warranty Period:</strong> {product?.shippingInfo?.warranty}
                </p>
                <p>
                  <strong>Coverage:</strong> Manufacturing defects and normal wear
                </p>
                <p>
                  <strong>Support:</strong> 24/7 customer service available
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={cn(
              "px-6 py-4 font-medium text-sm transition-colors duration-200 border-b-2",
              activeTab === tab?.id
                ? "text-primary border-primary bg-primary/5" :"text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;