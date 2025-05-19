
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    content: "Service impeccable, livraison rapide et commande toujours parfaite. Je recommande vivement !",
    author: "Sophie Dubois",
    role: "Cliente fidèle",
    rating: 5,
  },
  {
    id: 2,
    content: "Je commande régulièrement mon déjeuner au bureau avec Good Food. Les délais de livraison sont toujours respectés.",
    author: "Thomas Martin",
    role: "Professionnel",
    rating: 4,
  },
  {
    id: 3,
    content: "Excellente sélection de restaurants. J'ai découvert de nouvelles cuisines grâce à Good Food !",
    author: "Marie Lambert",
    role: "Foodie",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">
          Ce que nos clients disent
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "bg-white p-6 rounded-xl shadow-md",
                index === 1 && "md:translate-y-4"
              )}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < testimonial.rating
                        ? "fill-goodfood-500 text-goodfood-500"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-goodfood-100 flex items-center justify-center">
                  <span className="text-goodfood-500 font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
