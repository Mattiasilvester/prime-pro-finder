import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="text-foreground hover:text-gold hover:bg-transparent transition-colors gap-2 px-0"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="font-medium">Indietro</span>
    </Button>
  );
};