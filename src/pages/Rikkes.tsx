import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Download,
  Calendar,
  FileText,
  Clock
} from "lucide-react";

const Rikkes = () => {
  const batches = [
    { name: "Batch 1", date: "2024-12-01", participants: 25, completed: 20, passed: 18, failed: 2 },
    { name: "Batch 2", date: "2024-12-08", participants: 30, completed: 15, passed: 12, failed: 3 },
    { name: "Batch 3", date: "2024-12-15", participants: 22, completed: 0, passed: 0, failed: 0 },
  ];

  const participants = [
    {
      id: "RK001",
      name: "Serda Ahmad Fauzi",
      nrp: "31240001",
      unit: "Skadron 12",
      tests: ["Fisik", "Lab", "Rontgen", "Gigi", "Psikotes"],
      status: "completed",
      result: "LULUS",
      examiner: "Dr. Sari Medika"
    },
    {
      id: "RK002", 
      name: "Kopda Budi Santoso",
      nrp: "31240002",
      unit: "Skadron 15",
      tests: ["Fisik", "Lab", "Rontgen"],
      status: "in-progress",
      result: "PROSES",
      examiner: "Dr. Ahmad Sehat"
    },
    {
      id: "RK003",
      name: "Praka Joko Widodo", 
      nrp: "31240003",
      unit: "Skadron 12",
      tests: ["Fisik", "Lab", "Rontgen", "Gigi", "Psikotes"],
      status: "completed",
      result: "TIDAK LULUS",
      examiner: "Dr. Sari Medika"
    },
    {
      id: "RK004",
      name: "Serka Siti Aisyah",
      nrp: "31240004",
      unit: "Skadron 21",
      tests: ["Fisik", "Lab"],
      status: "scheduled",
      result: "DIJADWALKAN",
      examiner: "-"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-warning/10 text-warning border border-warning";
      case "cancelled": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case "LULUS": return "bg-success text-success-foreground";
      case "TIDAK LULUS": return "bg-emergency text-emergency-foreground";
      case "PROSES": return "bg-primary text-primary-foreground";
      case "DIJADWALKAN": return "bg-warning/10 text-warning border border-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Rikkes TNI AU
          </h1>
          <p className="text-muted-foreground">Pemeriksaan Kesehatan TNI Angkatan Udara</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari peserta..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Laporan
          </Button>
          <Button className="bg-gradient-medical hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Jadwal Batch
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
              <p className="text-sm text-muted-foreground">Total Peserta</p>
              <p className="text-xl font-bold text-foreground">77</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lulus</p>
              <p className="text-xl font-bold text-success">30</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emergency/10 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-emergency" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tidak Lulus</p>
              <p className="text-xl font-bold text-emergency">5</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proses</p>
              <p className="text-xl font-bold text-warning">42</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Batch Summary */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Batch Rikkes</h3>
              <Badge variant="outline">Desember 2024</Badge>
            </div>
            <div className="space-y-4">
              {batches.map((batch, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{batch.name}</h4>
                    <Badge variant="outline">{batch.participants} org</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Tanggal: {new Date(batch.date).toLocaleDateString('id-ID')}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-primary font-semibold">{batch.completed}</p>
                      <p className="text-muted-foreground">Selesai</p>
                    </div>
                    <div className="text-center">
                      <p className="text-success font-semibold">{batch.passed}</p>
                      <p className="text-muted-foreground">Lulus</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emergency font-semibold">{batch.failed}</p>
                      <p className="text-muted-foreground">Gagal</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Participant List */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Daftar Peserta Rikkes</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Filter Batch
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Cetak
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {participants.map((participant) => (
                <div key={participant.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getStatusBadge(participant.status)}>
                          {participant.status === "completed" ? "Selesai" :
                           participant.status === "in-progress" ? "Proses" :
                           participant.status === "scheduled" ? "Dijadwalkan" : "Unknown"}
                        </Badge>
                        <Badge className={getResultBadge(participant.result)}>
                          {participant.result}
                        </Badge>
                        <Badge variant="outline">{participant.id}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground">{participant.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        NRP: {participant.nrp} • Unit: {participant.unit}
                      </p>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Pemeriksaan:</strong> {participant.tests.join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Dokter Pemeriksa:</strong> {participant.examiner}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {participant.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <FileText className="w-3 h-3 mr-1" />
                            Sertifikat
                          </Button>
                        )}
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

export default Rikkes;