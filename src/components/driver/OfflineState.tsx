
import React from "react";
import { Button } from "@/components/ui/button";

interface OfflineStateProps {
  toggleAvailability: () => void;
}

const OfflineState = ({ toggleAvailability }: OfflineStateProps) => {
  return (
    <div className="bg-background rounded-lg border p-8 text-center">
      <h2 className="text-xl font-medium mb-2">Vous êtes hors ligne</h2>
      <p className="text-muted-foreground mb-6">
        Activez votre disponibilité pour commencer à recevoir des livraisons
      </p>
      <Button onClick={toggleAvailability}>
        Passer en ligne
      </Button>
    </div>
  );
};

export default OfflineState;
