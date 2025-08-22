import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  todayPatients: number;
  activeIGD: number;
  activePoli: number;
  completedLab: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  time: string;
  status: string;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    todayPatients: 0,
    activeIGD: 0,
    activePoli: 0,
    completedLab: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];

      // Get today's appointments count
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', today);

      if (appointmentsError) throw appointmentsError;

      // Get active IGD cases
      const { data: igdData, error: igdError } = await supabase
        .from('igd_cases')
        .select('id')
        .eq('status', 'active');

      if (igdError) throw igdError;

      // Get active poli appointments
      const { data: poliData, error: poliError } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', today)
        .in('status', ['current', 'waiting']);

      if (poliError) throw poliError;

      // Get completed lab tests today
      const { data: labData, error: labError } = await supabase
        .from('lab_tests')
        .select('id')
        .eq('status', 'completed')
        .gte('completed_at', today);

      if (labError) throw labError;

      setStats({
        todayPatients: appointmentsData?.length || 0,
        activeIGD: igdData?.length || 0,
        activePoli: poliData?.length || 0,
        completedLab: labData?.length || 0
      });

      // Mock recent activities for now
      setRecentActivities([
        {
          id: '1',
          type: 'IGD',
          message: 'Pasien baru masuk dengan keluhan nyeri dada',
          time: '5 menit lalu',
          status: 'emergency'
        },
        {
          id: '2',
          type: 'Lab',
          message: 'Hasil pemeriksaan darah lengkap siap',
          time: '12 menit lalu',
          status: 'success'
        },
        {
          id: '3',
          type: 'Poli Gigi',
          message: 'Jadwal tindakan scaling dimulai',
          time: '18 menit lalu',
          status: 'info'
        },
        {
          id: '4',
          type: 'Rikkes',
          message: 'Pemeriksaan TNI AU batch baru terdaftar',
          time: '25 menit lalu',
          status: 'info'
        }
      ]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    recentActivities,
    loading,
    error,
    fetchDashboardData
  };
};