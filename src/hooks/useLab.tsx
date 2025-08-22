import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface LabTest {
  id: string;
  test_id: string;
  patient_id: string;
  doctor_id: string | null;
  test_type: string;
  test_name: string;
  status: string;
  priority: string;
  requested_date: string;
  sample_collected_at: string | null;
  completed_at: string | null;
  notes: string | null;
  patients: {
    name: string;
    patient_id: string;
  };
  doctors: {
    name: string;
  } | null;
}

export const useLab = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('lab_tests')
        .select(`
          *,
          patients(name, patient_id),
          doctors(name)
        `)
        .order('requested_date', { ascending: false });

      if (error) throw error;
      setLabTests(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    labTests,
    loading,
    error,
    fetchLabTests
  };
};