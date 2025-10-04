import { Search, Users, CheckCircle, Award, ChevronDown, Star, Shield, Clock, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const steps = [
    {
      number: '1',
      icon: Search,
      title: 'Cerca il Professionista',
      description: 'Filtra per categoria, città, prezzo e valutazioni per trovare il professionista ideale per i tuoi obiettivi'
    },
    {
      number: '2',
      icon: Users,
      title: 'Confronta e Scegli',
      description: 'Leggi recensioni verificate, confronta prezzi e servizi dei migliori professionisti della tua zona'
    },
    {
      number: '3',
      icon: CheckCircle,
      title: 'Prenota e Inizia',
      description: 'Contatta direttamente via WhatsApp o telefono e inizia il tuo percorso di trasformazione'
    }
  ];

  const benefits = [
    'Sconto 10% su tutti i servizi dei Partner Ufficiali',
    'Accesso prioritario ai professionisti più richiesti',
    'Supporto dedicato per qualsiasi necessità',
    'Garanzia di qualità certificata Performance Prime'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Come Funziona Performance <span className="text-gold">Prime</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-slide-up">
            Trova il professionista perfetto in 3 semplici passi
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold text-black">{step.number}</span>
                  </div>
                  <step.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner PP Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl">
          <Card className="bg-black text-white border-2 border-gold">
            <CardContent className="py-12 px-8">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Award className="w-6 h-6 text-gold" />
                <span className="inline-flex items-center gap-2 bg-gradient-gold text-black px-3 py-1.5 rounded-full font-bold text-base">
                  Partner Performance Prime
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Vantaggi per Abbonati Performance Prime
              </h2>
              
              <p className="text-xl text-center mb-8 text-gray-300">
                Ottieni il <span className="text-gold font-bold text-2xl">10% di sconto</span> su tutti i servizi dei Partner Ufficiali
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-16 gap-y-4 md:gap-y-6 max-w-3xl mx-auto px-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0" />
                    <span className="text-gray-200 leading-6 md:whitespace-nowrap">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 mt-10">
                <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-semibold text-sm sm:text-base px-4 sm:px-6">
                  Abbonati
                </Button>
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold text-sm sm:text-base px-4 sm:px-6">
                  Provala Gratis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-muted/30 overflow-hidden">
        {/* Section Header */}
        <div className="container mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Cosa Dicono i Nostri <span className="text-gold">Clienti</span>
          </h2>
        </div>

        {/* Horizontal Scroll with Animation */}
        <div className="flex gap-6 pb-4 px-4 animate-scroll-right pointer-events-none">
          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ho trovato il personal trainer perfetto in pochi minuti! Professionale e preparato, sono riuscito a perdere 15kg in 6 mesi."
                </p>
                <div className="font-semibold">Marco R.</div>
                <div className="text-sm text-muted-foreground">Milano</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La nutrizionista che ho trovato su Performance Prime mi ha cambiato la vita. Finalmente un'alimentazione sana e sostenibile!"
                </p>
                <div className="font-semibold">Laura B.</div>
                <div className="text-sm text-muted-foreground">Roma</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Servizio eccellente! Ho trovato un fisioterapista esperto che ha risolto i miei problemi alla schiena in poche sedute."
                </p>
                <div className="font-semibold">Giuseppe M.</div>
                <div className="text-sm text-muted-foreground">Torino</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Il mental coach mi ha aiutato a superare l'ansia da prestazione. Oggi mi sento più sicuro e motivato che mai!"
                </p>
                <div className="font-semibold">Andrea P.</div>
                <div className="text-sm text-muted-foreground">Napoli</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ottima esperienza! Il personal trainer è sempre disponibile e mi segue con programmi personalizzati. Risultati straordinari!"
                </p>
                <div className="font-semibold">Francesca T.</div>
                <div className="text-sm text-muted-foreground">Bologna</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Grazie al fisioterapista sono tornato a correre dopo un infortunio. Professionalità e competenza al top!"
                </p>
                <div className="font-semibold">Luca D.</div>
                <div className="text-sm text-muted-foreground">Firenze</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La piattaforma è intuitiva e i professionisti sono tutti verificati. Ho trovato la nutrizionista ideale in pochi click!"
                </p>
                <div className="font-semibold">Sofia C.</div>
                <div className="text-sm text-muted-foreground">Verona</div>
              </CardContent>
            </Card>
          </div>

          {/* Duplicate cards for infinite loop */}
          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ho trovato il personal trainer perfetto in pochi minuti! Professionale e preparato, sono riuscito a perdere 15kg in 6 mesi."
                </p>
                <div className="font-semibold">Marco R.</div>
                <div className="text-sm text-muted-foreground">Milano</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La nutrizionista che ho trovato su Performance Prime mi ha cambiato la vita. Finalmente un'alimentazione sana e sostenibile!"
                </p>
                <div className="font-semibold">Laura B.</div>
                <div className="text-sm text-muted-foreground">Roma</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Servizio eccellente! Ho trovato un fisioterapista esperto che ha risolto i miei problemi alla schiena in poche sedute."
                </p>
                <div className="font-semibold">Giuseppe M.</div>
                <div className="text-sm text-muted-foreground">Torino</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Il mental coach mi ha aiutato a superare l'ansia da prestazione. Oggi mi sento più sicuro e motivato che mai!"
                </p>
                <div className="font-semibold">Andrea P.</div>
                <div className="text-sm text-muted-foreground">Napoli</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ottima esperienza! Il personal trainer è sempre disponibile e mi segue con programmi personalizzati. Risultati straordinari!"
                </p>
                <div className="font-semibold">Francesca T.</div>
                <div className="text-sm text-muted-foreground">Bologna</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Grazie al fisioterapista sono tornato a correre dopo un infortunio. Professionalità e competenza al top!"
                </p>
                <div className="font-semibold">Luca D.</div>
                <div className="text-sm text-muted-foreground">Firenze</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La piattaforma è intuitiva e i professionisti sono tutti verificati. Ho trovato la nutrizionista ideale in pochi click!"
                </p>
                <div className="font-semibold">Sofia C.</div>
                <div className="text-sm text-muted-foreground">Verona</div>
              </CardContent>
            </Card>
          </div>

          {/* Third set for seamless loop */}
          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ho trovato il personal trainer perfetto in pochi minuti! Professionale e preparato, sono riuscito a perdere 15kg in 6 mesi."
                </p>
                <div className="font-semibold">Marco R.</div>
                <div className="text-sm text-muted-foreground">Milano</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La nutrizionista che ho trovato su Performance Prime mi ha cambiato la vita. Finalmente un'alimentazione sana e sostenibile!"
                </p>
                <div className="font-semibold">Laura B.</div>
                <div className="text-sm text-muted-foreground">Roma</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Servizio eccellente! Ho trovato un fisioterapista esperto che ha risolto i miei problemi alla schiena in poche sedute."
                </p>
                <div className="font-semibold">Giuseppe M.</div>
                <div className="text-sm text-muted-foreground">Torino</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Il mental coach mi ha aiutato a superare l'ansia da prestazione. Oggi mi sento più sicuro e motivato che mai!"
                </p>
                <div className="font-semibold">Andrea P.</div>
                <div className="text-sm text-muted-foreground">Napoli</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Ottima esperienza! Il personal trainer è sempre disponibile e mi segue con programmi personalizzati. Risultati straordinari!"
                </p>
                <div className="font-semibold">Francesca T.</div>
                <div className="text-sm text-muted-foreground">Bologna</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Grazie al fisioterapista sono tornato a correre dopo un infortunio. Professionalità e competenza al top!"
                </p>
                <div className="font-semibold">Luca D.</div>
                <div className="text-sm text-muted-foreground">Firenze</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-shrink-0 w-[340px]">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "La piattaforma è intuitiva e i professionisti sono tutti verificati. Ho trovato la nutrizionista ideale in pochi click!"
                </p>
                <div className="font-semibold">Sofia C.</div>
                <div className="text-sm text-muted-foreground">Verona</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Garanzie Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Le Nostre <span className="text-gold">Garanzie</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#1E88E5' }} />
                <h3 className="font-bold text-lg mb-2">Professionisti Verificati</h3>
                <p className="text-sm text-muted-foreground">
                  Tutti i professionisti sono certificati e verificati dal nostro team
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-bold text-lg mb-2">Soddisfatti o Rimborsati</h3>
                <p className="text-sm text-muted-foreground">
                  Garanzia 100% soddisfatti entro i primi 7 giorni
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <Clock className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h3 className="font-bold text-lg mb-2">Supporto 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Team dedicato sempre disponibile per qualsiasi necessità
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-8">
                <Target className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h3 className="font-bold text-lg mb-2">Risultati Garantiti</h3>
                <p className="text-sm text-muted-foreground">
                  95% dei clienti raggiunge i propri obiettivi entro 6 mesi
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Domande <span className="text-gold">Frequenti</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-0">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Come funziona la ricerca di professionisti?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Puoi cercare professionisti filtrando per categoria, città, prezzo e valutazioni. Ogni professionista ha un profilo dettagliato con recensioni verificate, servizi offerti e modalità di contatto.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-0">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                I professionisti sono certificati?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sì, tutti i professionisti sulla piattaforma sono verificati e certificati. Controlliamo le loro credenziali, certificazioni e esperienza prima di approvarli sulla piattaforma.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-0">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Quanto costa il servizio?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                La ricerca e il contatto dei professionisti è completamente gratuita. Paghi solo i servizi del professionista scelto. Gli abbonati Performance Prime ricevono uno sconto del 10% su tutti i Partner Ufficiali.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-0">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Posso cambiare professionista se non sono soddisfatto?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Assolutamente sì! Puoi cambiare professionista in qualsiasi momento. Ti consigliamo di comunicare prima con il professionista per risolvere eventuali problemi, ma sei libero di scegliere.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-0">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                Sono disponibili consulenze online?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sì, molti professionisti offrono consulenze online. Puoi filtrare la ricerca per vedere solo i professionisti disponibili per sessioni virtuali tramite videochiamate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Forte */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 text-gold" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Inizia il Tuo Percorso <span className="text-gold">Oggi</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Unisciti a migliaia di persone che hanno già trasformato la loro vita con i nostri professionisti certificati
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-12 py-6 text-xl">
              <Link to="/professionisti">
                Scopri i Professionisti
              </Link>
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            ✓ Gratis per sempre  ✓ Nessuna carta richiesta  ✓ Supporto 24/7
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;

