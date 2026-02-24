import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Download, FileText } from "lucide-react";
import { generatePDF } from "../utils/generatePDF";
import type { VehicleData, InspectionData } from "../App";

interface ReportGeneratorProps {
  vehicleData: VehicleData;
  inspectionData: InspectionData;
  onGenerate: () => void;
}

const RATING_LABELS: Record<string, string> = {
  excellent: "🌟 Excelente",
  good: "✅ Bueno",
  warning: "⚠️ Advertencia",
  failed: "❌ Falló",
};

export function ReportGenerator({ vehicleData, inspectionData, onGenerate }: ReportGeneratorProps) {
  const handleDownload = async () => {
    try {
      await generatePDF(vehicleData, inspectionData);
      onGenerate();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error al generar el PDF. Por favor intente nuevamente.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-1">Resumen de Inspección</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Propietario:</strong> {vehicleData.ownerName}</p>
                <p><strong>Vehículo:</strong> {vehicleData.vehicleBrand} - {vehicleData.licensePlate}</p>
                <p><strong>Fecha:</strong> {vehicleData.date}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Detalles de Evaluación</h4>
          <div className="space-y-3">
            {Object.entries(inspectionData).map(([key, item]) => (
              <div key={key} className="flex items-start justify-between py-2 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  {item.comment && (
                    <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  {RATING_LABELS[item.rating] || item.rating}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleDownload}
        className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Download className="w-5 h-5" />
        Descargar Reporte PDF
      </Button>
    </div>
  );
}