-- Create patients table
CREATE TABLE public.patients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Laki-laki', 'Perempuan')),
  phone VARCHAR(20),
  address TEXT,
  emergency_contact VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  schedule JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create beds table for IGD
CREATE TABLE public.beds (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  bed_number INTEGER NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'cleaning', 'maintenance')),
  patient_id UUID REFERENCES public.patients(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create IGD cases table
CREATE TABLE public.igd_cases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id VARCHAR(20) NOT NULL UNIQUE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  complaint TEXT NOT NULL,
  triage VARCHAR(10) NOT NULL CHECK (triage IN ('Merah', 'Kuning', 'Hijau')),
  bed_id UUID REFERENCES public.beds(id),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'stable', 'critical', 'discharged')),
  doctor_id UUID REFERENCES public.doctors(id),
  admission_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  discharge_time TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id VARCHAR(20) NOT NULL UNIQUE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  doctor_id UUID NOT NULL REFERENCES public.doctors(id),
  department VARCHAR(50) NOT NULL CHECK (department IN ('Poli Umum', 'Poli Gigi')),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  complaint TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'current', 'waiting', 'completed', 'cancelled')),
  queue_number VARCHAR(10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medical records table
CREATE TABLE public.medical_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  doctor_id UUID NOT NULL REFERENCES public.doctors(id),
  appointment_id UUID REFERENCES public.appointments(id),
  igd_case_id UUID REFERENCES public.igd_cases(id),
  diagnosis TEXT,
  treatment TEXT,
  prescription TEXT,
  notes TEXT,
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lab tests table
CREATE TABLE public.lab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id VARCHAR(20) NOT NULL UNIQUE,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  doctor_id UUID REFERENCES public.doctors(id),
  test_type VARCHAR(100) NOT NULL,
  test_name VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'stat')),
  requested_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sample_collected_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lab results table
CREATE TABLE public.lab_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id UUID NOT NULL REFERENCES public.lab_tests(id),
  parameter VARCHAR(255) NOT NULL,
  value VARCHAR(255),
  unit VARCHAR(50),
  reference_range VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'normal' CHECK (status IN ('normal', 'abnormal', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rikkes participants table
CREATE TABLE public.rikkes_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  rank VARCHAR(50),
  unit VARCHAR(100),
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Laki-laki', 'Perempuan')),
  phone VARCHAR(20),
  examination_date DATE NOT NULL,
  batch VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'failed')),
  overall_result VARCHAR(20) CHECK (overall_result IN ('Fit', 'Unfit', 'Pending')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rikkes examinations table
CREATE TABLE public.rikkes_examinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id UUID NOT NULL REFERENCES public.rikkes_participants(id),
  examination_type VARCHAR(100) NOT NULL,
  examination_name VARCHAR(255) NOT NULL,
  result VARCHAR(50),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'passed', 'failed', 'recheck')),
  examiner VARCHAR(255),
  notes TEXT,
  examination_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.igd_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rikkes_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rikkes_examinations ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - can be restricted later based on user roles)
CREATE POLICY "Enable all operations for patients" ON public.patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for doctors" ON public.doctors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for beds" ON public.beds FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for igd_cases" ON public.igd_cases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for appointments" ON public.appointments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for medical_records" ON public.medical_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for lab_tests" ON public.lab_tests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for lab_results" ON public.lab_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for rikkes_participants" ON public.rikkes_participants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for rikkes_examinations" ON public.rikkes_examinations FOR ALL USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_beds_updated_at BEFORE UPDATE ON public.beds FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_igd_cases_updated_at BEFORE UPDATE ON public.igd_cases FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lab_tests_updated_at BEFORE UPDATE ON public.lab_tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rikkes_participants_updated_at BEFORE UPDATE ON public.rikkes_participants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample doctors
INSERT INTO public.doctors (name, specialization, schedule, active) VALUES
('Dr. Sarah Wijaya', 'Dokter Umum', '{"senin": "08:00-12:00", "selasa": "08:00-12:00", "rabu": "08:00-12:00"}', true),
('Dr. Ahmad Fauzi', 'Dokter Umum', '{"senin": "14:00-18:00", "selasa": "14:00-18:00", "rabu": "14:00-18:00"}', true),
('Dr. Linda Sari', 'Dokter Umum', '{"kamis": "08:00-12:00", "jumat": "08:00-12:00", "sabtu": "08:00-12:00"}', true),
('Dr. Budi Hartono', 'Dokter Umum', '{"kamis": "14:00-18:00", "jumat": "14:00-18:00", "sabtu": "14:00-18:00"}', true),
('Dr. Fitri Dental', 'Dokter Gigi', '{"senin": "08:00-16:00", "selasa": "08:00-16:00", "rabu": "08:00-16:00"}', true),
('Dr. Ahmad Dental', 'Dokter Gigi', '{"kamis": "08:00-16:00", "jumat": "08:00-16:00", "sabtu": "08:00-12:00"}', true);

-- Insert sample beds
INSERT INTO public.beds (bed_number, status) VALUES
(1, 'available'), (2, 'available'), (3, 'available'), (4, 'available'),
(5, 'available'), (6, 'maintenance'), (7, 'available'), (8, 'available');

-- Insert sample patients for testing
INSERT INTO public.patients (patient_id, name, date_of_birth, gender, phone, address) VALUES
('P001', 'Ahmad Wijaya', '1978-05-15', 'Laki-laki', '081234567890', 'Jl. Merdeka No. 123'),
('P002', 'Siti Nurhaliza', '1991-08-22', 'Perempuan', '081234567891', 'Jl. Sudirman No. 456'),
('P003', 'Budi Santoso', '1995-03-10', 'Laki-laki', '081234567892', 'Jl. Gatot Subroto No. 789'),
('P004', 'Ibu Siti Aminah', '1970-12-05', 'Perempuan', '081234567893', 'Jl. Ahmad Yani No. 321'),
('P005', 'Pak Joko Susilo', '1965-07-18', 'Laki-laki', '081234567894', 'Jl. Diponegoro No. 654');