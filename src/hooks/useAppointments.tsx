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

  const addAppointment = async (appointmentData: any) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select(`
          *,
          patients(name, patient_id),
          doctors(name)
        `)
        .single();

      if (error) throw error;
      setAppointments(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateAppointment = async (id: string, appointmentData: any) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(appointmentData)
        .eq('id', id)
        .select(`
          *,
          patients(name, patient_id),
          doctors(name)
        `)
        .single();

      if (error) throw error;
      setAppointments(prev => prev.map(a => a.id === id ? data : a));
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAppointments(prev => prev.filter(a => a.id !== id));
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { error };
    }
  };

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
  };
};