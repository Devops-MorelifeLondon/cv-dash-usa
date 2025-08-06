import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Search,
  Clock,
  Eye,
  Star,
  ArrowRight,
  PlayCircle,
  Users,
  Globe
} from "lucide-react";

const Resources = () => {
  const playbooks = [
    {
      id: 1,
      title: "Complete India Market Entry Guide",
      description: "Step-by-step playbook covering business registration, GST compliance, banking, and operational setup in India.",
      category: "Market Entry",
      readTime: "45 min",
      downloads: 1250,
      rating: 4.9,
      type: "PDF Guide",
      featured: true
    },
    {
      id: 2,
      title: "USA LLC Formation Checklist",
      description: "Comprehensive checklist for forming an LLC in the United States, including state comparisons and tax implications.",
      category: "Legal & Compliance",
      readTime: "30 min",
      downloads: 890,
      rating: 4.8,
      type: "Checklist",
      featured: true
    },
    {
      id: 3,
      title: "Cross-Border E-commerce Playbook",
      description: "Master the art of selling across borders with this detailed guide covering Amazon, Shopify, and direct-to-consumer strategies.",
      category: "E-commerce",
      readTime: "60 min",
      downloads: 2100,
      rating: 4.9,
      type: "PDF Guide",
      featured: false
    },
    {
      id: 4,
      title: "Tax Optimization Strategies",
      description: "Legal strategies to optimize your tax structure across India and USA operations for maximum efficiency.",
      category: "Tax & Finance",
      readTime: "40 min",
      downloads: 675,
      rating: 4.7,
      type: "Strategy Guide",
      featured: false
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Setting Up Your First Indian Business",
      description: "Watch our founder explain the complete process of setting up a business in India, from incorporation to operations.",
      duration: "25:30",
      views: "12.5K",
      category: "Getting Started",
      thumbnail: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      title: "USA Entity Formation: LLC vs C-Corp",
      description: "Detailed comparison of business structures in the USA and which one is right for your specific situation.",
      duration: "18:45",
      views: "8.9K",
      category: "Legal Structure",
      thumbnail: "/placeholder.svg",
      featured: true
    },
    {
      id: 3,
      title: "Scaling Your Business Globally",
      description: "Success stories and practical tips from entrepreneurs who successfully scaled their businesses across multiple countries.",
      duration: "32:15",
      views: "15.2K",
      category: "Scaling",
      thumbnail: "/placeholder.svg",
      featured: false
    }
  ];

  const webinars = [
    {
      id: 1,
      title: "Live Q&A: India Market Entry",
      description: "Join our experts for a live session answering your questions about entering the Indian market.",
      date: "Jan 25, 2024",
      time: "3:00 PM EST",
      attendees: 250,
      status: "upcoming",
      speaker: "Rajesh Sharma"
    },
    {
      id: 2,
      title: "USA Tax Strategies for Foreign Businesses",
      description: "Learn advanced tax optimization strategies for international businesses operating in the USA.",
      date: "Jan 30, 2024",
      time: "2:00 PM EST",
      attendees: 180,
      status: "upcoming",
      speaker: "Michael Chen"
    },
    {
      id: 3,
      title: "E-commerce Success on Amazon USA",
      description: "Recorded session covering the complete process of launching and scaling on Amazon USA marketplace.",
      date: "Jan 15, 2024",
      time: "4:00 PM EST",
      attendees: 420,
      status: "recorded",
      speaker: "Sarah Johnson"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Resources & <span className="text-primary">Playbooks</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive guides, video tutorials, and expert insights to accelerate your global expansion journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search playbooks, videos, guides..."
            className="pl-12 h-12 text-lg"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">45+</div>
            <div className="text-sm text-muted-foreground">Playbooks</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Video className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">120+</div>
            <div className="text-sm text-muted-foreground">Video Tutorials</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">25K+</div>
            <div className="text-sm text-muted-foreground">Users Helped</div>
          </Card>
          <Card className="p-6 text-center hover:shadow-card-hover transition-all duration-300">
            <Download className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">50K+</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </Card>
        </div>

        <Tabs defaultValue="playbooks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
            <TabsTrigger value="playbooks" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              📚 Playbooks
            </TabsTrigger>
            <TabsTrigger value="videos" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🎥 Videos
            </TabsTrigger>
            <TabsTrigger value="webinars" className="text-lg font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              🎤 Webinars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playbooks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playbooks.map((playbook) => (
                <Card 
                  key={playbook.id} 
                  className={`p-6 hover:shadow-card-hover transition-all duration-300 ${
                    playbook.featured ? 'border-primary/50 bg-gradient-card' : 'border-border/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {playbook.featured && (
                        <Badge className="bg-cv-success text-white">Featured</Badge>
                      )}
                      <Badge variant="outline">{playbook.category}</Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-foreground">{playbook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {playbook.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {playbook.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {playbook.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      {playbook.rating}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card 
                  key={video.id} 
                  className="overflow-hidden hover:shadow-card-hover transition-all duration-300 border-border/50 hover:border-primary/30"
                >
                  <div className="relative">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-primary" />
                    </div>
                    {video.featured && (
                      <Badge className="absolute top-2 left-2 bg-cv-success text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2">{video.category}</Badge>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views} views
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="space-y-6">
            <div className="space-y-4">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="p-6 hover:shadow-card-hover transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">{webinar.title}</h3>
                          <Badge className={webinar.status === 'upcoming' ? 'bg-cv-blue text-white' : 'bg-muted text-muted-foreground'}>
                            {webinar.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{webinar.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>📅 {webinar.date}</span>
                          <span>🕒 {webinar.time}</span>
                          <span>👥 {webinar.attendees} attendees</span>
                          <span>🎤 {webinar.speaker}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={webinar.status === 'upcoming' ? 'default' : 'outline'}
                      size="sm"
                    >
                      {webinar.status === 'upcoming' ? 'Register' : 'Watch Recording'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-card border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Request specific guides or topics you'd like us to cover. Our team regularly creates new content based on user requests.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Request Custom Guide
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Resources;