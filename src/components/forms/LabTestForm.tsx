import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface LabTestFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export const LabTestForm = ({ onSubmit, initialData, isLoading }: LabTestFormProps) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    test_id: initialData?.test_id || '',
    patient_id: initialData?.patient_id || '',
    doctor_id: initialData?.doctor_id || '',
    test_type: initialData?.test_type || '',
    test_name: initialData?.test_name || '',
    status: initialData?.status || 'pending',
    priority: initialData?.priority || 'normal',
    notes: initialData?.notes || ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: patientsData } = await supabase
      .from('patients')
      .select('id, name, patient_id')
      .order('name');

    const { data: doctorsData } = await supabase
      .from('doctors')
      .select('id, name')
      .eq('active', true)
      .order('name');

    setPatients(patientsData || []);
    setDoctors(doctorsData || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="test_id">ID Test</Label>
          <Input
            id="test_id"
            value={formData.test_id}
            onChange={(e) => setFormData(prev => ({ ...prev, test_id: e.target.value }))}
            placeholder="LAB001"
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="test_type">Jenis Test</Label>
          <Select value={formData.test_type} onValueChange={(value) => setFormData(prev => ({ ...prev, test_type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hematologi">Hematologi</SelectItem>
              <SelectItem value="Kimia Klinik">Kimia Klinik</SelectItem>
              <SelectItem value="Mikrobiologi">Mikrobiologi</SelectItem>
              <SelectItem value="Urinalisis">Urinalisis</SelectItem>
              <SelectItem value="Imunologi">Imunologi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="test_name">Nama Test</Label>
          <Input
            id="test_name"
            value={formData.test_name}
            onChange={(e) => setFormData(prev => ({ ...prev, test_name: e.target.value }))}
            placeholder="Darah Lengkap"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioritas</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih prioritas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="stat">STAT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="doctor_id">Dokter Pengirim</Label>
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

      <div className="space-y-2">
        <Label htmlFor="notes">Catatan</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Catatan tambahan"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : initialData ? 'Update Test' : 'Tambah Test Lab'}
      </Button>
    </form>
  );
};