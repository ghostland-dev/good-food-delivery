
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300",
  },
  {
    id: 2,
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=300",
  },
  {
    id: 3,
    name: "Sushi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300",
  },
  {
    id: 4,
    name: "Salades",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=300",
  },
  {
    id: 5,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=300",
  },
  {
    id: 6,
    name: "Italien",
    image: "https://images.unsplash.com/photo-1605888969139-42cde8761bc5?q=80&w=300",
  },
  {
    id: 7,
    name: "Mexicain",
    image: "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?q=80&w=300",
  },
  {
    id: 8,
    name: "Asiatique",
    image: "https://images.unsplash.com/photo-1585032226650-91b92de64c39?q=80&w=300",
  },
];

const CategorySection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Catégories populaires</h2>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative inline-block w-[150px] flex-shrink-0 overflow-hidden rounded-xl"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="font-medium text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default CategorySection;
