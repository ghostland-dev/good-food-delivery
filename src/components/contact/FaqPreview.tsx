
import React from "react";
import { Button } from "@/components/ui/button";

const FaqPreview: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Des questions fréquentes ?
          </h2>
          <p className="text-gray-700 mb-8">
            Consultez notre FAQ pour trouver rapidement des réponses à vos questions.
          </p>
          <Button 
            className="bg-goodfood-500 hover:bg-goodfood-600"
            onClick={() => window.location.href = "/faq"}
          >
            Voir la FAQ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FaqPreview;
