import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <>
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
            </>
          )}
        </div>
      ))}
    </nav>
  );
};