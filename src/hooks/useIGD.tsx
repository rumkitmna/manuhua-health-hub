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

  return {
    igdCases,
    beds,
    loading,
    error,
    fetchIGDData
  };
};