import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
  Wifi,
  Video,
} from "lucide-react";

const categories = ["All", "Budget", "Near School", "Shared", "Solo"];

const dorms = [
  {
    id: 1,
    name: "Sunflower Residence",
    location: "500m from UP Diliman",
    price: 3500,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
    available: true,
    amenities: ["WiFi", "CCTV"],
  },
  {
    id: 2,
    name: "Blue Haven Dormitory",
    location: "1.2km from Ateneo",
    price: 5500,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    available: true,
    amenities: ["WiFi", "CCTV"],
  },
  {
    id: 3,
    name: "Green Valley Dorm",
    location: "800m from UST",
    price: 4200,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    available: false,
    amenities: ["WiFi", "CCTV"],
  },
  {
    id: 4,
    name: "Maple Heights",
    location: "300m from La Salle",
    price: 6800,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    available: true,
    amenities: ["WiFi", "CCTV"],
  },
];

export function DormListingScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold mb-6">Find Your Dorm</h1>

        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dorms..."
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-background text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Dorm Cards */}
      <div className="px-6 space-y-4 mt-4">
        <p className="text-sm text-muted-foreground">
          {dorms.length} dormitories found
        </p>

        {dorms.map((dorm) => (
          <motion.div
            key={dorm.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/app/dorms/${dorm.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="relative h-48">
              <img
                src={dorm.image}
                alt={dorm.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(dorm.id);
                }}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(dorm.id)
                      ? "fill-red-500 text-red-500"
                      : "text-foreground"
                  }`}
                />
              </button>
              {dorm.available ? (
                <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Available
                </div>
              ) : (
                <div className="absolute top-3 left-3 bg-muted text-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Full
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-lg">{dorm.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{dorm.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-sm">{dorm.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({dorm.reviews})
                  </span>
                </div>
                <div className="flex gap-2">
                  {dorm.amenities.includes("WiFi") && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Wifi className="w-3 h-3" />
                    </div>
                  )}
                  {dorm.amenities.includes("CCTV") && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Video className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="font-bold text-xl text-primary">
                    ₱{dorm.price.toLocaleString()}/mo
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
