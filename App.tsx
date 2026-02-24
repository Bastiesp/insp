import { useState } from "react";
import { VehicleForm } from "./components/VehicleForm";
import { InspectionChecklist } from "./components/InspectionChecklist";
import { ReportGenerator } from "./components/ReportGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { CheckCircle2 } from "lucide-react";

export interface VehicleData {
  date: string;
  ownerName: string;
  vehicleBrand: string;
  licensePlate: string;
}

export interface InspectionItem {
  name: string;
  rating: string;
  comment: string;
}

export type InspectionData = Record<string, InspectionItem>;

const INSPECTION_ITEMS = [
  "Motor",
  "Transmisión",
  "Dirección",
  "Suspensión",
  "Luces",
  "Neumáticos",
];

export default function App() {
  const [step, setStep] = useState<"form" | "inspection" | "complete">("form");
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    date: new Date().toISOString().split("T")[0],
    ownerName: "",
    vehicleBrand: "",
    licensePlate: "",
  });
  const [inspectionData, setInspectionData] = useState<InspectionData>({});
  const [showToast, setShowToast] = useState(false);

  const handleVehicleSubmit = (data: VehicleData) => {
    setVehicleData(data);
    setStep("inspection");
  };

  const handleInspectionComplete = (data: InspectionData) => {
    setInspectionData(data);
    setStep("complete");
  };

  const handleGenerateReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            VehicleInspectionPro
          </h1>
          <p className="text-gray-600">
            Sistema de inspección vehicular profesional
          </p>
        </header>

        {step === "form" && (
          <VehicleForm
            initialData={vehicleData}
            onSubmit={handleVehicleSubmit}
          />
        )}

        {step === "inspection" && (
          <InspectionChecklist
            items={INSPECTION_ITEMS}
            onComplete={handleInspectionComplete}
          />
        )}

        {step === "complete" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Inspección Completada
              </CardTitle>
              <CardDescription>
                Todos los sistemas han sido evaluados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportGenerator
                vehicleData={vehicleData}
                inspectionData={inspectionData}
                onGenerate={handleGenerateReport}
              />
            </CardContent>
          </Card>
        )}

        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
            ✓ Reporte generado exitosamente
          </div>
        )}
      </div>
    </div>
  );
}