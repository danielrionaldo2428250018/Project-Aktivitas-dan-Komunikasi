"use client"

import { useState } from "react"
import { Camera, MapPin, Mail, Calendar, Edit2, Star, FileText, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const userProfile = {
  name: "John Doe",
  username: "johndoe",
  email: "john.doe@email.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  bio: "Creative enthusiast looking for talented designers and artists to bring my ideas to life. Love working on branding and illustration projects.",
  location: "Jakarta, Indonesia",
  joinedDate: "January 2024",
  skills: ["Branding", "Logo Design", "UI/UX", "Illustration", "Web Design"]
}

const commissionHistory = [
  {
    id: 1,
    title: "Logo Design for Coffee Shop",
    creator: "Sarah Wijaya",
    status: "Completed",
    date: "Mar 15, 2026",
    rating: 5
  },
  {
    id: 2,
    title: "Character Illustration",
    creator: "Andi Pratama",
    status: "Completed",
    date: "Feb 28, 2026",
    rating: 5
  },
  {
    id: 3,
    title: "Website Redesign",
    creator: "Dian Sari",
    status: "Completed",
    date: "Feb 10, 2026",
    rating: 4
  }
]

const reviews = [
  {
    id: 1,
    creator: "Sarah Wijaya",
    rating: 5,
    comment: "Great client to work with! Clear communication and prompt feedback.",
    date: "Mar 20, 2026"
  },
  {
    id: 2,
    creator: "Andi Pratama",
    rating: 5,
    comment: "John knows exactly what he wants. Made the project smooth and enjoyable!",
    date: "Mar 5, 2026"
  }
]

const activities = [
  { action: "Completed commission", details: "Logo Design for Coffee Shop", time: "5 days ago" },
  { action: "Added to favorites", details: "Maya Putri - UI/UX Designer", time: "1 week ago" },
  { action: "Started commission", details: "Character Illustration", time: "2 weeks ago" },
  { action: "Joined Creative Hub", details: "Welcome to the platform!", time: "3 months ago" }
]

export default function ProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [profile, setProfile] = useState(userProfile)
  const [editForm, setEditForm] = useState(userProfile)

  const handleSaveProfile = () => {
    setProfile(editForm)
    setIsEditDialogOpen(false)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 lg:h-32 lg:w-32 border-4 border-background shadow-lg">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">{profile.name}</h1>
                  <p className="text-muted-foreground">@{profile.username}</p>
                </div>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 w-fit">
                      <Edit2 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your profile information
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-primary to-secondary">
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-muted-foreground mb-4 max-w-2xl">{profile.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {profile.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="font-semibold mb-3">Interested in</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="gap-2">
            <FileText className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="commissions" className="gap-2">
            <FileText className="h-4 w-4" />
            Commissions
          </TabsTrigger>
          <TabsTrigger value="reviews" className="gap-2">
            <Star className="h-4 w-4" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <p className="text-muted-foreground">Total Commissions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-secondary mb-2">4.8</div>
                <p className="text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <p className="text-muted-foreground">Favorite Creators</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Commissions Tab */}
        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>Commission History</CardTitle>
              <CardDescription>Your past and ongoing commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissionHistory.map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <h4 className="font-medium">{commission.title}</h4>
                      <p className="text-sm text-muted-foreground">by {commission.creator}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-sm text-green-600">
                        {commission.status}
                      </span>
                      <p className="text-xs text-muted-foreground">{commission.date}</p>
                      <div className="flex items-center gap-0.5 justify-end mt-1">
                        {Array.from({ length: commission.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews from Creators</CardTitle>
              <CardDescription>What creators say about working with you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{review.creator}</h4>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions on Creative Hub</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
