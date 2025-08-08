import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Mock subscription process
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: "Tag",
      title: "Exclusive Deals",
      description: "Get access to member-only discounts and flash sales"
    },
    {
      icon: "Zap",
      title: "Early Access",
      description: "Be the first to shop new arrivals and limited editions"
    },
    {
      icon: "Gift",
      title: "Special Offers",
      description: "Receive personalized recommendations and birthday surprises"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} color="white" />
            </div>
            <h2 className="text-3xl font-bold text-orange-900 mb-4">
              Welcome to NextCommerce Pro!
            </h2>
            <p className="text-xl text-orange-800 mb-6">
              Thank you for subscribing! You'll receive an email shortly with your inbox for a special welcome offer.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              className="bg-white/20 border-white/30 text-orange-900 hover:bg-white/30"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-orange-900 mb-4">
                Stay in the Loop
              </h2>
              <p className="text-xl text-orange-800 mb-8">
                Join over 50,000 subscribers and never miss out on the latest deals, 
                new arrivals, and exclusive member benefits.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 text-left">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit?.icon} size={20} color="orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 mb-1">
                        {benefit?.title}
                      </h3>
                      <p className="text-orange-800 text-sm">
                        {benefit?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-orange-900 mb-2">
                    Subscribe Now
                  </h3>
                  <p className="text-orange-800">
                    Get 15% off your first order when you subscribe!
                  </p>
                </div>

                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                  className="bg-white/20 border-white/30 text-orange-900 placeholder:text-orange-400 focus:bg-white/30"
                />

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  disabled={!email}
                  className="bg-orange-500 text-white hover:bg-orange-600 font-semibold"
                  iconName="Mail"
                  iconPosition="left"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe & Save 15%'}
                </Button>

                <p className="text-xs text-orange-700 text-center">
                  By subscribing, you agree to our Privacy Policy and Terms of Service. 
                  Unsubscribe at any time.
                </p>
              </form>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center space-x-6 text-orange-700">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} />
                    <span className="text-sm">Secure</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">50K+ Members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} />
                    <span className="text-sm">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;