import { Professional } from '@/types/professional';

export const mockProfessionals: Professional[] = [
  // Partners (6)
  {
    id: '1',
    slug: 'marco-rossi-personal-trainer',
    name: 'Marco Rossi',
    category: 'personal_trainer',
    city: 'Milano',
    region: 'Lombardia',
    bio: 'Personal trainer certificato con oltre 10 anni di esperienza. Specializzato in allenamenti funzionali e preparazione atletica.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.9,
    reviewCount: 127,
    startingPrice: 80,
    priceRange: '€80-120',
    availableOnline: true,
    specializations: ['Allenamento funzionale', 'Preparazione atletica', 'Riabilitazione'],
    services: [
      { name: 'Sessione Personal Training', description: 'Allenamento personalizzato 1:1', price: 80, duration: '60 min', online: false },
      { name: 'Consulenza Online', description: 'Programma di allenamento personalizzato', price: 50, duration: '45 min', online: true },
      { name: 'Pacchetto 10 Sessioni', description: 'Pacchetto convenienza per allenamenti regolari', price: 750, duration: '60 min x 10', online: false }
    ],
    contact: {
      email: 'marco.rossi@email.com',
      phone: '+39 348 123 4567',
      website: 'https://marcorossift.com',
      address: 'Via Brera 15, Milano'
    },
    social: {
      instagram: 'https://instagram.com/marcorossi_pt',
      tiktok: 'https://tiktok.com/@marcorossi_fitness'
    },
    experience: '10+ anni',
    certifications: ['CONI', 'NASM-CPT', 'FIF']
  },
  {
    id: '2',
    slug: 'giulia-ferrari-nutrizionista',
    name: 'Giulia Ferrari',
    category: 'nutritionist',
    city: 'Roma',
    region: 'Lazio',
    bio: 'Nutrizionista biologa specializzata in nutrizione sportiva e piani alimentari personalizzati per atleti e fitness enthusiast.',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.8,
    reviewCount: 89,
    startingPrice: 70,
    priceRange: '€70-100',
    availableOnline: true,
    specializations: ['Nutrizione sportiva', 'Piani alimentari personalizzati', 'Integrazione'],
    services: [
      { name: 'Consulenza Nutrizionale', description: 'Valutazione e piano alimentare personalizzato', price: 70, duration: '90 min', online: false },
      { name: 'Follow-up Nutrizionale', description: 'Controllo e aggiustamenti piano alimentare', price: 50, duration: '45 min', online: true },
      { name: 'Piano Alimentare Sportivo', description: 'Nutrizione specifica per atleti', price: 100, duration: '120 min', online: false }
    ],
    contact: {
      email: 'giulia.ferrari@nutrition.com',
      phone: '+39 347 987 6543',
      address: 'Via del Corso 200, Roma'
    },
    social: {
      instagram: 'https://instagram.com/giulia_nutrition',
      linkedin: 'https://linkedin.com/in/giuliaferrarini'
    },
    experience: '8 anni',
    certifications: ['Biologo Nutrizionista', 'ISSN', 'Sports Nutrition']
  },
  {
    id: '3',
    slug: 'alessandro-bianchi-fisioterapista',
    name: 'Alessandro Bianchi',
    category: 'physiotherapist',
    city: 'Torino',
    region: 'Piemonte',
    bio: 'Fisioterapista specializzato in riabilitazione sportiva e terapia manuale. Lavora con atleti professionisti e amatori.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.9,
    reviewCount: 156,
    startingPrice: 60,
    priceRange: '€60-90',
    availableOnline: false,
    specializations: ['Riabilitazione sportiva', 'Terapia manuale', 'Postura'],
    services: [
      { name: 'Seduta Fisioterapica', description: 'Trattamento riabilitativo personalizzato', price: 60, duration: '50 min', online: false },
      { name: 'Valutazione Posturale', description: 'Analisi completa della postura', price: 80, duration: '60 min', online: false },
      { name: 'Terapia Manuale', description: 'Tecniche manuali specializzate', price: 70, duration: '45 min', online: false }
    ],
    contact: {
      email: 'alessandro.bianchi@fisio.com',
      phone: '+39 346 555 7788',
      address: 'Corso Francia 45, Torino'
    },
    social: {
      instagram: 'https://instagram.com/ale_fisio_torino'
    },
    experience: '12 anni',
    certifications: ['Fisioterapista', 'OMT', 'Dry Needling']
  },
  {
    id: '4',
    slug: 'francesca-verde-mental-coach',
    name: 'Francesca Verde',
    category: 'mental_coach',
    city: 'Napoli',
    region: 'Campania',
    bio: 'Mental coach e psicologa dello sport. Aiuto atleti e appassionati di fitness a superare blocchi mentali e raggiungere i propri obiettivi.',
    photo: 'https://images.unsplash.com/photo-1594824202628-29b4971a86f9?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.7,
    reviewCount: 78,
    startingPrice: 90,
    priceRange: '€90-130',
    availableOnline: true,
    specializations: ['Psicologia dello sport', 'Motivazione', 'Gestione stress'],
    services: [
      { name: 'Sessione Mental Coaching', description: 'Colloquio di coaching mentale individuale', price: 90, duration: '60 min', online: true },
      { name: 'Percorso Motivazionale', description: 'Programma di 5 sessioni per obiettivi specifici', price: 400, duration: '5x60 min', online: true },
      { name: 'Workshop Gestione Stress', description: 'Sessione di gruppo per tecniche anti-stress', price: 40, duration: '90 min', online: false }
    ],
    contact: {
      email: 'francesca.verde@mentalcoach.com',
      phone: '+39 345 333 9999',
      address: 'Via Chiaia 67, Napoli'
    },
    social: {
      instagram: 'https://instagram.com/francesca_mentalcoach',
      linkedin: 'https://linkedin.com/in/francescaverde'
    },
    experience: '6 anni',
    certifications: ['Psicologa', 'Mental Coach Certificata', 'PNL']
  },
  {
    id: '5',
    slug: 'roberto-gallo-personal-trainer',
    name: 'Roberto Gallo',
    category: 'personal_trainer',
    city: 'Milano',
    region: 'Lombardia',
    bio: 'Ex atleta professionista, ora personal trainer specializzato in bodybuilding e powerlifting. Preparatore per gare e competizioni.',
    photo: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.8,
    reviewCount: 94,
    startingPrice: 85,
    priceRange: '€85-150',
    availableOnline: true,
    specializations: ['Bodybuilding', 'Powerlifting', 'Preparazione gare'],
    services: [
      { name: 'Personal Training Avanzato', description: 'Allenamento per atleti esperti', price: 85, duration: '75 min', online: false },
      { name: 'Preparazione Gara', description: 'Coaching completo per competizioni', price: 150, duration: '90 min', online: false },
      { name: 'Consulenza Tecnica Online', description: 'Analisi tecnica e programmazione', price: 60, duration: '45 min', online: true }
    ],
    contact: {
      email: 'roberto.gallo@powertraining.com',
      phone: '+39 349 777 1234',
      address: 'Via Garibaldi 88, Milano'
    },
    social: {
      instagram: 'https://instagram.com/roberto_powerlifting',
      tiktok: 'https://tiktok.com/@robgallo_power'
    },
    experience: '15+ anni',
    certifications: ['FIPCF', 'Powerlifting Coach', 'Ex Atleta Nazionale']
  },
  {
    id: '6',
    slug: 'martina-russo-nutrizionista',
    name: 'Martina Russo',
    category: 'nutritionist',
    city: 'Bologna',
    region: 'Emilia-Romagna',
    bio: 'Dietista specializzata in alimentazione vegetale e sostenibile. Approccio olistico alla nutrizione per benessere e performance.',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    isPartner: true,
    rating: 4.6,
    reviewCount: 67,
    startingPrice: 65,
    priceRange: '€65-95',
    availableOnline: true,
    specializations: ['Alimentazione vegetale', 'Nutrizione olistica', 'Sostenibilità'],
    services: [
      { name: 'Consulenza Plant-Based', description: 'Transizione verso alimentazione vegetale', price: 65, duration: '75 min', online: true },
      { name: 'Piano Nutrizionale Olistico', description: 'Approccio integrato corpo-mente', price: 85, duration: '90 min', online: false },
      { name: 'Workshop Alimentazione Sostenibile', description: 'Educazione alimentare di gruppo', price: 30, duration: '120 min', online: false }
    ],
    contact: {
      email: 'martina.russo@holistic-nutrition.com',
      phone: '+39 344 888 5555',
      address: 'Via Indipendenza 123, Bologna'
    },
    social: {
      instagram: 'https://instagram.com/martina_holistic',
      tiktok: 'https://tiktok.com/@martina_plantbased'
    },
    experience: '5 anni',
    certifications: ['Dietista', 'Nutrizione Vegetale', 'Coaching Olistico']
  },

  // Regular Professionals (14)
  {
    id: '7',
    slug: 'luca-marini-personal-trainer',
    name: 'Luca Marini',
    category: 'personal_trainer',
    city: 'Roma',
    region: 'Lazio',
    bio: 'Personal trainer dinamico con focus su allenamenti HIIT e functional training. Perfetto per chi vuole risultati rapidi.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.5,
    reviewCount: 43,
    startingPrice: 55,
    priceRange: '€55-75',
    availableOnline: true,
    specializations: ['HIIT', 'Functional Training', 'Dimagrimento'],
    services: [
      { name: 'Sessione HIIT', description: 'Allenamento ad alta intensità', price: 55, duration: '45 min', online: false },
      { name: 'Functional Training', description: 'Movimenti funzionali per la vita quotidiana', price: 60, duration: '50 min', online: false }
    ],
    contact: {
      email: 'luca.marini@fitness.com',
      phone: '+39 342 111 2222',
      address: 'Via Appia 456, Roma'
    },
    social: {
      instagram: 'https://instagram.com/luca_hiit_trainer'
    },
    experience: '4 anni',
    certifications: ['Personal Trainer', 'HIIT Specialist']
  },
  {
    id: '8',
    slug: 'sofia-colombo-nutrizionista',
    name: 'Sofia Colombo',
    category: 'nutritionist',
    city: 'Milano',
    region: 'Lombardia',
    bio: 'Nutrizionista giovane e appassionata, specializzata in alimentazione per millennials e busy professionals.',
    photo: 'https://images.unsplash.com/photo-1594824202628-29b4971a86f9?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.3,
    reviewCount: 31,
    startingPrice: 50,
    priceRange: '€50-70',
    availableOnline: true,
    specializations: ['Nutrizione moderna', 'Meal prep', 'Stile di vita sano'],
    services: [
      { name: 'Consulenza Nutrizionale Base', description: 'Prima consulenza per giovani professionisti', price: 50, duration: '60 min', online: true },
      { name: 'Piano Meal Prep', description: 'Organizzazione pasti settimanali', price: 40, duration: '45 min', online: true }
    ],
    contact: {
      email: 'sofia.colombo@modernnutrition.com',
      phone: '+39 341 999 8888',
      address: 'Via Navigli 234, Milano'
    },
    social: {
      instagram: 'https://instagram.com/sofia_modern_nutrition',
      tiktok: 'https://tiktok.com/@sofia_nutri'
    },
    experience: '3 anni',
    certifications: ['Dietista', 'Nutrition Coach']
  },
  {
    id: '9',
    slug: 'davide-moretti-fisioterapista',
    name: 'Davide Moretti',
    category: 'physiotherapist',
    city: 'Torino',
    region: 'Piemonte',
    bio: 'Fisioterapista esperto in trattamenti per dolori cronici e riabilitazione post-infortunio.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.4,
    reviewCount: 52,
    startingPrice: 50,
    priceRange: '€50-70',
    availableOnline: false,
    specializations: ['Dolori cronici', 'Riabilitazione', 'Mobilità'],
    services: [
      { name: 'Trattamento Dolori Cronici', description: 'Terapia per dolori persistenti', price: 55, duration: '50 min', online: false },
      { name: 'Riabilitazione Post-Infortunio', description: 'Recovery da traumi sportivi', price: 60, duration: '60 min', online: false }
    ],
    contact: {
      email: 'davide.moretti@fisiotorino.com',
      phone: '+39 340 777 3333',
      address: 'Via Po 67, Torino'
    },
    social: {
      instagram: 'https://instagram.com/davide_fisio'
    },
    experience: '7 anni',
    certifications: ['Fisioterapista', 'Terapia Manuale']
  },
  {
    id: '10',
    slug: 'elena-ricci-mental-coach',
    name: 'Elena Ricci',
    category: 'mental_coach',
    city: 'Firenze',
    region: 'Toscana',
    bio: 'Mental coach specializzata in mindfulness e tecniche di rilassamento per atleti e professionisti stressati.',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.2,
    reviewCount: 28,
    startingPrice: 70,
    priceRange: '€70-90',
    availableOnline: true,
    specializations: ['Mindfulness', 'Rilassamento', 'Gestione ansia'],
    services: [
      { name: 'Sessione Mindfulness', description: 'Meditazione guidata e tecniche di presenza', price: 70, duration: '60 min', online: true },
      { name: 'Tecniche Anti-Stress', description: 'Strategie per gestire ansia da performance', price: 80, duration: '50 min', online: true }
    ],
    contact: {
      email: 'elena.ricci@mindful-coaching.com',
      phone: '+39 339 444 5555',
      address: 'Via Tornabuoni 12, Firenze'
    },
    social: {
      instagram: 'https://instagram.com/elena_mindful_coach'
    },
    experience: '4 anni',
    certifications: ['Life Coach', 'Mindfulness Teacher']
  },
  {
    id: '11',
    slug: 'antonio-serra-personal-trainer',
    name: 'Antonio Serra',
    category: 'personal_trainer',
    city: 'Napoli',
    region: 'Campania',
    bio: 'Personal trainer con esperienza nel crossfit e allenamenti outdoor. Motivatore nato per superare i propri limiti.',
    photo: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.6,
    reviewCount: 61,
    startingPrice: 45,
    priceRange: '€45-65',
    availableOnline: false,
    specializations: ['CrossFit', 'Outdoor Training', 'Motivazione'],
    services: [
      { name: 'CrossFit Training', description: 'Allenamento funzionale ad alta intensità', price: 50, duration: '60 min', online: false },
      { name: 'Outdoor Bootcamp', description: 'Allenamento all\'aperto in gruppo', price: 25, duration: '45 min', online: false }
    ],
    contact: {
      email: 'antonio.serra@crossfitnapoli.com',
      phone: '+39 338 666 7777',
      address: 'Via Toledo 189, Napoli'
    },
    social: {
      instagram: 'https://instagram.com/antonio_crossfit_napoli',
      tiktok: 'https://tiktok.com/@antonio_outdoor'
    },
    experience: '6 anni',
    certifications: ['CrossFit L1', 'Outdoor Training']
  },
  {
    id: '12',
    slug: 'valentina-costa-nutrizionista',
    name: 'Valentina Costa',
    category: 'nutritionist',
    city: 'Torino',
    region: 'Piemonte',
    bio: 'Nutrizionista clinica con esperienza in disturbi alimentari e ricomposizione corporea per sportivi.',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces',
    isPartner: false,
    rating: 4.7,
    reviewCount: 38,
    startingPrice: 60,
    priceRange: '€60-85',
    availableOnline: true,
    specializations: ['Disturbi alimentari', 'Ricomposizione corporea', 'Nutrizione clinica'],
    services: [
      { name: 'Consulenza Ricomposizione Corporea', description: 'Piano nutrizionale per body recomposition', price: 75, duration: '80 min', online: false },
      { name: 'Supporto Disturbi Alimentari', description: 'Accompagnamento specializzato', price: 80, duration: '60 min', online: true }
    ],
    contact: {
      email: 'valentina.costa@clinicalnutrition.com',
      phone: '+39 337 222 8888',
      address: 'Corso Vittorio 145, Torino'
    },
    social: {
      instagram: 'https://instagram.com/valentina_clinical_nutrition'
    },
    experience: '9 anni',
    certifications: ['Nutrizionista Clinica', 'Disturbi Alimentari']
  },
  {
    id: '13',
    slug: 'michele-bruno-fisioterapista',
    name: 'Michele Bruno',
    category: 'physiotherapist',
    city: 'Napoli',
    region: 'Campania',
    bio: 'Fisioterapista specializzato in tecniche osteopatiche e trattamento della colonna vertebrale.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.5,
    reviewCount: 44,
    startingPrice: 55,
    priceRange: '€55-75',
    availableOnline: false,
    specializations: ['Osteopatia', 'Colonna vertebrale', 'Mal di schiena'],
    services: [
      { name: 'Trattamento Osteopatico', description: 'Tecniche manuali osteopatiche', price: 65, duration: '50 min', online: false },
      { name: 'Terapia Colonna Vertebrale', description: 'Specializzazione mal di schiena', price: 60, duration: '45 min', online: false }
    ],
    contact: {
      email: 'michele.bruno@osteonapoli.com',
      phone: '+39 336 111 4444',
      address: 'Via Partenope 78, Napoli'
    },
    social: {
      instagram: 'https://instagram.com/michele_osteo'
    },
    experience: '8 anni',
    certifications: ['Fisioterapista', 'Osteopata D.O.']
  },
  {
    id: '14',
    slug: 'laura-fontana-mental-coach',
    name: 'Laura Fontana',
    category: 'mental_coach',
    city: 'Bologna',
    region: 'Emilia-Romagna',
    bio: 'Life coach e counselor specializzata in obiettivi di fitness e trasformazione personale.',
    photo: 'https://images.unsplash.com/photo-1594824202628-29b4971a86f9?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.1,
    reviewCount: 22,
    startingPrice: 65,
    priceRange: '€65-85',
    availableOnline: true,
    specializations: ['Obiettivi fitness', 'Trasformazione personale', 'Autostima'],
    services: [
      { name: 'Coaching Obiettivi Fitness', description: 'Definizione e raggiungimento obiettivi', price: 65, duration: '60 min', online: true },
      { name: 'Percorso Trasformazione', description: 'Cambiamento stile di vita a 360°', price: 300, duration: '4x60 min', online: true }
    ],
    contact: {
      email: 'laura.fontana@lifecoaching.com',
      phone: '+39 335 999 1111',
      address: 'Via Rizzoli 34, Bologna'
    },
    social: {
      instagram: 'https://instagram.com/laura_life_transformation'
    },
    experience: '5 anni',
    certifications: ['Life Coach', 'Counselor', 'NLP Practitioner']
  },
  {
    id: '15',
    slug: 'simone-neri-personal-trainer',
    name: 'Simone Neri',
    category: 'personal_trainer',
    city: 'Firenze',
    region: 'Toscana',
    bio: 'Personal trainer specializzato in calisthenics e ginnastica funzionale. Approccio naturale al movimento.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.4,
    reviewCount: 37,
    startingPrice: 50,
    priceRange: '€50-70',
    availableOnline: true,
    specializations: ['Calisthenics', 'Ginnastica funzionale', 'Movimento naturale'],
    services: [
      { name: 'Calisthenics Training', description: 'Allenamento a corpo libero', price: 55, duration: '60 min', online: false },
      { name: 'Movimento Funzionale', description: 'Ginnastica per la vita quotidiana', price: 50, duration: '50 min', online: false }
    ],
    contact: {
      email: 'simone.neri@calisthenics.com',
      phone: '+39 334 777 2222',
      address: 'Oltrarno 56, Firenze'
    },
    social: {
      instagram: 'https://instagram.com/simone_calisthenics',
      tiktok: 'https://tiktok.com/@simone_bodyweight'
    },
    experience: '5 anni',
    certifications: ['Calisthenics Coach', 'Functional Movement']
  },
  {
    id: '16',
    slug: 'chiara-galli-nutrizionista',
    name: 'Chiara Galli',
    category: 'nutritionist',
    city: 'Roma',
    region: 'Lazio',
    bio: 'Dietista pediatrica specializzata anche in nutrizione per famiglie attive e educazione alimentare.',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.6,
    reviewCount: 29,
    startingPrice: 55,
    priceRange: '€55-75',
    availableOnline: true,
    specializations: ['Nutrizione pediatrica', 'Famiglie attive', 'Educazione alimentare'],
    services: [
      { name: 'Consulenza Famiglia Attiva', description: 'Alimentazione per tutta la famiglia sportiva', price: 70, duration: '75 min', online: true },
      { name: 'Educazione Alimentare Bambini', description: 'Approccio ludico alla sana alimentazione', price: 60, duration: '60 min', online: false }
    ],
    contact: {
      email: 'chiara.galli@familynutrition.com',
      phone: '+39 333 444 6666',
      address: 'Via Flaminia 267, Roma'
    },
    social: {
      instagram: 'https://instagram.com/chiara_family_nutrition'
    },
    experience: '6 anni',
    certifications: ['Dietista Pediatrica', 'Educazione Alimentare']
  },
  {
    id: '17',
    slug: 'federico-leone-fisioterapista',
    name: 'Federico Leone',
    category: 'physiotherapist',
    city: 'Milano',
    region: 'Lombardia',
    bio: 'Fisioterapista dello sport con focus su prevenzione infortuni e massaggio sportivo.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.3,
    reviewCount: 48,
    startingPrice: 60,
    priceRange: '€60-80',
    availableOnline: false,
    specializations: ['Fisioterapia sportiva', 'Prevenzione infortuni', 'Massaggio sportivo'],
    services: [
      { name: 'Massaggio Sportivo', description: 'Massaggio per recupero muscolare', price: 60, duration: '45 min', online: false },
      { name: 'Valutazione Preventiva', description: 'Screening per prevenzione infortuni', price: 75, duration: '60 min', online: false }
    ],
    contact: {
      email: 'federico.leone@sportfisio.com',
      phone: '+39 332 888 9999',
      address: 'Via Montenapoleone 123, Milano'
    },
    social: {
      instagram: 'https://instagram.com/federico_sport_fisio'
    },
    experience: '7 anni',
    certifications: ['Fisioterapista dello Sport', 'Massaggio Sportivo']
  },
  {
    id: '18',
    slug: 'anna-villa-personal-trainer',
    name: 'Anna Villa',
    category: 'personal_trainer',
    city: 'Roma',
    region: 'Lazio',
    bio: 'Personal trainer femminile specializzata in allenamento per donne, pre e post gravidanza.',
    photo: 'https://images.unsplash.com/photo-1594824202628-29b4971a86f9?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.8,
    reviewCount: 56,
    startingPrice: 65,
    priceRange: '€65-85',
    availableOnline: true,
    specializations: ['Allenamento femminile', 'Pre/post gravidanza', 'Tonificazione'],
    services: [
      { name: 'Personal Training Femminile', description: 'Allenamento specifico per donne', price: 65, duration: '60 min', online: false },
      { name: 'Fitness Pre/Post Gravidanza', description: 'Allenamento sicuro in gravidanza', price: 75, duration: '50 min', online: false },
      { name: 'Consulenza Online Mamma Fit', description: 'Supporto fitness per neomamme', price: 45, duration: '40 min', online: true }
    ],
    contact: {
      email: 'anna.villa@mammafit.com',
      phone: '+39 331 555 7777',
      address: 'Via Nazionale 456, Roma'
    },
    social: {
      instagram: 'https://instagram.com/anna_mamma_fit',
      tiktok: 'https://tiktok.com/@anna_prenatal_fitness'
    },
    experience: '8 anni',
    certifications: ['Personal Trainer', 'Pre/Post Natal Fitness']
  },
  {
    id: '19',
    slug: 'giorgio-sanna-massaggiatore',
    name: 'Giorgio Sanna',
    category: 'other',
    city: 'Palermo',
    region: 'Sicilia',
    bio: 'Massaggiatore terapeutico specializzato in tecniche orientali e rilassamento profondo.',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.4,
    reviewCount: 33,
    startingPrice: 45,
    priceRange: '€45-70',
    availableOnline: false,
    specializations: ['Massaggio terapeutico', 'Tecniche orientali', 'Rilassamento'],
    services: [
      { name: 'Massaggio Rilassante', description: 'Massaggio per rilassamento profondo', price: 50, duration: '60 min', online: false },
      { name: 'Massaggio Shiatsu', description: 'Tecnica giapponese di digitopressione', price: 60, duration: '75 min', online: false },
      { name: 'Massaggio Decontratturante', description: 'Trattamento per tensioni muscolari', price: 55, duration: '50 min', online: false }
    ],
    contact: {
      email: 'giorgio.sanna@massaggiorelax.com',
      phone: '+39 330 333 4444',
      address: 'Via Maqueda 89, Palermo'
    },
    social: {
      instagram: 'https://instagram.com/giorgio_massage_palermo'
    },
    experience: '10 anni',
    certifications: ['Massaggiatore Terapeutico', 'Shiatsu', 'Tecniche Orientali']
  },
  {
    id: '20',
    slug: 'sara-de-santis-yoga-instructor',
    name: 'Sara De Santis',
    category: 'other',
    city: 'Milano',
    region: 'Lombardia',
    bio: 'Istruttrice di yoga e pilates con formazione internazionale. Focus su flessibilità e benessere mentale.',
    photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face',
    isPartner: false,
    rating: 4.7,
    reviewCount: 41,
    startingPrice: 40,
    priceRange: '€40-60',
    availableOnline: true,
    specializations: ['Yoga', 'Pilates', 'Flessibilità'],
    services: [
      { name: 'Lezione Yoga Individuale', description: 'Pratica yoga personalizzata', price: 50, duration: '60 min', online: false },
      { name: 'Pilates Matwork', description: 'Pilates a corpo libero', price: 45, duration: '50 min', online: false },
      { name: 'Yoga Online', description: 'Lezione yoga da casa', price: 30, duration: '45 min', online: true },
      { name: 'Stretching e Mobilità', description: 'Sessione di flessibilità guidata', price: 40, duration: '40 min', online: true }
    ],
    contact: {
      email: 'sara.desantis@yogapilates.com',
      phone: '+39 329 666 8888',
      address: 'Porta Romana 234, Milano'
    },
    social: {
      instagram: 'https://instagram.com/sara_yoga_milano',
      tiktok: 'https://tiktok.com/@sara_yoga_flow'
    },
    experience: '6 anni',
    certifications: ['Yoga Alliance RYT-200', 'Pilates Matwork', 'Yin Yoga']
  }
];