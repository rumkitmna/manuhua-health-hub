import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Smile, 
  Users, 
  Clock, 
  Calendar,
  Plus,
  Search,
  Camera,
  FileImage,
  CheckCircle
} from "lucide-react";

const PoliGigi = () => {
  const treatments = [
    { name: "Scaling", count: 8, color: "primary" },
    { name: "Tambal Gigi", count: 12, color: "success" },
    { name: "Cabut Gigi", count: 4, color: "warning" },
    { name: "Pembersihan", count: 15, color: "primary" }
  ];

  const appointments = [
    {
      id: "DG001",
      name: "Ibu Ratna Sari",
      time: "09:00",
      treatment: "Scaling + Polishing",
      doctor: "Dr. Fitri Dental",
      status: "current",
      notes: "Kontrol rutin, plak ringan"
    },
    {
      id: "DG002",
      name: "Pak Andi Wijaya", 
      time: "09:30",
      treatment: "Tambal Gigi",
      doctor: "Dr. Fitri Dental",
      status: "waiting",
      notes: "Karies pada gigi geraham kanan"
    },
    {
      id: "DG003",
      name: "Adek Maya Putri",
      time: "10:00", 
      treatment: "Pemeriksaan Rutin",
      doctor: "Dr. Fitri Dental",
      status: "waiting",
      notes: "Pemeriksaan gigi anak, konsultasi ortodonti"
    },
    {
      id: "DG004",
      name: "Ibu Sri Handayani",
      time: "10:30",
      treatment: "Cabut Gigi Bungsu",
      doctor: "Dr. Ahmad Dental",
      status: "scheduled",
      notes: "Impaksi gigi bungsu, perlu tindakan bedah minor"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-primary text-primary-foreground";
      case "waiting": return "bg-warning/10 text-warning border border-warning";
      case "scheduled": return "bg-muted text-muted-foreground";
      case "completed": return "bg-success/10 text-success border border-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Smile className="w-6 h-6 text-primary" />
            Poliklinik Gigi
          </h1>
          <p className="text-muted-foreground">Layanan kesehatan gigi dan mulut komprehensif</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari pasien..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Foto Klinis
          </Button>
          <Button className="bg-gradient-medical hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Jadwal Baru
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
              <p className="text-xl font-bold text-foreground">18</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Antrian</p>
              <p className="text-xl font-bold text-warning">6</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selesai</p>
              <p className="text-xl font-bold text-success">12</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center">
              <FileImage className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dokumentasi</p>
              <p className="text-xl font-bold text-foreground">24</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Treatment Summary */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Tindakan Hari Ini</h3>
              <Badge variant="outline">Summary</Badge>
            </div>
            <div className="space-y-3">
              {treatments.map((treatment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      treatment.color === "primary" ? "bg-primary" :
                      treatment.color === "success" ? "bg-success" :
                      treatment.color === "warning" ? "bg-warning" : "bg-muted"
                    }`} />
                    <span className="font-medium text-foreground text-sm">{treatment.name}</span>
                  </div>
                  <Badge variant="outline">{treatment.count}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Tindakan</p>
              <p className="text-xl font-bold text-primary">39</p>
            </div>
          </Card>
        </div>

        {/* Appointment List */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Jadwal Perawatan</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Hari Ini
                </Button>
                <Button variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.time}
                        </Badge>
                        {appointment.status === "current" && (
                          <Badge className="bg-primary text-primary-foreground animate-pulse">
                            Sedang Dilayani
                          </Badge>
                        )}
                        <Badge variant="outline">{appointment.id}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground">{appointment.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Dokter: {appointment.doctor}
                      </p>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Tindakan:</strong> {appointment.treatment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Catatan:</strong> {appointment.notes}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Camera className="w-3 h-3 mr-1" />
                          Foto
                        </Button>
                        <Button variant="outline" size="sm">
                          Detail
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
    </div>
  );
};

export default PoliGigi;