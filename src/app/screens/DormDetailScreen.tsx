import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ChevronLeft,
  Heart,
  Star,
  MapPin,
  Wifi,
  Video,
  Utensils,
  WashingMachine,
  Share2,
  User,
} from "lucide-react";

const dormDetails = {
  name: "Sunflower Residence",
  rating: 4.8,
  reviewCount: 124,
  location: "123 P. Noval St., Sampaloc, Manila",
  distance: "500m from UP Diliman",
  images: [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  ],
  price: 3500,
  deposit: 7000,
  utilities: 800,
  amenities: [
    { icon: Wifi, name: "WiFi" },
    { icon: Video, name: "CCTV" },
    { icon: Utensils, name: "Kitchen" },
    { icon: WashingMachine, name: "Laundry" },
  ],
  description:
    "Comfortable and secure dormitory located near UP Diliman. Perfect for students looking for a safe and convenient place to stay. Features 24/7 security, high-speed internet, and fully furnished rooms.",
  reviews: [
    {
      id: 1,
      user: "Maria Santos",
      rating: 5,
      comment: "Great place! Very clean and the landlord is very accommodating.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      user: "Juan dela Cruz",
      rating: 4,
      comment: "Good location, near the campus. WiFi is fast.",
      date: "1 month ago",
    },
  ],
};

export function DormDetailScreen() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Image Carousel */}
      <div className="relative h-80 bg-muted">
        <img
          src={dormDetails.images[currentImage]}
          alt={dormDetails.name}
          className="w-full h-full object-cover"
        />

        {/* Header Buttons */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/app/dorms")}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {dormDetails.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImage ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6">
        {/* Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{dormDetails.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{dormDetails.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{dormDetails.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  ({dormDetails.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-4">
            <p className="text-3xl font-bold text-primary mb-1">
              ₱{dormDetails.price.toLocaleString()}/month
            </p>
            <p className="text-sm text-muted-foreground">
              + ₱{dormDetails.utilities.toLocaleString()} estimated utilities
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Amenities</h2>
          <div className="grid grid-cols-4 gap-4">
            {dormDetails.amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-center">{amenity.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {dormDetails.description}
          </p>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Location</h2>
          <div className="bg-muted rounded-xl h-48 flex items-center justify-center mb-3">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">{dormDetails.location}</p>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">Payment Breakdown</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Monthly Rent</span>
              <span className="font-medium">
                ₱{dormDetails.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Security Deposit</span>
              <span className="font-medium">
                ₱{dormDetails.deposit.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Utilities (est.)</span>
              <span className="font-medium">
                ₱{dormDetails.utilities.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-bold">First Month Total</span>
              <span className="font-bold text-primary text-xl">
                ₱
                {(
                  dormDetails.price +
                  dormDetails.deposit +
                  dormDetails.utilities
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Reviews</h2>
            <button className="text-primary text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {dormDetails.reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-border last:border-0">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{review.user}</p>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto px-6 py-4 bg-white border-t border-border">
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Book Now
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-primary/10 text-primary py-4 rounded-xl font-medium hover:bg-primary/20 transition-colors"
          >
            Contact Owner
          </motion.button>
        </div>
      </div>
    </div>
  );
}
