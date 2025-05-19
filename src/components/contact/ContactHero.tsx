
import React from "react";

const ContactHero: React.FC = () => {
  return (
    <div className="bg-goodfood-100 py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
