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
  FileText
} from "lucide-react";

const PoliUmum = () => {
  const todaySchedule = [
    { time: "08:00", doctor: "Dr. Sarah Wijaya", patients: 12, status: "active" },
    { time: "10:00", doctor: "Dr. Ahmad Fauzi", patients: 8, status: "active" },
    { time: "14:00", doctor: "Dr. Linda Sari", patients: 15, status: "waiting" },
    { time: "16:00", doctor: "Dr. Budi Hartono", patients: 6, status: "waiting" },
  ];

  const queueList = [
    {
      no: "A001",
      name: "Ibu Siti Aminah", 
      time: "08:15",
      complaint: "Kontrol diabetes",
      doctor: "Dr. Sarah Wijaya",
      status: "current"
    },
    {
      no: "A002",
      name: "Pak Joko Susilo",
      time: "08:30", 
      complaint: "Hipertensi",
      doctor: "Dr. Sarah Wijaya",
      status: "waiting"
    },
    {
      no: "A003",
      name: "Ibu Maria Santos",
      time: "08:45",
      complaint: "Demam dan batuk",
      doctor: "Dr. Sarah Wijaya", 
      status: "waiting"
    },
    {
      no: "B001",
      name: "Pak Agus Rahmat",
      time: "10:15",
      complaint: "Nyeri punggung",
      doctor: "Dr. Ahmad Fauzi",
      status: "waiting"
    }
  ];

  const getQueueStatus = (status: string) => {
    switch (status) {
      case "current": return "bg-primary text-primary-foreground";
      case "waiting": return "bg-warning/10 text-warning border border-warning";
      case "done": return "bg-success/10 text-success border border-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Registrasi
          </Button>
          <Button className="bg-gradient-medical hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Pasien Baru
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
              <p className="text-xl font-bold text-foreground">41</p>
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
              <p className="text-xl font-bold text-warning">12</p>
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
              <p className="text-xl font-bold text-success">29</p>
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
              {queueList.map((patient, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getQueueStatus(patient.status)}>
                          {patient.no}
                        </Badge>
                        {patient.status === "current" && (
                          <Badge className="bg-primary text-primary-foreground animate-pulse">
                            Sedang Dilayani
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground">{patient.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Dokter: {patient.doctor}
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Keluhan:</strong> {patient.complaint}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {patient.time}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Panggil
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

export default PoliUmum;