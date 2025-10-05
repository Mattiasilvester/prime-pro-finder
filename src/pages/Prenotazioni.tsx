import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Prenotazioni = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto text-center">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Le tue <span className="text-gold">Prenotazioni</span>
          </h1>
          <p className="text-xl opacity-90">
            Gestisci i tuoi appuntamenti e sessioni
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Calendar */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackClick}
                  className="p-2 hover:bg-gray-100 text-black hover:text-black"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-2xl font-bold">Calendario</h2>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0 [&_[data-selected]]:bg-black [&_[data-selected]]:text-white [&_[data-selected]]:hover:bg-black [&_[data-selected]]:focus:bg-black"
                  modifiersClassNames={{
                    today: 'custom-today'
                  }}
                  formatters={{
                    formatMonthCaption: (date: Date) => {
                      const months = [
                        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
                      ];
                      return `${months[date.getMonth()]} ${date.getFullYear()}`;
                    }
                  }}
                />
                </CardContent>
              </Card>
            </div>

            {/* Appointments */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Appuntamenti</h2>
              
              {/* Mock appointments - da sostituire con dati reali */}
              <div className="space-y-4">
                {/* Appointment 1 */}
                <Card className="border-l-4 border-l-gold hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">Marco Rossi</h3>
                        <p className="text-sm text-muted-foreground">Personal Trainer</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Confermata</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gold" />
                        15 Ottobre 2025, 10:00
                      </p>
                      <p className="flex items-center gap-2">
                        <span>📍</span>
                        Milano, Via Roma 123
                      </p>
                      <p className="flex items-center gap-2">
                        <span>💰</span>
                        €80/sessione
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Dettagli
                      </Button>
                      <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                        Annulla
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment 2 */}
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">Giulia Ferrari</h3>
                        <p className="text-sm text-muted-foreground">Nutrizionista</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">In attesa</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gold" />
                        18 Ottobre 2025, 14:30
                      </p>
                      <p className="flex items-center gap-2">
                        <span>📍</span>
                        Online (Videochiamata)
                      </p>
                      <p className="flex items-center gap-2">
                        <span>💰</span>
                        €70/sessione
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                        Conferma
                      </Button>
                      <Button size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                        Annulla
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment 3 */}
                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">Alessandro Bianchi</h3>
                        <p className="text-sm text-muted-foreground">Fisioterapista</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Completata</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gold" />
                        1 Ottobre 2025, 16:00
                      </p>
                      <p className="flex items-center gap-2">
                        <span>📍</span>
                        Torino, Via Garibaldi 45
                      </p>
                      <p className="flex items-center gap-2">
                        <span>💰</span>
                        €60/sessione
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        Dettagli
                      </Button>
                      <Button size="sm" className="flex-1 bg-gold text-black hover:bg-gold/90">
                        Rileva
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Empty state */}
                <Card className="border-dashed">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center text-muted-foreground">
                      <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Nessun appuntamento programmato</p>
                      <p className="text-sm mb-4">Seleziona una data dal calendario per vedere i dettagli</p>
                      <Button 
                        className="bg-gold text-black hover:bg-gold/90"
                        onClick={() => navigate('/professionisti')}
                      >
                        Prenota una Sessione
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prenotazioni;
