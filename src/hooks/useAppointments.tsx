import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface Appointment {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  complaint: string | null;
  status: string;
  queue_number: string | null;
  notes: string | null;
  patients: {
    name: string;
    patient_id: string;
  };
  doctors: {
    name: string;
  };
}

export const useAppointments = (department?: string) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, [department]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('appointments')
        .select(`
          *,
          patients(name, patient_id),
          doctors(name)
        `)
        .eq('appointment_date', new Date().toISOString().split('T')[0])
        .order('appointment_time');

      if (department) {
        query = query.eq('department', department);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments
  };
};