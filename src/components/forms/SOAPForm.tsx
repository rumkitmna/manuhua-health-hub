import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface SOAPFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
  appointmentId: string;
  patientId: string;
  examinationType: 'doctor' | 'nurse';
}

export const SOAPForm = ({ onSubmit, initialData, isLoading, appointmentId, patientId, examinationType }: SOAPFormProps) => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [nurses, setNurses] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    appointment_id: appointmentId,
    patient_id: patientId,
    doctor_id: initialData?.doctor_id || '',
    nurse_id: initialData?.nurse_id || '',
    examination_type: examinationType,
    subjective: initialData?.subjective || '',
    objective: initialData?.objective || '',
    assessment: initialData?.assessment || '',
    plan: initialData?.plan || '',
    vital_signs: {
      blood_pressure_systolic: initialData?.vital_signs?.blood_pressure_systolic || '',
      blood_pressure_diastolic: initialData?.vital_signs?.blood_pressure_diastolic || '',
      heart_rate: initialData?.vital_signs?.heart_rate || '',
      temperature: initialData?.vital_signs?.temperature || '',
      respiratory_rate: initialData?.vital_signs?.respiratory_rate || '',
      oxygen_saturation: initialData?.vital_signs?.oxygen_saturation || '',
      weight: initialData?.vital_signs?.weight || '',
      height: initialData?.vital_signs?.height || ''
    },
    status: initialData?.status || 'draft'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (examinationType === 'doctor') {
      const { data: doctorsData } = await supabase
        .from('doctors')
        .select('id, name')
        .eq('active', true)
        .order('name');
      setDoctors(doctorsData || []);
    } else {
      const { data: nursesData } = await supabase
        .from('nurses')
        .select('id, name')
        .eq('active', true)
        .order('name');
      setNurses(nursesData || []);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleVitalSignChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      vital_signs: {
        ...prev.vital_signs,
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {examinationType === 'doctor' ? 'Pemeriksaan Dokter' : 'Pemeriksaan Perawat'} - SOAP
          </h3>
          <p className="text-sm text-muted-foreground">
            Subjective, Objective, Assessment, Plan
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="examiner">
            {examinationType === 'doctor' ? 'Dokter' : 'Perawat'}
          </Label>
          <Select 
            value={examinationType === 'doctor' ? formData.doctor_id : formData.nurse_id} 
            onValueChange={(value) => setFormData(prev => ({ 
              ...prev, 
              [examinationType === 'doctor' ? 'doctor_id' : 'nurse_id']: value 
            }))}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder={`Pilih ${examinationType === 'doctor' ? 'dokter' : 'perawat'}`} />
            </SelectTrigger>
            <SelectContent>
              {(examinationType === 'doctor' ? doctors : nurses).map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vital Signs */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Tanda Vital</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="blood_pressure">Tekanan Darah</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Sistol"
                value={formData.vital_signs.blood_pressure_systolic}
                onChange={(e) => handleVitalSignChange('blood_pressure_systolic', e.target.value)}
              />
              <Input
                placeholder="Diastol"
                value={formData.vital_signs.blood_pressure_diastolic}
                onChange={(e) => handleVitalSignChange('blood_pressure_diastolic', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="heart_rate">Denyut Nadi (bpm)</Label>
            <Input
              type="number"
              value={formData.vital_signs.heart_rate}
              onChange={(e) => handleVitalSignChange('heart_rate', e.target.value)}
              placeholder="80"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">Suhu (°C)</Label>
            <Input
              type="number"
              step="0.1"
              value={formData.vital_signs.temperature}
              onChange={(e) => handleVitalSignChange('temperature', e.target.value)}
              placeholder="36.5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="respiratory_rate">Nafas (/menit)</Label>
            <Input
              type="number"
              value={formData.vital_signs.respiratory_rate}
              onChange={(e) => handleVitalSignChange('respiratory_rate', e.target.value)}
              placeholder="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="oxygen_saturation">SpO2 (%)</Label>
            <Input
              type="number"
              value={formData.vital_signs.oxygen_saturation}
              onChange={(e) => handleVitalSignChange('oxygen_saturation', e.target.value)}
              placeholder="98"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Berat Badan (kg)</Label>
            <Input
              type="number"
              step="0.1"
              value={formData.vital_signs.weight}
              onChange={(e) => handleVitalSignChange('weight', e.target.value)}
              placeholder="70"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Tinggi Badan (cm)</Label>
            <Input
              type="number"
              value={formData.vital_signs.height}
              onChange={(e) => handleVitalSignChange('height', e.target.value)}
              placeholder="170"
            />
          </div>
        </div>
      </Card>

      <Separator />

      {/* SOAP Fields */}
      <div className="space-y-4">
        {/* Subjective */}
        <div className="space-y-2">
          <Label htmlFor="subjective">
            <span className="font-semibold text-primary">S</span> - Subjective (Keluhan Pasien)
          </Label>
          <Textarea
            id="subjective"
            value={formData.subjective}
            onChange={(e) => setFormData(prev => ({ ...prev, subjective: e.target.value }))}
            placeholder="Keluhan utama pasien, riwayat penyakit saat ini..."
            rows={3}
          />
        </div>

        {/* Objective */}
        <div className="space-y-2">
          <Label htmlFor="objective">
            <span className="font-semibold text-primary">O</span> - Objective (Hasil Pemeriksaan)
          </Label>
          <Textarea
            id="objective"
            value={formData.objective}
            onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
            placeholder="Hasil pemeriksaan fisik, temuan objektif..."
            rows={3}
          />
        </div>

        {/* Assessment */}
        <div className="space-y-2">
          <Label htmlFor="assessment">
            <span className="font-semibold text-primary">A</span> - Assessment (Diagnosis)
          </Label>
          <Textarea
            id="assessment"
            value={formData.assessment}
            onChange={(e) => setFormData(prev => ({ ...prev, assessment: e.target.value }))}
            placeholder="Diagnosis kerja, diagnosis banding..."
            rows={3}
          />
        </div>

        {/* Plan */}
        <div className="space-y-2">
          <Label htmlFor="plan">
            <span className="font-semibold text-primary">P</span> - Plan (Rencana Tindakan)
          </Label>
          <Textarea
            id="plan"
            value={formData.plan}
            onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
            placeholder="Rencana terapi, edukasi, kontrol kembali..."
            rows={3}
          />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : initialData ? 'Update SOAP' : 'Simpan SOAP'}
        </Button>
      </div>
    </form>
  );
};