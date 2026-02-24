import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { InspectionData } from "../App";

interface InspectionChecklistProps {
  items: string[];
  onComplete: (data: InspectionData) => void;
}

const RATING_OPTIONS = [
  { emoji: "🌟", label: "Excelente", value: "excellent", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { emoji: "✅", label: "Bueno", value: "good", color: "bg-green-100 text-green-800 border-green-300" },
  { emoji: "⚠️", label: "Advertencia", value: "warning", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { emoji: "❌", label: "Falló", value: "failed", color: "bg-red-100 text-red-800 border-red-300" },
];

export function InspectionChecklist({ items, onComplete }: InspectionChecklistProps) {
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});

  const handleRatingSelect = (item: string, rating: string) => {
    setRatings((prev) => ({ ...prev, [item]: rating }));
  };

  const handleCommentChange = (item: string, comment: string) => {
    setComments((prev) => ({ ...prev, [item]: comment }));
  };

  const isComplete = items.every((item) => ratings[item]);

  const handleSubmit = () => {
    const inspectionData: InspectionData = {};
    items.forEach((item) => {
      inspectionData[item] = {
        name: item,
        rating: ratings[item],
        comment: comments[item] || "",
      };
    });
    onComplete(inspectionData);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lista de Verificación</CardTitle>
          <CardDescription>
            Evalúe cada sistema del vehículo seleccionando la calificación apropiada
          </CardDescription>
        </CardHeader>
      </Card>

      {items.map((item, index) => (
        <Card key={item}>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{item}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {RATING_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleRatingSelect(item, option.value)}
                    className={`
                      p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105
                      ${ratings[item] === option.value 
                        ? `${option.color} border-current scale-105` 
                        : "border-gray-300 bg-white hover:border-blue-400"
                      }
                    `}
                    title={option.label}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Comentarios (opcional)
                </label>
                <Textarea
                  placeholder="Añada observaciones sobre este sistema..."
                  value={comments[item] || ""}
                  onChange={(e) => handleCommentChange(item, e.target.value)}
                  className="bg-white min-h-20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isComplete ? "Generar Reporte" : "Complete todas las evaluaciones"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}