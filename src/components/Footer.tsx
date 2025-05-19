
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-goodfood-300 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-goodfood-700"
                >
                  <path d="M15 11h.01" />
                  <path d="M11 15h.01" />
                  <path d="M16 16h.01" />
                  <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
                  <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-goodfood-500">Good Food</span>
            </Link>
            <p className="text-sm text-gray-600">
              La meilleure façon de vous faire livrer vos plats préférés à votre porte.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-goodfood-500">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-goodfood-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-goodfood-500">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Aide</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-goodfood-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-goodfood-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-600 hover:text-goodfood-500">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-goodfood-500">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-goodfood-500">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-goodfood-500">
                  Politique de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <p className="text-sm text-center text-gray-600">
            © {new Date().getFullYear()} Good Food. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
