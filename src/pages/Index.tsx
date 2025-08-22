import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Activity, 
  Smile, 
  FlaskConical, 
  Shield,
  ArrowRight,
  Users,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Activity,
      title: "IGD (Instalasi Gawat Darurat)",
      description: "Pencatatan pasien gawat darurat secara real-time dengan triase digital dan monitoring bed",
      color: "emergency"
    },
    {
      icon: Stethoscope, 
      title: "Poli Umum",
      description: "Registrasi & antrian online, rekam medis elektronik, dan resep digital",
      color: "primary"
    },
    {
      icon: Smile,
      title: "Poli Gigi",
      description: "Pencatatan tindakan medis gigi dengan dokumentasi foto dan manajemen jadwal",
      color: "success"
    },
    {
      icon: FlaskConical,
      title: "Laboratorium", 
      description: "Input & hasil pemeriksaan laboratorium digital dengan integrasi RME",
      color: "warning"
    },
    {
      icon: Shield,
      title: "Rikkes TNI AU",
      description: "Pendaftaran rikkes dengan form digital dan penilaian kelayakan otomatis",
      color: "primary"
    }
  ];

  const stats = [
    { label: "Pasien Terdaftar", value: "2,847", icon: Users },
    { label: "Layanan 24/7", value: "IGD", icon: Clock },
    { label: "Tingkat Kepuasan", value: "98%", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative bg-gradient-medical text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold">SIM Klinik Manuhua</h1>
                <p className="text-xl opacity-90">Sistem Informasi Manajemen</p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Platform digital terpadu yang dirancang untuk mempermudah pengelolaan layanan kesehatan. 
              Mengintegrasikan seluruh unit pelayanan agar pelayanan menjadi lebih cepat, akurat, dan efisien.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Masuk Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="medical-card text-center">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fitur Utama SIM Klinik Manuhua
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sistem terintegrasi yang mencakup semua aspek pelayanan kesehatan dari IGD hingga layanan khusus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="medical-card-elevated group cursor-pointer hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    feature.color === "emergency" ? "bg-emergency/10" :
                    feature.color === "success" ? "bg-success/10" :
                    feature.color === "warning" ? "bg-warning/10" :
                    "bg-primary/10"
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      feature.color === "emergency" ? "text-emergency" :
                      feature.color === "success" ? "text-success" :
                      feature.color === "warning" ? "text-warning" :
                      "text-primary"
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Klinik Manuhua</h2>
              <p className="text-lg text-muted-foreground">
                Layanan kesehatan terpercaya dengan teknologi modern
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
                <p className="text-muted-foreground text-sm">
                  Jl. Kesehatan No. 123<br />
                  Jakarta, Indonesia
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
                <p className="text-muted-foreground text-sm">
                  (021) 123-4567<br />
                  Emergency: 119
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Email</h3>
                <p className="text-muted-foreground text-sm">
                  info@klinikmanuhua.id<br />
                  admin@klinikmanuhua.id
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-background/20 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-background" />
              </div>
              <div>
                <h3 className="font-bold">SIM Klinik Manuhua</h3>
                <p className="text-sm opacity-80">Sistem Informasi Manajemen</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              © 2024 Klinik Manuhua. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
