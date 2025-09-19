import { useAuthStore } from '@/store/authStore';
import SupervisorDashboard from '@/components/dashboard/SupervisorDashboard';
import OfficerDashboard from '@/components/dashboard/OfficerDashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      {user?.role === 'supervisor' ? <SupervisorDashboard /> : <OfficerDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;