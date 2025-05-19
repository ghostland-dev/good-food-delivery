
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  HelpCircle,
  Briefcase 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
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

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="md:col-span-2">
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
                <div className="mt-8 rounded-xl overflow-hidden h-[300px] bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">
                    Carte interactive<br />
                    (Intégration Google Maps)
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div onClick={() => setFormData(prev => ({ ...prev, subject: "Service Client" }))} className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Service Client" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}>
                    <MessageSquare className="h-6 w-6 text-goodfood-500 mb-2" />
                    <h3 className="font-medium">Service Client</h3>
                  </div>
                  <div onClick={() => setFormData(prev => ({ ...prev, subject: "Assistance Technique" }))} className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Assistance Technique" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}>
                    <HelpCircle className="h-6 w-6 text-goodfood-500 mb-2" />
                    <h3 className="font-medium">Assistance Technique</h3>
                  </div>
                  <div onClick={() => setFormData(prev => ({ ...prev, subject: "Partenariats" }))} className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Partenariats" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}>
                    <Briefcase className="h-6 w-6 text-goodfood-500 mb-2" />
                    <h3 className="font-medium">Partenariats</h3>
                  </div>
                  <div onClick={() => setFormData(prev => ({ ...prev, subject: "Autre" }))} className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Autre" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}>
                    <Send className="h-6 w-6 text-goodfood-500 mb-2" />
                    <h3 className="font-medium">Autre</h3>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {!formData.subject && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <select
                        id="subject"
                        name="subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Service Client">Service Client</option>
                        <option value="Assistance Technique">Assistance Technique</option>
                        <option value="Partenariats">Partenariats</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Comment pouvons-nous vous aider ?"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-goodfood-500 hover:bg-goodfood-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
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
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
