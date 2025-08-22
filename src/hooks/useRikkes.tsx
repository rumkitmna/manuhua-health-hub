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

  return {
    participants,
    examinations,
    loading,
    error,
    fetchRikkesData
  };
};