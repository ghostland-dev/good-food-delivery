
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, HelpCircle, Briefcase, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm: React.FC = () => {
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          onClick={() => setFormData(prev => ({ ...prev, subject: "Service Client" }))} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Service Client" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}
        >
          <MessageSquare className="h-6 w-6 text-goodfood-500 mb-2" />
          <h3 className="font-medium">Service Client</h3>
        </div>
        <div 
          onClick={() => setFormData(prev => ({ ...prev, subject: "Assistance Technique" }))} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Assistance Technique" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}
        >
          <HelpCircle className="h-6 w-6 text-goodfood-500 mb-2" />
          <h3 className="font-medium">Assistance Technique</h3>
        </div>
        <div 
          onClick={() => setFormData(prev => ({ ...prev, subject: "Partenariats" }))} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Partenariats" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}
        >
          <Briefcase className="h-6 w-6 text-goodfood-500 mb-2" />
          <h3 className="font-medium">Partenariats</h3>
        </div>
        <div 
          onClick={() => setFormData(prev => ({ ...prev, subject: "Autre" }))} 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.subject === "Autre" ? "border-goodfood-500 bg-goodfood-50" : "hover:border-goodfood-300"}`}
        >
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
  );
};

export default ContactForm;
