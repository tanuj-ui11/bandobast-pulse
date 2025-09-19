import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  MessageSquare,
  Calendar,
  Shield,
  Activity
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OfficerDashboard = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [lastClockIn] = useState('08:30 AM');

  const handleStatusToggle = () => {
    setIsOnDuty(!isOnDuty);
    toast({
      title: isOnDuty ? "Clocked Out" : "Clocked In",
      description: isOnDuty ? "Status updated to off-duty" : "Status updated to on-duty",
      duration: 3000,
    });
  };

  const todayStats = {
    hoursWorked: '6.5',
    incidentsReported: 2,
    patrolsCompleted: 4,
    lastBreak: '12:30 PM'
  };

  const recentMessages = [
    {
      id: 1,
      from: 'SDPO Control Room',
      message: 'Patrol schedule updated for evening shift',
      time: '2:30 PM',
      unread: true
    },
    {
      id: 2,
      from: 'ASI Deepak Verma',
      message: 'Incident report approved',
      time: '1:15 PM',
      unread: false
    },
    {
      id: 3,
      from: 'System Alert',
      message: 'Monthly attendance summary available',
      time: '11:00 AM',
      unread: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Officer Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Current Assignment & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-primary">Sector {user?.sector}</div>
                  <div className="text-sm text-muted-foreground">{user?.zone}</div>
                </div>
                <Badge variant={isOnDuty ? 'success' : 'secondary'} className="ml-2">
                  {isOnDuty ? 'On Duty' : 'Off Duty'}
                </Badge>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="text-sm text-muted-foreground">
                  Last clock-in: {lastClockIn}
                </div>
              </div>
            </div>
            
            <Button 
              variant={isOnDuty ? 'warning' : 'success'} 
              className="w-full"
              onClick={handleStatusToggle}
            >
              <Clock className="w-4 h-4 mr-2" />
              {isOnDuty ? 'Clock Out' : 'Clock In'}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{todayStats.hoursWorked}</div>
                <div className="text-xs text-muted-foreground">Hours Worked</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-success">{todayStats.incidentsReported}</div>
                <div className="text-xs text-muted-foreground">Incidents</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-2xl font-bold text-warning">{todayStats.patrolsCompleted}</div>
                <div className="text-xs text-muted-foreground">Patrols</div>
              </div>
              <div className="text-center p-3 bg-secondary/30 rounded-lg">
                <div className="text-xs text-primary font-medium">{todayStats.lastBreak}</div>
                <div className="text-xs text-muted-foreground">Last Break</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used functions for daily operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <span>Report Incident</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Mark Attendance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <MessageSquare className="h-6 w-6 text-success" />
              <span>Send Update</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Messages & Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Recent Messages
          </CardTitle>
          <CardDescription>
            Communication from supervisors and control room
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentMessages.map((message) => (
            <div 
              key={message.id} 
              className={`p-3 rounded-lg border ${
                message.unread 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'bg-secondary/30 border-border/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{message.from}</div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {message.message}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground ml-4">
                  {message.time}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm">
              View All Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficerDashboard;