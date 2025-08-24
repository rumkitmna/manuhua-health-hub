import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface IGDFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export const IGDForm = ({ onSubmit, initialData, isLoading }: IGDFormProps) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    case_id: initialData?.case_id || '',
    patient_id: initialData?.patient_id || '',
    complaint: initialData?.complaint || '',
    triage: initialData?.triage || '',
    bed_id: initialData?.bed_id || '',
    doctor_id: initialData?.doctor_id || '',
    status: initialData?.status || 'active',
    notes: initialData?.notes || ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch patients
    const { data: patientsData } = await supabase
      .from('patients')
      .select('id, name, patient_id')
      .order('name');

    // Fetch doctors
    const { data: doctorsData } = await supabase
      .from('doctors')
      .select('id, name')
      .eq('active', true)
      .order('name');

    // Fetch available beds
    const { data: bedsData } = await supabase
      .from('beds')
      .select('id, bed_number')
      .eq('status', 'available')
      .order('bed_number');

    setPatients(patientsData || []);
    setDoctors(doctorsData || []);
    setBeds(bedsData || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="case_id">ID Kasus</Label>
          <Input
            id="case_id"
            value={formData.case_id}
            onChange={(e) => setFormData(prev => ({ ...prev, case_id: e.target.value }))}
            placeholder="IGD001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patient_id">Pasien</Label>
          <Select value={formData.patient_id} onValueChange={(value) => setFormData(prev => ({ ...prev, patient_id: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih pasien" />
            </SelectTrigger>
            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.name} ({patient.patient_id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="complaint">Keluhan</Label>
        <Textarea
          id="complaint"
          value={formData.complaint}
          onChange={(e) => setFormData(prev => ({ ...prev, complaint: e.target.value }))}
          placeholder="Keluhan utama pasien"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="triage">Triase</Label>
          <Select value={formData.triage} onValueChange={(value) => setFormData(prev => ({ ...prev, triage: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih triase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Merah">Merah (Kritis)</SelectItem>
              <SelectItem value="Kuning">Kuning (Urgent)</SelectItem>
              <SelectItem value="Hijau">Hijau (Non-Urgent)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bed_id">Bed</Label>
          <Select value={formData.bed_id} onValueChange={(value) => setFormData(prev => ({ ...prev, bed_id: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih bed" />
            </SelectTrigger>
            <SelectContent>
              {beds.map((bed) => (
                <SelectItem key={bed.id} value={bed.id}>
                  Bed {bed.bed_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="doctor_id">Dokter</Label>
          <Select value={formData.doctor_id} onValueChange={(value) => setFormData(prev => ({ ...prev, doctor_id: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih dokter" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="stable">Stabil</SelectItem>
              <SelectItem value="critical">Kritis</SelectItem>
              <SelectItem value="discharged">Dipulangkan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Catatan</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Catatan tambahan"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : initialData ? 'Update Kasus' : 'Tambah Kasus IGD'}
      </Button>
    </form>
  );
};