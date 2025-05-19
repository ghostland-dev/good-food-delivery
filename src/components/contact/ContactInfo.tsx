
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import DeliveryMap from "@/components/map/DeliveryMap";

interface ContactInfoProps {
  officeLocation: [number, number];
  mapLocations: Array<{
    name: string;
    position: [number, number];
    type: 'restaurant' | 'client' | 'driver';
    description?: string;
  }>;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ officeLocation, mapLocations }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nos informations</h2>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-goodfood-100 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="h-6 w-6 text-goodfood-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Adresse</h3>
            <p className="text-gray-600">
              123 Avenue des Champs-Élysées<br />
              75008 Paris, France
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-goodfood-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="h-6 w-6 text-goodfood-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Téléphone</h3>
            <p className="text-gray-600">
              +33 1 23 45 67 89
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-goodfood-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Mail className="h-6 w-6 text-goodfood-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Email</h3>
            <p className="text-gray-600">
              contact@goodfood.fr
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="h-12 w-12 bg-goodfood-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6 text-goodfood-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-1">Horaires</h3>
            <p className="text-gray-600">
              Lundi - Vendredi: 9h00 - 19h00<br />
              Samedi: 10h00 - 17h00<br />
              Dimanche: Fermé
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-8 rounded-xl overflow-hidden h-[300px]">
        <DeliveryMap
          center={officeLocation}
          zoom={14}
          locations={mapLocations}
          height="300px"
          showRoute={false}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
