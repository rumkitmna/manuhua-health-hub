-- Add sample IGD cases and appointments for testing
INSERT INTO public.igd_cases (case_id, patient_id, complaint, triage, status, admission_time) 
SELECT 
  'IGD' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  id,
  CASE 
    WHEN ROW_NUMBER() OVER() = 1 THEN 'Nyeri dada hebat'
    WHEN ROW_NUMBER() OVER() = 2 THEN 'Kecelakaan lalu lintas'
    ELSE 'Demam tinggi'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() = 1 THEN 'Merah'
    WHEN ROW_NUMBER() OVER() = 2 THEN 'Kuning'
    ELSE 'Hijau'
  END,
  'active',
  now() - interval '2 hours'
FROM public.patients LIMIT 3;

-- Add sample appointments
INSERT INTO public.appointments (appointment_id, patient_id, doctor_id, department, appointment_date, appointment_time, complaint, status, queue_number)
SELECT 
  'A' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  p.id,
  d.id,
  'Poli Umum',
  CURRENT_DATE,
  (ARRAY['08:00', '08:30', '09:00', '09:30', '10:00'])[((ROW_NUMBER() OVER() - 1) % 5) + 1]::time,
  CASE 
    WHEN ROW_NUMBER() OVER() % 3 = 1 THEN 'Kontrol rutin'
    WHEN ROW_NUMBER() OVER() % 3 = 2 THEN 'Demam dan batuk'
    ELSE 'Hipertensi'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() = 1 THEN 'current'
    WHEN ROW_NUMBER() OVER() <= 3 THEN 'waiting'
    ELSE 'scheduled'
  END,
  'A' || LPAD((ROW_NUMBER() OVER())::text, 3, '0')
FROM public.patients p
CROSS JOIN public.doctors d
WHERE d.specialization = 'Dokter Umum'
LIMIT 5;

-- Add sample lab tests
INSERT INTO public.lab_tests (test_id, patient_id, test_type, test_name, status, priority)
SELECT 
  'LAB' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  id,
  'Hematologi',
  CASE 
    WHEN ROW_NUMBER() OVER() % 3 = 1 THEN 'Darah Lengkap'
    WHEN ROW_NUMBER() OVER() % 3 = 2 THEN 'Gula Darah'
    ELSE 'Kolesterol'
  END,
  CASE 
    WHEN ROW_NUMBER() OVER() <= 2 THEN 'completed'
    ELSE 'pending'
  END,
  'normal'
FROM public.patients LIMIT 4;