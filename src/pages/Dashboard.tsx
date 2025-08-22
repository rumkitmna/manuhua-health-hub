import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Calendar, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Pasien Hari Ini",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "primary"
    },
    {
      title: "IGD Aktif",
      value: "8",
      change: "2 Kritis",
      trend: "warning",
      icon: Activity,
      color: "emergency"
    },
    {
      title: "Antrian Poli",
      value: "23",
      change: "Rata-rata 15 mnt",
      trend: "stable",
      icon: Clock,
      color: "warning"
    },
    {
      title: "Lab Selesai",
      value: "45",
      change: "+8 dari kemarin",
      trend: "up",
      icon: CheckCircle,
      color: "success"
    }
  ];

  const recentActivities = [
    { id: 1, type: "IGD", message: "Pasien trauma kepala masuk", time: "5 menit lalu", status: "emergency" },
    { id: 2, type: "Lab", message: "Hasil pemeriksaan darah siap", time: "12 menit lalu", status: "success" },
    { id: 3, type: "Poli Gigi", message: "Jadwal tindakan scaling", time: "18 menit lalu", status: "info" },
    { id: 4, type: "Rikkes", message: "Pemeriksaan TNI AU batch 3 dimulai", time: "25 menit lalu", status: "info" },
  ];

  const quickActions = [
    { title: "Registrasi Pasien Baru", desc: "Daftarkan pasien untuk layanan poli", href: "/poli-umum" },
    { title: "Input IGD", desc: "Catat pasien gawat darurat", href: "/igd" },
    { title: "Cek Hasil Lab", desc: "Review dan validasi hasil laboratorium", href: "/laboratorium" },
    { title: "Jadwal Rikkes", desc: "Atur jadwal pemeriksaan TNI AU", href: "/rikkes" },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview aktivitas klinik hari ini</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="medical-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
                  {stat.trend === "warning" && <AlertTriangle className="w-3 h-3 text-warning" />}
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : 
                    stat.trend === "warning" ? "text-warning" : "text-muted-foreground"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === "primary" ? "bg-primary/10" :
                stat.color === "emergency" ? "bg-emergency/10" :
                stat.color === "warning" ? "bg-warning/10" :
                "bg-success/10"
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === "primary" ? "text-primary" :
                  stat.color === "emergency" ? "text-emergency" :
                  stat.color === "warning" ? "text-warning" :
                  "text-success"
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Aksi Cepat</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {action.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card className="medical-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Aktivitas Terkini</h3>
              <Button variant="ghost" size="sm">
                Lihat Semua
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === "emergency" ? "bg-emergency" :
                    activity.status === "success" ? "bg-success" :
                    "bg-primary"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      {activity.message}
                    </p>
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

export default Dashboard;