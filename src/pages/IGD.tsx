import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Activity, 
  Clock, 
  User, 
  Plus,
  Search,
  AlertTriangle,
  Heart,
  Thermometer,
  Edit,
  Trash2
} from "lucide-react";
import { useIGD } from "@/hooks/useIGD";
import { useState } from "react";
import { CrudModal, DeleteModal } from "@/components/modals/CrudModal";
import { IGDForm } from "@/components/forms/IGDForm";
import { useToast } from "@/hooks/use-toast";

const IGD = () => {
  const { igdCases, beds, loading, error, fetchIGDData, addIGDCase, updateIGDCase, deleteIGDCase } = useIGD();
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    const { error } = await addIGDCase(data);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Kasus IGD berhasil ditambahkan"
      });
      setIsCreateModalOpen(false);
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (data: any) => {
    if (!selectedCase) return;
    
    setIsSubmitting(true);
    const { error } = await updateIGDCase(selectedCase.id, data);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Kasus IGD berhasil diupdate"
      });
      setIsEditModalOpen(false);
      setSelectedCase(null);
    }
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!selectedCase) return;
    
    setIsSubmitting(true);
    const { error } = await deleteIGDCase(selectedCase.id);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Kasus IGD berhasil dihapus"
      });
      setIsDeleteModalOpen(false);
      setSelectedCase(null);
    }
    setIsSubmitting(false);
  };

  const getTriaseColor = (triase: string) => {
    switch (triase.toLowerCase()) {
      case "merah": return "bg-emergency text-emergency-foreground";
      case "kuning": return "bg-warning text-warning-foreground";
      case "hijau": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case "occupied": return "bg-emergency/10 border-emergency text-emergency";
      case "available": return "bg-success/10 border-success text-success";
      case "cleaning": return "bg-warning/10 border-warning text-warning";
      case "maintenance": return "bg-muted border-border text-muted-foreground";
      default: return "bg-muted border-border text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
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
            <Activity className="w-6 h-6 text-emergency" />
            Instalasi Gawat Darurat (IGD)
          </h1>
          <p className="text-muted-foreground">Monitoring dan pengelolaan pasien darurat</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari pasien..." 
              className="pl-10 w-64"
            />
          </div>
          <Button className="bg-gradient-medical hover:bg-primary-hover" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Pasien Baru
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emergency/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-emergency" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pasien Kritis</p>
              <p className="text-xl font-bold text-emergency">{igdCases.filter(c => c.triage === 'Merah').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pasien</p>
              <p className="text-xl font-bold text-foreground">{igdCases.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bed Tersedia</p>
              <p className="text-xl font-bold text-success">{beds.filter(b => b.status === 'available').length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Response</p>
              <p className="text-xl font-bold text-warning">8 min</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Monitoring */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Monitoring Bed</h3>
              <Badge variant="outline">{beds.length} Total</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {beds.map((bed) => (
                <div 
                  key={bed.id}
                  className={`p-3 rounded-lg border-2 transition-colors ${getBedStatusColor(bed.status)}`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm">Bed {bed.bed_number}</p>
                    {bed.patients ? (
                      <p className="text-xs mt-1 truncate">{bed.patients.name}</p>
                    ) : (
                      <p className="text-xs mt-1 capitalize">{bed.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Patient List */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Daftar Pasien IGD</h3>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            <div className="space-y-3">
              {igdCases.map((patient) => (
                <div key={patient.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{patient.patients.name}</h4>
                        <Badge className={getTriaseColor(patient.triage)}>
                          {patient.triage}
                        </Badge>
                        <Badge variant="outline">
                          {patient.beds ? `Bed ${patient.beds.bed_number}` : 'No Bed'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        ID: {patient.case_id} • Usia: {patient.patients.age || 'N/A'} tahun
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Keluhan:</strong> {patient.complaint}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(patient.admission_time).toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedCase(patient);
                          setIsEditModalOpen(true);
                        }}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          setSelectedCase(patient);
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
        title="Tambah Kasus IGD Baru"
      >
        <IGDForm
          onSubmit={handleCreate}
          isLoading={isSubmitting}
        />
      </CrudModal>

      <CrudModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCase(null);
        }}
        title="Edit Kasus IGD"
      >
        <IGDForm
          onSubmit={handleUpdate}
          initialData={selectedCase}
          isLoading={isSubmitting}
        />
      </CrudModal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCase(null);
        }}
        onConfirm={handleDelete}
        title="Hapus Kasus IGD"
        description={`Apakah Anda yakin ingin menghapus kasus ${selectedCase?.case_id}? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default IGD;