"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Send, Paperclip, Image, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: number
  content: string
  sender: "me" | "other"
  timestamp: string
  status?: "sent" | "delivered" | "read"
  type?: "text" | "image" | "file"
  fileName?: string
  fileSize?: string
}

interface Conversation {
  id: number
  user: {
    name: string
    avatar: string
    specialty: string
  }
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    id: 1,
    user: {
      name: "Sarah Wijaya",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      specialty: "Graphic Designer"
    },
    lastMessage: "I've completed the initial sketches. Please check!",
    timestamp: "2 hours ago",
    unread: 2,
    online: true,
    messages: [
      { id: 1, content: "Hi John! I've started working on your logo design.", sender: "other", timestamp: "10:30 AM", status: "read" },
      { id: 2, content: "That's great! Can't wait to see it.", sender: "me", timestamp: "10:35 AM", status: "read" },
      { id: 3, content: "Here are some initial concepts I've been working on.", sender: "other", timestamp: "11:00 AM", status: "read" },
      { id: 4, content: "I really like the second one! Can we explore that direction more?", sender: "me", timestamp: "11:15 AM", status: "read" },
      { id: 5, content: "Absolutely! I'll refine that concept and send you updated versions.", sender: "other", timestamp: "11:20 AM", status: "read" },
      { id: 6, content: "I've completed the initial sketches. Please check!", sender: "other", timestamp: "2:00 PM", status: "delivered" },
    ]
  },
  {
    id: 2,
    user: {
      name: "Andi Pratama",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      specialty: "Illustrator"
    },
    lastMessage: "The character design is ready for review!",
    timestamp: "5 hours ago",
    unread: 1,
    online: false,
    messages: [
      { id: 1, content: "Hey! I've been working on your character design.", sender: "other", timestamp: "9:00 AM", status: "read" },
      { id: 2, content: "The character design is ready for review!", sender: "other", timestamp: "11:00 AM", status: "delivered" },
    ]
  },
  {
    id: 3,
    user: {
      name: "Maya Putri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      specialty: "UI/UX Designer"
    },
    lastMessage: "Thanks for the project! I'll start working on it.",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
    messages: [
      { id: 1, content: "Hi Maya! I'd like to commission you for a mobile app design.", sender: "me", timestamp: "Yesterday 3:00 PM", status: "read" },
      { id: 2, content: "Thanks for the project! I'll start working on it.", sender: "other", timestamp: "Yesterday 3:30 PM", status: "read" },
    ]
  },
  {
    id: 4,
    user: {
      name: "Rizky Hakim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      specialty: "Video Editor"
    },
    lastMessage: "Perfect! I'll send the final cut tomorrow.",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    messages: [
      { id: 1, content: "The video looks amazing! Just one small revision.", sender: "me", timestamp: "2 days ago", status: "read" },
      { id: 2, content: "Perfect! I'll send the final cut tomorrow.", sender: "other", timestamp: "2 days ago", status: "read" },
    ]
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [localMessages, setLocalMessages] = useState<Message[]>(conversations[0]?.messages || [])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [localMessages])

  useEffect(() => {
    if (selectedConversation) {
      setLocalMessages(selectedConversation.messages)
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: localMessages.length + 1,
      content: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    }
    
    setLocalMessages([...localMessages, message])
    setNewMessage("")
  }

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-2rem)] lg:h-screen flex flex-col lg:flex-row">
      {/* Conversations Sidebar */}
      <div className={cn(
        "w-full lg:w-80 border-r border-border bg-background flex flex-col",
        selectedConversation && "hidden lg:flex"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                "w-full flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors text-left",
                selectedConversation?.id === conversation.id && "bg-muted"
              )}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="h-5 min-w-[20px] px-1.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {conversation.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-muted/20">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-background border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                  <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{selectedConversation.user.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.online ? "Online" : "Offline"} • {selectedConversation.user.specialty}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {localMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "me" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2",
                    message.sender === "me"
                      ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-md"
                      : "bg-background border border-border rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1",
                    message.sender === "me" ? "justify-end" : "justify-start"
                  )}>
                    <span className={cn(
                      "text-xs",
                      message.sender === "me" ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {message.timestamp}
                    </span>
                    {message.sender === "me" && (
                      message.status === "read" ? (
                        <CheckCheck className="h-3 w-3 text-white/70" />
                      ) : (
                        <Check className="h-3 w-3 text-white/70" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-background border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Image className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden lg:flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
          </div>
        </div>
      )}
    </div>
  )
}
