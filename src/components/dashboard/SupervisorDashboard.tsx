import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MapPin, 
  Shield, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Activity,
  CheckCircle
} from 'lucide-react';
import { deploymentStats, mockSectors, mockOfficers, mockIncidents } from '@/data/mockData';

const SupervisorDashboard = () => {
  const activeIncidents = mockIncidents.filter(i => i.status !== 'resolved');
  const onDutyOfficers = mockOfficers.filter(o => o.status === 'on-duty');

  const statusVariants = {
    'on-duty': 'success',
    'off-duty': 'secondary',
    'break': 'warning',
    'emergency': 'destructive',
  } as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Real-time overview of police deployment and operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{deploymentStats.totalPersonnel}</div>
            <p className="text-xs text-muted-foreground">
              Across {deploymentStats.sectors} sectors
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{deploymentStats.onDuty}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((deploymentStats.onDuty / deploymentStats.totalPersonnel) * 100)}% deployment rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{deploymentStats.activeIncidents}</div>
            <p className="text-xs text-muted-foreground">
              {deploymentStats.resolvedToday} resolved today
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sectors Active</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{deploymentStats.sectors}</div>
            <p className="text-xs text-muted-foreground">
              {deploymentStats.zones} zones covered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sectors and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sectors Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Sector Status
            </CardTitle>
            <CardDescription>
              Current deployment across all sectors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSectors.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <div className="font-medium">{sector.name}</div>
                  <div className="text-sm text-muted-foreground">{sector.supervisor}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{sector.personnel_count}</div>
                  <div className="text-xs text-muted-foreground">{sector.zones} zones</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest incidents and reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockIncidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="flex items-start justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">{incident.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{incident.location}</div>
                  <div className="text-xs text-muted-foreground">
                    by {incident.reportedBy}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge 
                    variant={
                      incident.severity === 'high' ? 'destructive' :
                      incident.severity === 'medium' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {incident.severity}
                  </Badge>
                  <Badge 
                    variant={
                      incident.status === 'resolved' ? 'default' :
                      incident.status === 'in-progress' ? 'secondary' : 'outline'
                    }
                    className="text-xs"
                  >
                    {incident.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personnel Status */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Personnel Overview
          </CardTitle>
          <CardDescription>
            Current status of key personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockOfficers.slice(0, 9).map((officer) => (
              <div key={officer.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{officer.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {officer.rank} • {officer.sector} - {officer.zone}
                  </div>
                </div>
                <Badge 
                  variant={statusVariants[officer.status] || 'secondary'}
                  className="text-xs"
                >
                  {officer.status}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm">
              View All Personnel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorDashboard;