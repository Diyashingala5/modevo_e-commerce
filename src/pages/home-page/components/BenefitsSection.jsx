import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: 'Truck',
      title: 'Free Shipping',
      description: 'All purchases over $199 are eligible for free shipping via USPS First Class Mail.'
    },
    {
      icon: 'Check',
      title: 'Easy Payments',
      description: 'All payments are processed instantly over a secure payment protocol.'
    },
    {
      icon: 'Shield',
      title: 'Money-Back Guarantee',
      description: 'If an item arrived damaged or you have changed your mind, you can send it back for a full refund.'
    },
    {
      icon: 'Award',
      title: 'Finest Quality',
      description: 'Designed to last, each of our products has been crafted with the finest materials.'
    }
  ];

  return (
    <section className="w-full bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why should you choose us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Icon name={benefit.icon} size={24} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
