
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import FaqPreview from "@/components/contact/FaqPreview";

const Contact = () => {
  // Location data for the map
  const officeLocation: [number, number] = [48.8731, 2.3003]; // Office in Paris
  const mapLocations = [
    {
      name: "Siège GoodFood",
      position: officeLocation,
      type: "restaurant" as const,
      description: "123 Avenue des Champs-Élysées, 75008 Paris"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <ContactHero />

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="md:col-span-2">
                <ContactInfo 
                  officeLocation={officeLocation}
                  mapLocations={mapLocations}
                />
              </div>

              {/* Contact Form */}
              <div className="md:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <FaqPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
