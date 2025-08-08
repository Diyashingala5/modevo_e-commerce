import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", action: () => navigate('/shopping-cart') },
        { name: "New Arrivals", action: () => navigate('/shopping-cart') },
        { name: "Best Sellers", action: () => navigate('/shopping-cart') },
        { name: "Sale Items", action: () => navigate('/shopping-cart') },
        { name: "Gift Cards", action: () => navigate('/shopping-cart') }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", action: () => console.log('Contact Us') },
        { name: "FAQ", action: () => console.log('FAQ') },
        { name: "Shipping Info", action: () => console.log('Shipping Info') },
        { name: "Returns", action: () => console.log('Returns') },
        { name: "Size Guide", action: () => console.log('Size Guide') }
      ]
    },
    {
      title: "Account",
      links: [
        { name: "My Account", action: () => navigate('/user-profile-order-history') },
        { name: "Order History", action: () => navigate('/user-profile-order-history') },
        { name: "Wishlist", action: () => navigate('/user-profile-order-history') },
        { name: "Track Order", action: () => navigate('/user-profile-order-history') },
        { name: "Sign In", action: () => navigate('/user-profile-order-history') }
      ]
    },
    {
      title: "Contact",
      links: [
        {
          name: (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground flex items-center"><Icon name="Mail" size={16} className="mr-2" /> support@modevo.com</p> <br/>
              <p className="text-sm text-muted-foreground flex items-center"><Icon name="Phone" size={16} className="mr-2" /> +1 (555) 123-4567</p> 
              <p className="text-sm text-muted-foreground flex items-center"><Icon name="MapPin" size={30} className="mr-2" /> ... ModeCommerceAve,ahmedabad , gujarat, India.</p>
            </div>
          ),
          action: () => {}
        }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com" }
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "American Express", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" }
  ];

  return (
    <footer className="bg-orange-50 border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Icon name="ShoppingBag" size={20} color="white" />
              </div>
              <span className="text-xl font-bold text-foreground">Modévo</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products, 
              exceptional service, and unbeatable prices since 2020.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  aria-label={social?.name}
                >
                  <Icon 
                    name={social?.icon} 
                    size={18} 
                    className="text-muted-foreground group-hover:text-white transition-colors duration-200" 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="lg:col-span-1">
              <h3 className="text-foreground font-semibold mb-4">{section?.title}</h3>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.name}>
                    <button
                      onClick={link?.action}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link?.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

     
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Modévo. All rights reserved.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 mt-2">
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </button>
                <span className="text-xs text-muted-foreground">•</span>
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                  Terms of Service
                </button>
                <span className="text-xs text-muted-foreground">•</span>
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                  Cookie Policy
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground mr-2">We accept:</span>
              {paymentMethods?.map((method, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-card border border-border rounded flex items-center justify-center"
                  title={method?.name}
                >
                  <Icon name={method?.icon} size={14} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Truck" size={14} />
                <span>Free Shipping Over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={14} />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={14} />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;