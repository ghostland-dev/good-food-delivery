
import { Button } from "@/components/ui/button";

const AppSection = () => {
  return (
    <section className="py-16 bg-goodfood-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Téléchargez notre application mobile
            </h2>
            <p className="text-gray-600 mb-6">
              Commandez plus facilement, suivez votre livraison en temps réel et
              recevez des offres exclusives directement sur votre téléphone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                size="lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.44-3.07.06-1.06-.4-2.03-.41-3.1 0-1.37.56-2.1.44-2.94-.31C2.31 14.85 3.74 6.35 9.52 6.06c1.71.12 2.88 1.12 3.76 1.08.88-.04 2.27-1.26 4.18-.93 3.56.61 5.02 4.7 3.51 7.53-2.48 4.65-4.88 6.79-3.92 10.54zm-1.23-17.2c-1.84-2.34-4.96-2.74-6.07-2.77A5.95 5.95 0 0 1 14.38.31c1.8.62 3.37 1.96 3.81 3.08-.85.41-2.04.96-2.37-.31z" />
                </svg>
                App Store
              </Button>
              <Button
                className="bg-black hover:bg-gray-800 text-white"
                size="lg"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M3.79 2.62c-.65.15-1.27.5-1.78.97C1.5 4.1 1.08 4.66.8 5.3c-.28.64-.42 1.33-.42 2.02v9.36c0 .7.14 1.39.42 2.03.28.64.7 1.2 1.21 1.7.5.48 1.12.84 1.78 1 .66.15 1.35.16 2 .02l8.76-1.86c.58-.14 1.14-.4 1.61-.78.48-.37.87-.84 1.16-1.38.29-.54.44-1.13.44-1.74V8.32c0-.6-.15-1.2-.44-1.74-.29-.54-.68-1-1.16-1.38-.47-.37-1.03-.64-1.61-.77L6.01 2.6c-.32-.07-.66-.1-.99-.1-.41 0-.82.04-1.23.13zm1.49 4.89c.16-.25.4-.45.67-.58.28-.13.59-.17.89-.11.3.05.58.19.8.4.23.21.4.48.48.78.1.3.09.61 0 .9-.08.3-.25.57-.47.78-.23.21-.5.35-.8.4-.3.06-.61.02-.88-.1-.28-.12-.52-.33-.68-.58-.17-.25-.25-.54-.25-.84 0-.3.08-.58.24-.83zm9.06 3.54c.55.28.96.8 1.18 1.38.22.59.22 1.25 0 1.84-.23.59-.63 1.1-1.18 1.38l-5 2.36c-.74.39-1.69.39-2.43 0-.37-.2-.69-.49-.91-.84-.22-.35-.35-.76-.35-1.17V9.43c0-.41.13-.82.35-1.17.22-.35.54-.64.91-.84.74-.39 1.69-.39 2.43 0l5 2.63z" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-goodfood-300 rounded-xl -rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1622556498246-755f44ca76f3?q=80&w=1964"
              alt="Good Food Mobile App"
              className="relative z-10 rounded-xl shadow-lg mx-auto"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
