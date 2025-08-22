import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FlaskConical, 
  Microscope, 
  Clock, 
  Download,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Printer
} from "lucide-react";

const Laboratorium = () => {
  const labTests = [
    { name: "Darah Lengkap", pending: 8, completed: 15, urgent: 2 },
    { name: "Urine Lengkap", pending: 5, completed: 12, urgent: 0 },
    { name: "Kimia Darah", pending: 12, completed: 8, urgent: 3 },
    { name: "Serologi", pending: 3, completed: 6, urgent: 1 },
  ];

  const samples = [
    {
      id: "LAB001",
      patient: "Ibu Sari Dewi",
      tests: ["Darah Lengkap", "Gula Darah"],
      time: "07:30",
      status: "completed",
      results: "Normal",
      technician: "Analis Budi"
    },
    {
      id: "LAB002", 
      patient: "Pak Joko Widodo",
      tests: ["Urine Lengkap", "Protein"],
      time: "08:15",
      status: "processing",
      results: "-",
      technician: "Analis Siti"
    },
    {
      id: "LAB003",
      patient: "Adek Rina Putri", 
      tests: ["Kimia Darah"],
      time: "08:45",
      status: "urgent",
      results: "Critical",
      technician: "Analis Ahmad"
    },
    {
      id: "LAB004",
      patient: "Ibu Tini Kartini",
      tests: ["Serologi", "HbsAg"],
      time: "09:10",
      status: "pending",
      results: "-", 
      technician: "-"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "processing": return "bg-primary text-primary-foreground";
      case "urgent": return "bg-emergency text-emergency-foreground animate-pulse";
      case "pending": return "bg-warning/10 text-warning border border-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Selesai";
      case "processing": return "Proses";
      case "urgent": return "Urgent";
      case "pending": return "Menunggu";
      default: return "Unknown";
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-primary" />
            Laboratorium
          </h1>
          <p className="text-muted-foreground">Pengelolaan pemeriksaan dan hasil laboratorium</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari sampel..." 
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Cetak Hasil
          </Button>
          <Button className="bg-gradient-medical hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            Sampel Baru
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Microscope className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sampel Hari Ini</p>
              <p className="text-xl font-bold text-foreground">28</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dalam Proses</p>
              <p className="text-xl font-bold text-warning">28</p>
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
              <p className="text-xl font-bold text-success">41</p>
            </div>
          </div>
        </Card>
        
        <Card className="medical-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emergency/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-emergency" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Urgent</p>
              <p className="text-xl font-bold text-emergency">6</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Summary */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Jenis Pemeriksaan</h3>
              <Badge variant="outline">Hari Ini</Badge>
            </div>
            <div className="space-y-4">
              {labTests.map((test, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">{test.name}</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-warning font-semibold">{test.pending}</p>
                      <p className="text-muted-foreground">Pending</p>
                    </div>
                    <div className="text-center">
                      <p className="text-success font-semibold">{test.completed}</p>
                      <p className="text-muted-foreground">Selesai</p>
                    </div>
                    <div className="text-center">
                      <p className="text-emergency font-semibold">{test.urgent}</p>
                      <p className="text-muted-foreground">Urgent</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sample List */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Daftar Sampel</h3>
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
              {samples.map((sample) => (
                <div key={sample.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getStatusBadge(sample.status)}>
                          {getStatusText(sample.status)}
                        </Badge>
                        <Badge variant="outline">{sample.id}</Badge>
                        <span className="text-xs text-muted-foreground">{sample.time}</span>
                      </div>
                      <h4 className="font-semibold text-foreground">{sample.patient}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        Pemeriksaan: {sample.tests.join(", ")}
                      </p>
                      <p className="text-sm text-foreground">
                        <strong>Analis:</strong> {sample.technician || "Belum ditugaskan"}
                      </p>
                      {sample.results !== "-" && (
                        <div className="mt-2">
                          <Badge className={
                            sample.results === "Critical" ? "bg-emergency/10 text-emergency border border-emergency" :
                            sample.results === "Abnormal" ? "bg-warning/10 text-warning border border-warning" :
                            "bg-success/10 text-success border border-success"
                          }>
                            {sample.results}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        {sample.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Printer className="w-3 h-3 mr-1" />
                              Print
                            </Button>
                          </>
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

export default Laboratorium;