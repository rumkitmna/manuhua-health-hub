import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
  department?: string;
}

export const AppointmentForm = ({ onSubmit, initialData, isLoading, department }: AppointmentFormProps) => {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    appointment_id: initialData?.appointment_id || '',
    patient_id: initialData?.patient_id || '',
    doctor_id: initialData?.doctor_id || '',
    department: initialData?.department || department || 'Poli Umum',
    appointment_date: initialData?.appointment_date ? new Date(initialData.appointment_date) : new Date(),
    appointment_time: initialData?.appointment_time || '08:00',
    complaint: initialData?.complaint || '',
    status: initialData?.status || 'scheduled',
    queue_number: initialData?.queue_number || '',
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

    // Fetch doctors based on department
    const specialization = department === 'Poli Gigi' ? 'Dokter Gigi' : 'Dokter Umum';
    const { data: doctorsData } = await supabase
      .from('doctors')
      .select('id, name')
      .eq('specialization', specialization)
      .eq('active', true)
      .order('name');

    setPatients(patientsData || []);
    setDoctors(doctorsData || []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      appointment_date: format(formData.appointment_date, 'yyyy-MM-dd')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="appointment_id">ID Appointment</Label>
          <Input
            id="appointment_id"
            value={formData.appointment_id}
            onChange={(e) => setFormData(prev => ({ ...prev, appointment_id: e.target.value }))}
            placeholder="A001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="queue_number">Nomor Antrian</Label>
          <Input
            id="queue_number"
            value={formData.queue_number}
            onChange={(e) => setFormData(prev => ({ ...prev, queue_number: e.target.value }))}
            placeholder="A001"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Tanggal</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.appointment_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.appointment_date ? format(formData.appointment_date, "dd/MM/yyyy") : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.appointment_date}
                onSelect={(date) => setFormData(prev => ({ ...prev, appointment_date: date || new Date() }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appointment_time">Waktu</Label>
          <Input
            id="appointment_time"
            type="time"
            value={formData.appointment_time}
            onChange={(e) => setFormData(prev => ({ ...prev, appointment_time: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Terjadwal</SelectItem>
              <SelectItem value="current">Sedang Dilayani</SelectItem>
              <SelectItem value="waiting">Menunggu</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
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
          placeholder="Keluhan pasien"
        />
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
        {isLoading ? 'Menyimpan...' : initialData ? 'Update Appointment' : 'Buat Appointment'}
      </Button>
    </form>
  );
};