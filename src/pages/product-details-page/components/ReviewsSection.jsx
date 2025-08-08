import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const ReviewsSection = ({ productId, rating, reviewCount, className }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      rating: 5,
      date: "2024-07-15",
      title: "Excellent quality and fast shipping!",
      comment: "I\'m really impressed with the quality of this product. It arrived exactly as described and the shipping was incredibly fast. Would definitely recommend to others.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      userName: "Mike Chen",
      rating: 4,
      date: "2024-07-10",
      title: "Good value for money",
      comment: "Overall satisfied with the purchase. The product works well and the price is reasonable. Only minor issue is that it took a bit longer to set up than expected.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      userName: "Emily Davis",
      rating: 5,
      date: "2024-07-08",
      title: "Perfect for my needs",
      comment: "This product is exactly what I was looking for. Great build quality, easy to use, and excellent customer service. Will definitely buy from this brand again.",
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      userName: "David Wilson",
      rating: 3,
      date: "2024-07-05",
      title: "Decent product but has room for improvement",
      comment: "The product is okay but not exceptional. It does what it's supposed to do but I expected a bit more for the price. Customer service was helpful though.",
      verified: false,
      helpful: 3
    }
  ];

  const renderStars = (rating, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={size} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={size} className="text-yellow-400 fill-current" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={size} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockReviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = mockReviews?.length;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={cn("bg-card border border-border rounded-lg p-6", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
        <Button variant="outline" size="sm">
          Write a Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground mb-2">{rating}</div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {renderStars(rating, 20)}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {reviewCount?.toLocaleString()} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1]?.map(stars => {
            const count = ratingDistribution?.[stars];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-foreground">{stars}</span>
                  <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Filter by:</span>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="all">All ratings</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
            <option value="helpful">Most helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  {review?.userName?.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{review?.userName}</span>
                    {review?.verified && (
                      <span className="bg-success text-success-foreground px-2 py-0.5 rounded-full text-xs font-medium">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating, 14)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(review?.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-13">
              <h4 className="font-medium text-foreground mb-2">{review?.title}</h4>
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {review?.comment}
              </p>
              
              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="ThumbsUp" size={14} />
                  <span>Helpful ({review?.helpful})</span>
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Reply
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div className="text-center mt-8">
        <Button variant="outline">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;