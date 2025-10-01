import { useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockProfessionals } from '@/data/professionals';
import { categoryLabels } from '@/types/professional';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ProfileHeader } from '@/components/ProfileHeader';
import { ProfileTabs } from '@/components/ProfileTabs';
import { ContactCTA } from '@/components/ContactCTA';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ProfessionalProfile = () => {
  const { category, city, slug } = useParams<{ 
    category: string; 
    city: string; 
    slug: string; 
  }>();

  const professional = useMemo(() => {
    return mockProfessionals.find(prof => prof.slug === slug);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!professional) {
    return <Navigate to="/professionisti" replace />;
  }

  const categoryLabel = categoryLabels[professional.category];
  const cityName = professional.city;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-4 md:py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Professionisti', href: '/professionisti' },
            { label: categoryLabel, href: `/professionisti/${category}` },
            { label: cityName, href: `/professionisti/${category}/${city}` },
            { label: professional.name, href: `/professionisti/${category}/${city}/${slug}` }
          ]}
        />

        <div className="mt-4 md:mt-6">
          <ProfileHeader professional={professional} />
          <div className="mt-4 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="lg:col-span-2">
              <ProfileTabs professional={professional} />
            </div>
            <div className="lg:col-span-1">
              <ContactCTA professional={professional} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;