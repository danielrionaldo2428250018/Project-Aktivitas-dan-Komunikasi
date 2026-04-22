"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Star, Heart, MapPin, SlidersHorizontal, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const categories = [
  "All Categories",
  "Graphic Designer",
  "Illustrator",
  "Video Editor",
  "Web Designer",
  "UI/UX Designer",
  "Digital Artist"
]

const creators = [
  {
    id: 1,
    name: "Sarah Wijaya",
    username: "sarahdesigns",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    specialty: "Graphic Designer",
    location: "Jakarta",
    rating: 4.9,
    reviews: 234,
    startingPrice: 150000,
    tags: ["Logo Design", "Branding", "Social Media"],
    portfolio: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    isFavorite: false
  },
  {
    id: 2,
    name: "Andi Pratama",
    username: "andiart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialty: "Illustrator",
    location: "Bandung",
    rating: 5.0,
    reviews: 189,
    startingPrice: 200000,
    tags: ["Character Design", "Digital Art", "Comics"],
    portfolio: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    isFavorite: true
  },
  {
    id: 3,
    name: "Maya Putri",
    username: "mayaui",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialty: "UI/UX Designer",
    location: "Surabaya",
    rating: 4.8,
    reviews: 156,
    startingPrice: 300000,
    tags: ["Mobile App", "Web Design", "Prototype"],
    portfolio: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=300&fit=crop",
    isFavorite: false
  },
  {
    id: 4,
    name: "Rizky Hakim",
    username: "rizkymotion",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    specialty: "Video Editor",
    location: "Yogyakarta",
    rating: 4.9,
    reviews: 98,
    startingPrice: 250000,
    tags: ["Motion Graphics", "YouTube", "Ads"],
    portfolio: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    isFavorite: false
  },
  {
    id: 5,
    name: "Dian Sari",
    username: "dianweb",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    specialty: "Web Designer",
    location: "Bali",
    rating: 4.7,
    reviews: 121,
    startingPrice: 350000,
    tags: ["Landing Page", "E-commerce", "WordPress"],
    portfolio: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    isFavorite: true
  },
  {
    id: 6,
    name: "Budi Santoso",
    username: "budiart",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    specialty: "Digital Artist",
    location: "Medan",
    rating: 4.8,
    reviews: 87,
    startingPrice: 175000,
    tags: ["Concept Art", "Fantasy", "Portrait"],
    portfolio: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop",
    isFavorite: false
  }
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [favorites, setFavorites] = useState<number[]>(
    creators.filter(c => c.isFavorite).map(c => c.id)
  )

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    )
  }

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All Categories" || creator.specialty === selectedCategory
    const matchesPrice = creator.startingPrice >= priceRange[0] && creator.startingPrice <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Explore Creators</h1>
        <p className="text-muted-foreground">Find the perfect creator for your project</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search creators, skills, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Creators</SheetTitle>
              <SheetDescription>
                Adjust filters to find the perfect creator
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <Label>Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500000}
                  step={25000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
              <div className="space-y-4">
                <Label>Category</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== "All Categories" || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory !== "All Categories" && (
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 h-7"
              onClick={() => setSelectedCategory("All Categories")}
            >
              {selectedCategory}
              <X className="h-3 w-3" />
            </Button>
          )}
          {searchQuery && (
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 h-7"
              onClick={() => setSearchQuery("")}
            >
              {`"${searchQuery}"`}
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {filteredCreators.length} creator{filteredCreators.length !== 1 && "s"}
      </p>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <Link key={creator.id} href={`/creator/${creator.username}`}>
            <Card className="group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer h-full">
              {/* Portfolio Preview */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={creator.portfolio}
                  alt={`${creator.name}'s portfolio`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleFavorite(creator.id)
                  }}
                  className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur hover:bg-white transition-colors"
                >
                  <Heart className={`h-4 w-4 transition-colors ${
                    favorites.includes(creator.id) 
                      ? "text-red-500 fill-red-500" 
                      : "text-muted-foreground hover:text-red-500"
                  }`} />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {creator.rating} ({creator.reviews})
                </div>
              </div>

              <CardContent className="p-4">
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{creator.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">@{creator.username}</p>
                  </div>
                </div>

                {/* Specialty & Location */}
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-primary font-medium">{creator.specialty}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {creator.location}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {creator.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                  {creator.tags.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      +{creator.tags.length - 2}
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Starting from</p>
                  <p className="font-semibold text-primary">{formatPrice(creator.startingPrice)}</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Commission
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No creators found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search query
          </p>
          <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
