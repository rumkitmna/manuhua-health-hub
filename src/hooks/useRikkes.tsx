import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface RikkesParticipant {
  id: string;
  participant_id: string;
  name: string;
  rank: string | null;
  unit: string | null;
  date_of_birth: string;
  gender: string;
  phone: string | null;
  examination_date: string;
  batch: string | null;
  status: string;
  overall_result: string | null;
}

export interface RikkesExamination {
  id: string;
  participant_id: string;
  examination_type: string;
  examination_name: string;
  result: string | null;
  status: string;
  examiner: string | null;
  notes: string | null;
  examination_date: string;
}

export const useRikkes = () => {
  const [participants, setParticipants] = useState<RikkesParticipant[]>([]);
  const [examinations, setExaminations] = useState<RikkesExamination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRikkesData();
  }, []);

  const fetchRikkesData = async () => {
    try {
      setLoading(true);
      
      const { data: participantsData, error: participantsError } = await supabase
        .from('rikkes_participants')
        .select('*')
        .order('examination_date', { ascending: false });

      if (participantsError) throw participantsError;

      const { data: examinationsData, error: examinationsError } = await supabase
        .from('rikkes_examinations')
        .select('*')
        .order('examination_date', { ascending: false });

      if (examinationsError) throw examinationsError;

      setParticipants(participantsData || []);
      setExaminations(examinationsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addRikkesParticipant = async (participantData: any) => {
    try {
      const { data, error } = await supabase
        .from('rikkes_participants')
        .insert([participantData])
        .select()
        .single();

      if (error) throw error;
      setParticipants(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateRikkesParticipant = async (id: string, participantData: any) => {
    try {
      const { data, error } = await supabase
        .from('rikkes_participants')
        .update(participantData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setParticipants(prev => prev.map(p => p.id === id ? data : p));
      return { data, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const deleteRikkesParticipant = async (id: string) => {
    try {
      const { error } = await supabase
        .from('rikkes_participants')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setParticipants(prev => prev.filter(p => p.id !== id));
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { error };
    }
  };

  return {
    participants,
    examinations,
    loading,
    error,
    fetchRikkesData,
    addRikkesParticipant,
    updateRikkesParticipant,
    deleteRikkesParticipant
  };
};