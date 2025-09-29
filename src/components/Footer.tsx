import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  const categories = [
    { name: 'Personal Trainer', slug: 'personal_trainer' },
    { name: 'Nutrizionisti', slug: 'nutritionist' },
    { name: 'Fisioterapisti', slug: 'physiotherapist' },
    { name: 'Mental Coach', slug: 'mental_coach' },
  ];

  const cities = [
    'Milano', 'Roma', 'Torino', 'Napoli', 'Bologna', 'Firenze'
  ];

  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-bold text-xl">
              <span className="text-foreground">Performance</span>
              <span className="text-gold"> Prime</span>
            </div>
            <p className="text-sm text-muted-foreground">
              La piattaforma che connette atleti con i migliori professionisti del benessere in Italia.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categorie</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/professionisti/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold mb-4">Città</h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    to={`/professionisti?city=${city}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Informazioni</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/come-funziona" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Come Funziona
                </Link>
              </li>
              <li>
                <Link to="/per-professionisti" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Per i Professionisti
                </Link>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contatti
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Performance Prime. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};
