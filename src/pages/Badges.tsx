import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Award, Crown, Medal } from "lucide-react";

const Badges = () => {
  const badges = [
    {
      id: 1,
      title: "Market Explorer",
      description: "Complete the business match quiz for both India and USA",
      icon: <Trophy className="w-8 h-8" />,
      progress: 100,
      earned: true,
      points: 50
    },
    {
      id: 2,
      title: "Story Seeker",
      description: "Watch 5 success stories from entrepreneurs",
      icon: <Star className="w-8 h-8" />,
      progress: 60,
      earned: false,
      points: 30
    },
    {
      id: 3,
      title: "Service Navigator",
      description: "Explore 10 different services across India and USA",
      icon: <Target className="w-8 h-8" />,
      progress: 80,
      earned: false,
      points: 40
    },
    {
      id: 4,
      title: "CrossAssist Expert",
      description: "Ask 20 questions to CrossAssist AI",
      icon: <Award className="w-8 h-8" />,
      progress: 25,
      earned: false,
      points: 35
    },
    {
      id: 5,
      title: "Global Strategist",
      description: "Complete a consultation session",
      icon: <Crown className="w-8 h-8" />,
      progress: 0,
      earned: false,
      points: 100
    },
    {
      id: 6,
      title: "Launch Ready",
      description: "Complete all setup requirements for market entry",
      icon: <Medal className="w-8 h-8" />,
      progress: 45,
      earned: false,
      points: 200
    }
  ];

  const totalPoints = badges.reduce((sum, badge) => sum + (badge.earned ? badge.points : 0), 0);
  const totalPossiblePoints = badges.reduce((sum, badge) => sum + badge.points, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Startup Badge <span className="text-primary">Progress</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your journey and earn badges as you progress through your global expansion.
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="p-8 bg-gradient-primary text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
              <p className="text-white/90">Keep going! You're making great progress.</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{totalPoints}</div>
              <div className="text-sm text-white/80">Total Points</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round((totalPoints / totalPossiblePoints) * 100)}%</span>
            </div>
            <Progress 
              value={(totalPoints / totalPossiblePoints) * 100} 
              className="h-3 bg-white/20"
            />
          </div>
        </Card>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <Card 
              key={badge.id} 
              className={`p-6 transition-all duration-300 hover:shadow-card-hover ${
                badge.earned 
                  ? 'border-primary/50 bg-gradient-card' 
                  : 'border-border/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  badge.earned 
                    ? 'bg-gradient-primary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {badge.icon}
                </div>
                <div className="text-right">
                  {badge.earned && (
                    <Badge className="bg-cv-success text-white mb-2">
                      Earned
                    </Badge>
                  )}
                  <div className="text-sm font-medium text-primary">
                    {badge.points} pts
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2 text-foreground">
                {badge.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {badge.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{badge.progress}%</span>
                </div>
                <Progress 
                  value={badge.progress} 
                  className={`h-2 ${badge.earned ? 'bg-primary/20' : 'bg-muted'}`}
                />
              </div>

              {!badge.earned && badge.progress > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 hover:bg-primary hover:text-primary-foreground"
                >
                  Continue Progress
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Achievement Milestones */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Achievement Milestones</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cv-blue-light rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Explorer (100 points)</div>
                  <div className="text-sm text-muted-foreground">Complete basic exploration activities</div>
                </div>
              </div>
              <Badge className="bg-cv-success text-white">Achieved</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Strategist (250 points)</div>
                  <div className="text-sm text-muted-foreground">Develop comprehensive market strategies</div>
                </div>
              </div>
              <Badge variant="outline">150/250</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Global Leader (500 points)</div>
                  <div className="text-sm text-muted-foreground">Master global expansion strategies</div>
                </div>
              </div>
              <Badge variant="outline">150/500</Badge>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Badges;