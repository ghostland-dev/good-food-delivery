
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Questions et réponses de la FAQ
const faqItems = [
  {
    category: "Commandes",
    questions: [
      {
        question: "Comment passer une commande ?",
        answer:
          "Pour passer une commande, parcourez les restaurants disponibles, sélectionnez vos plats et ajoutez-les à votre panier. Ensuite, validez votre panier en cliquant sur 'Commander' et suivez les étapes pour finaliser votre commande.",
      },
      {
        question: "Puis-je modifier ma commande après l'avoir passée ?",
        answer:
          "Vous pouvez modifier votre commande uniquement si elle n'a pas encore été acceptée par le restaurant. Dans ce cas, contactez notre service client immédiatement pour les modifications souhaitées.",
      },
      {
        question: "Comment suivre l'état de ma commande ?",
        answer:
          "Après avoir passé votre commande, vous pouvez suivre son état en temps réel dans la section 'Mes commandes' de votre compte. Vous recevrez également des notifications sur l'avancement de votre livraison.",
      },
      {
        question: "Comment annuler une commande ?",
        answer:
          "Vous pouvez annuler votre commande uniquement si elle n'a pas encore été acceptée par le restaurant. Pour ce faire, accédez à 'Mes commandes', trouvez la commande concernée et cliquez sur 'Annuler'.",
      },
    ],
  },
  {
    category: "Paiement",
    questions: [
      {
        question: "Quels modes de paiement acceptez-vous ?",
        answer:
          "Nous acceptons les cartes de crédit/débit (Visa, Mastercard, American Express), PayPal, et dans certaines zones, le paiement en espèces à la livraison.",
      },
      {
        question: "Ma carte a été débitée mais je n'ai pas reçu de confirmation de commande",
        answer:
          "Si votre carte a été débitée mais que vous n'avez pas reçu de confirmation, veuillez vérifier vos emails (y compris les spams) ou contacter notre service client avec les détails de votre transaction.",
      },
      {
        question: "Comment obtenir une facture pour ma commande ?",
        answer:
          "Une facture électronique est automatiquement envoyée à l'adresse email associée à votre compte après chaque commande. Vous pouvez également accéder à toutes vos factures dans la section 'Historique des commandes' de votre compte.",
      },
    ],
  },
  {
    category: "Livraison",
    questions: [
      {
        question: "Quelle est la zone de livraison ?",
        answer:
          "Notre zone de livraison dépend de l'emplacement des restaurants partenaires. Lors de la commande, l'application vous indiquera si la livraison est disponible à votre adresse.",
      },
      {
        question: "Comment sont calculés les frais de livraison ?",
        answer:
          "Les frais de livraison sont calculés en fonction de la distance entre le restaurant et votre adresse de livraison, ainsi que d'autres facteurs comme les conditions météorologiques et la demande actuelle.",
      },
      {
        question: "Puis-je programmer une livraison pour plus tard ?",
        answer:
          "Oui, lors du processus de commande, vous avez la possibilité de choisir une livraison immédiate ou de programmer une livraison pour une date et une heure ultérieures, selon la disponibilité du restaurant.",
      },
      {
        question: "Le livreur peut-il laisser ma commande devant ma porte ?",
        answer:
          "Oui, vous pouvez ajouter cette instruction dans les notes de livraison lors de la validation de votre commande. Le livreur suivra vos instructions si possible.",
      },
    ],
  },
  {
    category: "Compte",
    questions: [
      {
        question: "Comment créer un compte ?",
        answer:
          "Pour créer un compte, cliquez sur 'S'inscrire' sur notre site ou application, puis remplissez le formulaire avec vos informations personnelles. Vous recevrez un email de confirmation pour activer votre compte.",
      },
      {
        question: "Comment réinitialiser mon mot de passe ?",
        answer:
          "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur la page de connexion, puis suivez les instructions envoyées à votre adresse email.",
      },
      {
        question: "Comment modifier mes informations personnelles ?",
        answer:
          "Vous pouvez modifier vos informations personnelles dans la section 'Mon profil' de votre compte. Après avoir apporté les modifications souhaitées, n'oubliez pas d'enregistrer vos changements.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(faqItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredItems(faqItems);
      return;
    }

    const filtered = faqItems.map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term)
      ),
    })).filter((category) => category.questions.length > 0);

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Foire Aux Questions
            </h1>
            <p className="text-gray-700 mb-8 text-center">
              Trouvez rapidement des réponses à vos questions concernant Good Food
            </p>

            {/* Search */}
            <div className="mb-12 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            {/* FAQ Accordions */}
            {filteredItems.length > 0 ? (
              filteredItems.map((category, categoryIndex) =>
                category.questions.length > 0 ? (
                  <div key={categoryIndex} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{category.category}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((item, itemIndex) => (
                        <AccordionItem
                          key={itemIndex}
                          value={`${categoryIndex}-${itemIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left font-medium py-4">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4 text-gray-700">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ) : null
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  Aucun résultat ne correspond à votre recherche.
                </p>
                <p className="text-gray-500 mt-2">
                  Essayez avec d'autres termes ou{" "}
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredItems(faqItems);
                    }}
                    className="text-goodfood-500 hover:underline"
                  >
                    réinitialisez la recherche
                  </button>
                  .
                </p>
              </div>
            )}

            {/* Contact section */}
            <div className="bg-goodfood-50 p-6 rounded-xl mt-12 text-center">
              <h3 className="font-bold text-lg mb-2">
                Vous n'avez pas trouvé de réponse à votre question ?
              </h3>
              <p className="text-gray-600 mb-4">
                Notre équipe de support client est là pour vous aider.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-goodfood-500 hover:bg-goodfood-600"
              >
                Contactez-nous
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
