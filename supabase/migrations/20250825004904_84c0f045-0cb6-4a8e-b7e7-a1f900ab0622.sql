-- Update beds to only have 3 beds
DELETE FROM beds WHERE bed_number > 3;

-- Update existing beds to ensure we have exactly 3
UPDATE beds SET status = 'available' WHERE bed_number <= 3;

-- Insert beds if less than 3 exist
INSERT INTO beds (bed_number, status) 
SELECT generate_series, 'available'
FROM generate_series(1, 3)
WHERE NOT EXISTS (
  SELECT 1 FROM beds WHERE bed_number = generate_series
);

-- Create medical_examinations table for SOAP notes
CREATE TABLE IF NOT EXISTS public.medical_examinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  doctor_id UUID,
  nurse_id UUID,
  examination_type VARCHAR NOT NULL DEFAULT 'doctor', -- 'doctor' or 'nurse'
  subjective TEXT, -- S - Subjective (patient complaints)
  objective TEXT, -- O - Objective (vital signs, physical exam)
  assessment TEXT, -- A - Assessment (diagnosis)
  plan TEXT, -- P - Plan (treatment plan)
  vital_signs JSONB, -- blood pressure, temperature, etc.
  examination_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status VARCHAR NOT NULL DEFAULT 'draft', -- 'draft', 'completed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.medical_examinations ENABLE ROW LEVEL SECURITY;

-- Create policies for medical examinations
CREATE POLICY "Enable all operations for medical_examinations" 
ON public.medical_examinations 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_medical_examinations_updated_at
BEFORE UPDATE ON public.medical_examinations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add nurses table for nurse examinations
CREATE TABLE IF NOT EXISTS public.nurses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  specialization VARCHAR NOT NULL DEFAULT 'Perawat Umum',
  active BOOLEAN DEFAULT true,
  phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for nurses
ALTER TABLE public.nurses ENABLE ROW LEVEL SECURITY;

-- Create policies for nurses
CREATE POLICY "Enable all operations for nurses" 
ON public.nurses 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert sample nurses
INSERT INTO nurses (name, specialization) VALUES
('Suster Maria', 'Perawat Umum'),
('Suster Ani', 'Perawat IGD'),
('Suster Budi', 'Perawat Poli')
ON CONFLICT DO NOTHING;