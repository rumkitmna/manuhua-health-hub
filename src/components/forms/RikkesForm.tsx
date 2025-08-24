import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RikkesFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export const RikkesForm = ({ onSubmit, initialData, isLoading }: RikkesFormProps) => {
  const [formData, setFormData] = useState({
    participant_id: initialData?.participant_id || '',
    name: initialData?.name || '',
    rank: initialData?.rank || '',
    unit: initialData?.unit || '',
    date_of_birth: initialData?.date_of_birth ? new Date(initialData.date_of_birth) : undefined,
    gender: initialData?.gender || '',
    phone: initialData?.phone || '',
    examination_date: initialData?.examination_date ? new Date(initialData.examination_date) : new Date(),
    batch: initialData?.batch || '',
    status: initialData?.status || 'scheduled',
    overall_result: initialData?.overall_result || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date_of_birth) return;
    
    onSubmit({
      ...formData,
      date_of_birth: format(formData.date_of_birth, 'yyyy-MM-dd'),
      examination_date: format(formData.examination_date, 'yyyy-MM-dd')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="participant_id">ID Peserta</Label>
          <Input
            id="participant_id"
            value={formData.participant_id}
            onChange={(e) => setFormData(prev => ({ ...prev, participant_id: e.target.value }))}
            placeholder="RK001"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="batch">Batch</Label>
          <Input
            id="batch"
            value={formData.batch}
            onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
            placeholder="Batch 1-2025"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nama peserta"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rank">Pangkat</Label>
          <Select value={formData.rank} onValueChange={(value) => setFormData(prev => ({ ...prev, rank: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih pangkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prada">Prada</SelectItem>
              <SelectItem value="Pratu">Pratu</SelectItem>
              <SelectItem value="Praka">Praka</SelectItem>
              <SelectItem value="Kopda">Kopda</SelectItem>
              <SelectItem value="Koptu">Koptu</SelectItem>
              <SelectItem value="Kopka">Kopka</SelectItem>
              <SelectItem value="Serda">Serda</SelectItem>
              <SelectItem value="Sertu">Sertu</SelectItem>
              <SelectItem value="Serka">Serka</SelectItem>
              <SelectItem value="Letda">Letda</SelectItem>
              <SelectItem value="Lettu">Lettu</SelectItem>
              <SelectItem value="Kapten">Kapten</SelectItem>
              <SelectItem value="Mayor">Mayor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="unit">Satuan</Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
            placeholder="Skadron Udara 12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Jenis Kelamin</Label>
          <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laki-laki">Laki-laki</SelectItem>
              <SelectItem value="Perempuan">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tanggal Lahir</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date_of_birth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date_of_birth ? format(formData.date_of_birth, "dd/MM/yyyy") : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date_of_birth}
                onSelect={(date) => setFormData(prev => ({ ...prev, date_of_birth: date }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Tanggal Pemeriksaan</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.examination_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.examination_date ? format(formData.examination_date, "dd/MM/yyyy") : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.examination_date}
                onSelect={(date) => setFormData(prev => ({ ...prev, examination_date: date || new Date() }))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="081234567890"
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
              <SelectItem value="in_progress">Sedang Proses</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="failed">Gagal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="overall_result">Hasil Keseluruhan</Label>
        <Select value={formData.overall_result} onValueChange={(value) => setFormData(prev => ({ ...prev, overall_result: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih hasil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Belum Ada</SelectItem>
            <SelectItem value="Fit">Fit</SelectItem>
            <SelectItem value="Unfit">Unfit</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Menyimpan...' : initialData ? 'Update Peserta' : 'Tambah Peserta Rikkes'}
      </Button>
    </form>
  );
};