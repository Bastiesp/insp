import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { VehicleData } from "../App";

interface VehicleFormProps {
  initialData: VehicleData;
  onSubmit: (data: VehicleData) => void;
}

export function VehicleForm({ initialData, onSubmit }: VehicleFormProps) {
  const [formData, setFormData] = useState<VehicleData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof VehicleData, string>> = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "El nombre del propietario es requerido";
    }
    if (!formData.vehicleBrand.trim()) {
      newErrors.vehicleBrand = "La marca del vehículo es requerida";
    }
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = "La placa es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof VehicleData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Vehículo</CardTitle>
        <CardDescription>
          Complete los datos del vehículo y propietario para comenzar la inspección
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Nombre del Propietario</Label>
            <Input
              id="ownerName"
              type="text"
              placeholder="Juan Pérez"
              value={formData.ownerName}
              onChange={(e) => handleChange("ownerName", e.target.value)}
              className={errors.ownerName ? "border-red-500 bg-white" : "bg-white"}
            />
            {errors.ownerName && (
              <p className="text-sm text-red-600">{errors.ownerName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleBrand">Marca del Vehículo</Label>
            <Input
              id="vehicleBrand"
              type="text"
              placeholder="Toyota, Honda, Ford..."
              value={formData.vehicleBrand}
              onChange={(e) => handleChange("vehicleBrand", e.target.value)}
              className={errors.vehicleBrand ? "border-red-500 bg-white" : "bg-white"}
            />
            {errors.vehicleBrand && (
              <p className="text-sm text-red-600">{errors.vehicleBrand}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="licensePlate">Placa / Patente</Label>
            <Input
              id="licensePlate"
              type="text"
              placeholder="ABC-123"
              value={formData.licensePlate}
              onChange={(e) => handleChange("licensePlate", e.target.value)}
              className={errors.licensePlate ? "border-red-500 bg-white" : "bg-white"}
            />
            {errors.licensePlate && (
              <p className="text-sm text-red-600">{errors.licensePlate}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Comenzar Inspección
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}