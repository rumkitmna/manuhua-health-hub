import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface MedicalExamination {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string | null;
  nurse_id: string | null;
  examination_type: string;
  subjective: string | null;
  objective: string | null;
  assessment: string | null;
  plan: string | null;
  vital_signs: any;
  examination_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useMedicalExaminations = (appointmentId?: string) => {
  const [examinations, setExaminations] = useState<MedicalExamination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentId) {
      fetchExaminations();
    }
  }, [appointmentId]);

  const fetchExaminations = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('medical_examinations')
        .select('*')
        .order('examination_date', { ascending: false });

      if (appointmentId) {
        query = query.eq('appointment_id', appointmentId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setExaminations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addExamination = async (examinationData: any) => {
    try {
      const { data, error } = await supabase
        .from('medical_examinations')
        .insert([examinationData])
        .select()
        .single();

      if (error) throw error;
      setExaminations(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateExamination = async (id: string, examinationData: any) => {
    try {
      const { data, error } = await supabase
        .from('medical_examinations')
        .update(examinationData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setExaminations(prev => prev.map(e => e.id === id ? data : e));
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const deleteExamination = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medical_examinations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setExaminations(prev => prev.filter(e => e.id !== id));
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { error };
    }
  };

  return {
    examinations,
    loading,
    error,
    fetchExaminations,
    addExamination,
    updateExamination,
    deleteExamination
  };
};