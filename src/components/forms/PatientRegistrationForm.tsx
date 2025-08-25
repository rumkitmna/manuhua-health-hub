import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, User } from "lucide-react";
import { PatientForm } from "./PatientForm";
import { usePatients } from "@/hooks/usePatients";
import { useToast } from "@/hooks/use-toast";

interface PatientRegistrationFormProps {
  onPatientSelected: (patient: any) => void;
  onNewPatientCreated: (patient: any) => void;
}

export const PatientRegistrationForm = ({ onPatientSelected, onNewPatientCreated }: PatientRegistrationFormProps) => {
  const { patients, addPatient } = usePatients();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.patient_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.phone && patient.phone.includes(searchQuery))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, patients]);

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    onPatientSelected(patient);
  };

  const handleNewPatient = async (patientData: any) => {
    setIsSubmitting(true);
    const { data, error } = await addPatient(patientData);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Pasien baru berhasil didaftarkan"
      });
      onNewPatientCreated(data);
      setShowNewPatientForm(false);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Registrasi Pasien</h2>
        <p className="text-muted-foreground">Cari pasien lama atau daftarkan pasien baru</p>
      </div>

      {!showNewPatientForm && !selectedPatient && (
        <>
          {/* Search for existing patients */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <Label className="text-base font-medium">Pasien Lama</Label>
              </div>
              
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari berdasarkan nama, ID pasien, atau nomor telepon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {searchResults.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{patient.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ID: {patient.patient_id} • {patient.gender}
                          </p>
                          {patient.phone && (
                            <p className="text-sm text-muted-foreground">
                              Tel: {patient.phone}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline">
                          {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()} tahun
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Pasien tidak ditemukan</p>
                </div>
              )}
            </div>
          </Card>

          {/* New patient button */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Atau</p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowNewPatientForm(true)}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Daftarkan Pasien Baru
            </Button>
          </div>
        </>
      )}

      {/* Selected patient display */}
      {selectedPatient && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-success" />
                <Label className="text-base font-medium text-success">Pasien Dipilih</Label>
              </div>
              <h4 className="font-semibold text-lg">{selectedPatient.name}</h4>
              <p className="text-muted-foreground">
                ID: {selectedPatient.patient_id} • {selectedPatient.gender} • 
                {new Date().getFullYear() - new Date(selectedPatient.date_of_birth).getFullYear()} tahun
              </p>
              {selectedPatient.phone && (
                <p className="text-muted-foreground">Tel: {selectedPatient.phone}</p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedPatient(null)}
            >
              Ganti Pasien
            </Button>
          </div>
        </Card>
      )}

      {/* New patient form */}
      {showNewPatientForm && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-primary" />
            <Label className="text-base font-medium">Pasien Baru</Label>
          </div>
          
          <PatientForm
            onSubmit={handleNewPatient}
            isLoading={isSubmitting}
          />
          
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowNewPatientForm(false)}
              className="w-full"
            >
              Kembali ke Pencarian
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};