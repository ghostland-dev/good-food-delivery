
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DailyStats = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aujourd'hui</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Gains du jour</span>
            <span className="text-2xl font-bold">24,50 €</span>
          </div>
          
          <div className="flex justify-between">
            <span>Livraisons effectuées</span>
            <span className="font-medium">4</span>
          </div>
          
          <div className="flex justify-between">
            <span>Temps en ligne</span>
            <span className="font-medium">3h 45min</span>
          </div>
          
          <div className="flex justify-between">
            <span>Distance parcourue</span>
            <span className="font-medium">18 km</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStats;
