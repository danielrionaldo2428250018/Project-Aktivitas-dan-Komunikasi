"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  Star, 
  Heart, 
  MapPin, 
  Clock, 
  RefreshCw, 
  MessageSquare, 
  Check,
  ArrowLeft,
  Share2,
  ExternalLink,
  Calendar,
  Award,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock creator data
const creatorsData: Record<string, typeof creatorData> = {
  sarahdesigns: {
    id: 1,
    name: "Sarah Wijaya",
    username: "sarahdesigns",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=400&fit=crop",
    specialty: "Graphic Designer",
    location: "Jakarta, Indonesia",
    rating: 4.9,
    reviews: 234,
    completedProjects: 312,
    responseTime: "1 hour",
    memberSince: "Jan 2022",
    bio: "Professional graphic designer with 5+ years of experience in branding, logo design, and social media content. I believe great design tells a story and connects with people emotionally. Let me help bring your vision to life!",
    skills: ["Logo Design", "Branding", "Social Media", "Print Design", "Packaging", "Illustration"],
    languages: ["Indonesian", "English"],
    packages: {
      basic: {
        name: "Basic",
        price: 150000,
        deliveryTime: 3,
        revisions: 2,
        features: ["1 Logo Concept", "PNG & JPG Files", "Source File", "Basic Revisions"]
      },
      standard: {
        name: "Standard",
        price: 350000,
        deliveryTime: 5,
        revisions: 4,
        features: ["3 Logo Concepts", "All File Formats", "Source File", "Brand Guidelines", "Social Media Kit"]
      },
      premium: {
        name: "Premium",
        price: 750000,
        deliveryTime: 7,
        revisions: "Unlimited",
        features: ["5 Logo Concepts", "All File Formats", "Source File", "Full Brand Identity", "Social Media Kit", "Business Card Design", "Letterhead Design", "Priority Support"]
      }
    },
    portfolio: [
      { id: 1, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", title: "Modern Brand Identity", description: "Complete branding for tech startup" },
      { id: 2, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop", title: "Logo Collection", description: "Minimalist logos for various clients" },
      { id: 3, image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop", title: "Social Media Pack", description: "Instagram templates and stories" },
      { id: 4, image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop", title: "Packaging Design", description: "Product packaging for cosmetics brand" },
      { id: 5, image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=400&fit=crop", title: "Business Cards", description: "Premium business card designs" },
      { id: 6, image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop", title: "Website UI", description: "Landing page design concept" }
    ],
    reviewsList: [
      { id: 1, user: "Budi Santoso", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=50&h=50&fit=crop&crop=face", rating: 5, date: "2 weeks ago", comment: "Amazing work! Sarah delivered exactly what I needed for my brand. Very professional and responsive throughout the project.", project: "Logo Design" },
      { id: 2, user: "Dian Putri", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face", rating: 5, date: "1 month ago", comment: "Exceeded my expectations! The social media kit she created is stunning and helped increase our engagement significantly.", project: "Social Media Pack" },
      { id: 3, user: "Andi Wijaya", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face", rating: 4, date: "2 months ago", comment: "Great designer with attention to detail. Would definitely recommend for branding projects.", project: "Brand Identity" }
    ]
  },
  andiart: {
    id: 2,
    name: "Andi Pratama",
    username: "andiart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop",
    specialty: "Illustrator",
    location: "Bandung, Indonesia",
    rating: 5.0,
    reviews: 189,
    completedProjects: 245,
    responseTime: "2 hours",
    memberSince: "Mar 2021",
    bio: "Digital artist and illustrator specializing in character design, concept art, and comics. I bring imagination to life through vibrant colors and detailed illustrations.",
    skills: ["Character Design", "Digital Art", "Comics", "Concept Art", "Fantasy", "Portraits"],
    languages: ["Indonesian", "English"],
    packages: {
      basic: { name: "Basic", price: 200000, deliveryTime: 4, revisions: 2, features: ["1 Character Sketch", "Digital File", "Basic Colors", "2 Revisions"] },
      standard: { name: "Standard", price: 450000, deliveryTime: 7, revisions: 4, features: ["Full Character Art", "High Resolution", "Background", "4 Revisions", "Commercial Use"] },
      premium: { name: "Premium", price: 900000, deliveryTime: 14, revisions: "Unlimited", features: ["Full Scene Illustration", "Multiple Characters", "Detailed Background", "Unlimited Revisions", "Source Files", "Priority Support"] }
    },
    portfolio: [
      { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop", title: "Fantasy Character", description: "Original character design" },
      { id: 2, image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=400&fit=crop", title: "Digital Portrait", description: "Stylized portrait commission" },
      { id: 3, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=400&fit=crop", title: "Concept Art", description: "Game character concept" }
    ],
    reviewsList: [
      { id: 1, user: "Maya Sari", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face", rating: 5, date: "1 week ago", comment: "Incredible talent! The character design exceeded all my expectations.", project: "Character Design" }
    ]
  }
}

const creatorData = creatorsData.sarahdesigns

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export default function CreatorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string
  
  const creator = creatorsData[username] || creatorsData.sarahdesigns
  
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "standard" | "premium">("standard")
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("portfolio")

  const currentPackage = creator.packages[selectedPackage]

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
        <img
          src={creator.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Creator Profile */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar */}
                  <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback className="text-2xl">{creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold">{creator.name}</h1>
                        <p className="text-muted-foreground">@{creator.username}</p>
                        <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                          {creator.specialty}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{creator.rating}</span>
                        <span className="text-muted-foreground">({creator.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {creator.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Responds in {creator.responseTime}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{creator.completedProjects}</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{creator.reviews}</p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-primary">{creator.memberSince}</p>
                        <p className="text-xs text-muted-foreground">Member Since</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs - Portfolio, Reviews, About */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
              </TabsList>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {creator.portfolio.map((item) => (
                    <Card key={item.id} className="group overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-white font-medium">{item.title}</h4>
                            <p className="text-white/80 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Client Reviews</CardTitle>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{creator.rating}</span>
                        <span className="text-muted-foreground">({creator.reviews} reviews)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {creator.reviewsList.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{review.user}</h4>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                                  />
                                ))}
                              </div>
                              <Badge variant="secondary" className="text-xs">{review.project}</Badge>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about" className="mt-0">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">About Me</h3>
                      <p className="text-muted-foreground leading-relaxed">{creator.bio}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Location
                        </h4>
                        <p className="text-muted-foreground">{creator.location}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          Member Since
                        </h4>
                        <p className="text-muted-foreground">{creator.memberSince}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          Completed Projects
                        </h4>
                        <p className="text-muted-foreground">{creator.completedProjects} projects</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Response Time
                        </h4>
                        <p className="text-muted-foreground">{creator.responseTime}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Languages
                      </h4>
                      <div className="flex gap-2">
                        {creator.languages.map((lang) => (
                          <Badge key={lang} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Section - Commission Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Commission Packages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Package Selection */}
                <div className="grid grid-cols-3 gap-2">
                  {(["basic", "standard", "premium"] as const).map((pkg) => (
                    <button
                      key={pkg}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        selectedPackage === pkg
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {creator.packages[pkg].name}
                    </button>
                  ))}
                </div>

                {/* Package Details */}
                <div className="pt-4 border-t">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(currentPackage.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {currentPackage.name} Package
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{currentPackage.deliveryTime} days delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-muted-foreground" />
                      <span>{currentPackage.revisions} revisions</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {currentPackage.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                      <Link href={`/commission/create?creator=${creator.username}&package=${selectedPackage}`}>
                        Commission Now
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full gap-2" asChild>
                      <Link href={`/dashboard/messages?chat=${creator.username}`}>
                        <MessageSquare className="h-4 w-4" />
                        Message Creator
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full gap-2"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                      {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </div>
  )
}
