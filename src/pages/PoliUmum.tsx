import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Stethoscope, 
  Users, 
  Clock, 
  Calendar,
  Plus,
  Search,
  UserPlus,
  FileText,
  Edit,
  Trash2
} from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { useState } from "react";
import { CrudModal, DeleteModal } from "@/components/modals/CrudModal";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { useToast } from "@/hooks/use-toast";

const PoliUmum = () => {
  const { appointments, loading, error, addAppointment, updateAppointment, deleteAppointment } = useAppointments('Poli Umum');
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    const { error } = await addAppointment(data);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Appointment berhasil dibuat"
      });
      setIsCreateModalOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (data: any) => {
    if (!selectedAppointment) return;
    
    setIsSubmitting(true);
    const { error } = await updateAppointment(selectedAppointment.id, data);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Appointment berhasil diupdate"
      });
      setIsEditModalOpen(false);
      setSelectedAppointment(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!selectedAppointment) return;
    
    setIsSubmitting(true);
    const { error } = await deleteAppointment(selectedAppointment.id);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Appointment berhasil dihapus"
      });
      setIsDeleteModalOpen(false);
      setSelectedAppointment(null);
    }
    setIsSubmitting(false);
  };

  const todaySchedule = [
    { time: "08:00", doctor: "Dr. Sarah Wijaya", patients: appointments.filter(a => a.doctors.name === "Dr. Sarah Wijaya").length, status: "active" },
    { time: "10:00", doctor: "Dr. Ahmad Fauzi", patients: appointments.filter(a => a.doctors.name === "Dr. Ahmad Fauzi").length, status: "active" },
    { time: "14:00", doctor: "Dr. Linda Sari", patients: appointments.filter(a => a.doctors.name === "Dr. Linda Sari").length, status: "waiting" },
    { time: "16:00", doctor: "Dr. Budi Hartono", patients: appointments.filter(a => a.doctors.name === "Dr. Budi Hartono").length, status: "waiting" },
  ];

  const getQueueStatus = (status: string) => {
    switch (status) {
      case "current": return "bg-primary text-primary-foreground";
      case "waiting": return "bg-warning/10 text-warning border border-warning";
      case "completed": return "bg-success/10 text-success border border-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 lg:p-6">
        <div className="text-center text-destructive">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-primary" />
            Poliklinik Umum
          </h1>
          <p className="text-muted-foreground">Layanan kesehatan umum dan pemeriksaan rutin</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari pasien..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Appointment
          </Button>
          <Button className="bg-gradient-medical hover:bg-primary-hover" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            SOAP
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pasien Hari Ini</p>
              <p className="text-xl font-bold text-foreground">{appointments.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Antrian Aktif</p>
              <p className="text-xl font-bold text-warning">{appointments.filter(a => a.status === 'waiting' || a.status === 'current').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-xl font-bold text-success">{appointments.filter(a => a.status === 'completed').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Waktu</p>
              <p className="text-xl font-bold text-foreground">15 min</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Schedule */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Jadwal Dokter</h3>
              <Badge variant="outline">Hari Ini</Badge>
            </div>
            <div className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={schedule.status === "active" ? "default" : "outline"}>
                        {schedule.time}
                      </Badge>
                      <span className={`w-2 h-2 rounded-full ${
                        schedule.status === "active" ? "bg-success" : "bg-warning"
                      }`} />
                    </div>
                  </div>
                  <p className="font-medium text-foreground text-sm">{schedule.doctor}</p>
                  <p className="text-xs text-muted-foreground">
                    {schedule.patients} pasien terdaftar
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Queue List */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Antrian Pasien</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Real-time
                </Button>
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {appointments.map((patient, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getQueueStatus(patient.status)}>
                          {patient.queue_number || patient.appointment_id}
                        </Badge>
                        {patient.status === "current" && (
                          <Badge className="bg-primary text-primary-foreground animate-pulse">
                            Sedang Dilayani
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground">{patient.patients.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Dokter: {patient.doctors.name}
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Keluhan:</strong> {patient.complaint || 'Tidak ada keluhan'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {patient.appointment_time}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedAppointment(patient);
                          setIsEditModalOpen(true);
                        }}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          SOAP
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedAppointment(patient);
                          setIsDeleteModalOpen(true);
                        }}>
                          <Trash2 className="w-3 h-3 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CrudModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Buat Appointment Baru"
      >
        <AppointmentForm
          onSubmit={handleCreate}
          department="Poli Umum"
          isLoading={isSubmitting}
        />
      </CrudModal>

      <CrudModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAppointment(null);
        }}
        title="Edit Appointment"
      >
        <AppointmentForm
          onSubmit={handleUpdate}
          initialData={selectedAppointment}
          department="Poli Umum"
          isLoading={isSubmitting}
        />
      </CrudModal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Appointment"
        description={`Apakah Anda yakin ingin menghapus appointment ${selectedAppointment?.appointment_id}? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default PoliUmum;