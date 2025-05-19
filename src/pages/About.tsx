
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Truck, ShieldCheck, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-goodfood-100 py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                À propos de Good Food
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Nous livrons vos plats préférés directement à votre porte, avec rapidité et qualité.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Notre histoire</h2>
                <p className="text-gray-700 mb-4">
                  Good Food a été fondé en 2020 avec une mission simple : rendre accessible à tous les meilleurs plats des restaurants locaux.
                </p>
                <p className="text-gray-700 mb-4">
                  Ce qui a commencé comme une petite startup dans un appartement parisien s'est rapidement transformé en une plateforme de livraison de repas reconnue dans toute la France.
                </p>
                <p className="text-gray-700">
                  Aujourd'hui, nous collaborons avec des milliers de restaurants et servons des millions de clients, tout en maintenant notre engagement envers la qualité et le service client.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=800" 
                  alt="L'équipe Good Food" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Nos valeurs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-goodfood-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-goodfood-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Rapidité</h3>
                <p className="text-gray-600">
                  Nous nous engageons à livrer vos repas le plus rapidement possible, sans compromettre leur qualité.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-goodfood-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-goodfood-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Fiabilité</h3>
                <p className="text-gray-600">
                  Notre réseau de livreurs professionnels garantit une livraison sûre et ponctuelle de vos commandes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-goodfood-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-goodfood-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Qualité</h3>
                <p className="text-gray-600">
                  Nous sélectionnons soigneusement nos partenaires pour vous offrir une expérience culinaire exceptionnelle.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-goodfood-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-goodfood-600" />
                </div>
                <h3 className="font-bold text-xl mb-3">Proximité</h3>
                <p className="text-gray-600">
                  Nous soutenons les restaurants locaux et contribuons au dynamisme des quartiers où nous opérons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Notre équipe</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sophie Dubois",
                  role: "CEO & Fondatrice",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400",
                },
                {
                  name: "Thomas Martin",
                  role: "Directeur des Opérations",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
                },
                {
                  name: "Marie Leclerc",
                  role: "Responsable Partenariats",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
                },
                {
                  name: "Alexandre Petit",
                  role: "Directeur Technique",
                  image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400",
                },
                {
                  name: "Julie Moreau",
                  role: "Chef Marketing",
                  image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=400",
                },
                {
                  name: "Nicolas Roux",
                  role: "Responsable Service Client",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
                },
              ].map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 bg-goodfood-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Reconnaissances</h2>
              <p className="text-gray-700 mb-12">
                Nos efforts pour fournir un service exceptionnel ont été reconnus par l'industrie.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-goodfood-100 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-goodfood-600" />
                  </div>
                  <span className="font-medium">Meilleure Application 2022</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-goodfood-100 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-goodfood-600" />
                  </div>
                  <span className="font-medium">Service Client d'Excellence 2023</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-goodfood-100 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-goodfood-600" />
                  </div>
                  <span className="font-medium">Startup de l'Année 2021</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
