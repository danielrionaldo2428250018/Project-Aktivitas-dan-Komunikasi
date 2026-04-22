import Link from "next/link"
import { FileText, CheckCircle, Heart, MessageSquare, ArrowRight, Clock, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stats = [
  {
    label: "Active Commission",
    value: "3",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    href: "/dashboard/commissions?status=active"
  },
  {
    label: "Completed",
    value: "12",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    href: "/dashboard/commissions?status=completed"
  },
  {
    label: "Favorite Creators",
    value: "8",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-100",
    href: "/dashboard/favorites"
  },
  {
    label: "Messages",
    value: "5",
    icon: MessageSquare,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    href: "/dashboard/messages"
  }
]

const activeCommissions = [
  {
    id: 1,
    title: "Logo Design for Coffee Shop",
    creator: {
      name: "Sarah Wijaya",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    status: "In Progress",
    deadline: "Apr 15, 2026",
    progress: 60
  },
  {
    id: 2,
    title: "Character Illustration",
    creator: {
      name: "Andi Pratama",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    status: "Review",
    deadline: "Apr 18, 2026",
    progress: 90
  },
  {
    id: 3,
    title: "Mobile App UI Design",
    creator: {
      name: "Maya Putri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    status: "In Progress",
    deadline: "Apr 25, 2026",
    progress: 30
  }
]

const recentMessages = [
  {
    id: 1,
    sender: {
      name: "Sarah Wijaya",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    message: "Hi! I've completed the initial sketches. Please check and let me know your thoughts!",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    sender: {
      name: "Andi Pratama",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    message: "The character design is ready for review. I made some adjustments based on your feedback.",
    time: "5 hours ago",
    unread: true
  },
  {
    id: 3,
    sender: {
      name: "Maya Putri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    message: "Thanks for the project! I'll start working on it right away.",
    time: "Yesterday",
    unread: false
  }
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-muted-foreground">{"Here's what's happening with your projects."}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Commissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Commissions</CardTitle>
              <CardDescription>Your ongoing projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/commissions">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCommissions.map((commission) => (
              <div key={commission.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={commission.creator.avatar} alt={commission.creator.name} />
                  <AvatarFallback>{commission.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{commission.title}</h4>
                  <p className="text-sm text-muted-foreground">{commission.creator.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      commission.status === "Review" 
                        ? "bg-yellow-100 text-yellow-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {commission.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {commission.deadline}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${commission.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{commission.progress}% complete</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest conversations</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/messages">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((msg) => (
              <Link 
                key={msg.id} 
                href={`/dashboard/messages/${msg.id}`}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                    <AvatarFallback>{msg.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {msg.unread && (
                    <span className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-primary rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${msg.unread ? "text-foreground" : "text-muted-foreground"}`}>
                      {msg.sender.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className={`text-sm truncate ${msg.unread ? "text-foreground" : "text-muted-foreground"}`}>
                    {msg.message}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with these common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
              <Link href="/commission/create">
                <FileText className="h-5 w-5 text-primary" />
                <span>New Commission</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
              <Link href="/explore">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Find Creators</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
              <Link href="/dashboard/messages">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <span>Send Message</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" asChild>
              <Link href="/dashboard/profile">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span>Edit Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
