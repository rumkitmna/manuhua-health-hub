import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface IGDCase {
  id: string;
  case_id: string;
  patient_id: string;
  complaint: string;
  triage: string;
  bed_id: string | null;
  status: string;
  doctor_id: string | null;
  admission_time: string;
  discharge_time: string | null;
  notes: string | null;
  patients: {
    name: string;
    patient_id: string;
    age?: number;
  };
  beds: {
    bed_number: number;
  } | null;
  doctors: {
    name: string;
  } | null;
}

export interface Bed {
  id: string;
  bed_number: number;
  status: string;
  patient_id: string | null;
  patients: {
    name: string;
  } | null;
}

export const useIGD = () => {
  const [igdCases, setIgdCases] = useState<IGDCase[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIGDData();
  }, []);

  const fetchIGDData = async () => {
    try {
      setLoading(true);
      
      // Fetch IGD cases with related data
      const { data: casesData, error: casesError } = await supabase
        .from('igd_cases')
        .select(`
          *,
          patients(name, patient_id, date_of_birth),
          beds(bed_number),
          doctors(name)
        `)
        .eq('status', 'active')
        .order('admission_time', { ascending: false });

      if (casesError) throw casesError;

      // Calculate age for patients
      const casesWithAge = casesData?.map(case_ => ({
        ...case_,
        patients: {
          ...case_.patients,
          age: case_.patients?.date_of_birth 
            ? new Date().getFullYear() - new Date(case_.patients.date_of_birth).getFullYear()
            : undefined
        }
      })) || [];

      // Fetch beds with patient info
      const { data: bedsData, error: bedsError } = await supabase
        .from('beds')
        .select(`
          *,
          patients(name)
        `)
        .order('bed_number');

      if (bedsError) throw bedsError;

      setIgdCases(casesWithAge);
      setBeds(bedsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addIGDCase = async (caseData: any) => {
    try {
      const { data, error } = await supabase
        .from('igd_cases')
        .insert([caseData])
        .select(`
          *,
          patients(name, patient_id, date_of_birth),
          beds(bed_number),
          doctors(name)
        `)
        .single();

      if (error) throw error;
      
      const caseWithAge = {
        ...data,
        patients: {
          ...data.patients,
          age: data.patients?.date_of_birth 
            ? new Date().getFullYear() - new Date(data.patients.date_of_birth).getFullYear()
            : undefined
        }
      };
      
      setIgdCases(prev => [caseWithAge, ...prev]);
      return { data: caseWithAge, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const updateIGDCase = async (id: string, caseData: any) => {
    try {
      const { data, error } = await supabase
        .from('igd_cases')
        .update(caseData)
        .eq('id', id)
        .select(`
          *,
          patients(name, patient_id, date_of_birth),
          beds(bed_number),
          doctors(name)
        `)
        .single();

      if (error) throw error;
      
      const caseWithAge = {
        ...data,
        patients: {
          ...data.patients,
          age: data.patients?.date_of_birth 
            ? new Date().getFullYear() - new Date(data.patients.date_of_birth).getFullYear()
            : undefined
        }
      };
      
      setIgdCases(prev => prev.map(c => c.id === id ? caseWithAge : c));
      return { data: caseWithAge, error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { data: null, error };
    }
  };

  const deleteIGDCase = async (id: string) => {
    try {
      const { error } = await supabase
        .from('igd_cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setIgdCases(prev => prev.filter(c => c.id !== id));
      return { error: null };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      return { error };
    }
  };

  return {
    igdCases,
    beds,
    loading,
    error,
    fetchIGDData,
    addIGDCase,
    updateIGDCase,
    deleteIGDCase
  };
};