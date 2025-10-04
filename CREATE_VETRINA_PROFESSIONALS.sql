-- ============================================
-- CREA TABELLA VETRINA PROFESSIONALS
-- ============================================
-- Esegui questo script nel SQL Editor di Supabase

-- 1. CREA TABELLA VETRINA_PROFESSIONALS
CREATE TABLE IF NOT EXISTS vetrina_professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  category TEXT NOT NULL,
  is_partner BOOLEAN DEFAULT false,
  photo_url TEXT,
  city TEXT NOT NULL,
  region TEXT,
  starting_price DECIMAL(10,2) NOT NULL,
  rating_avg DECIMAL(3,2) DEFAULT 0.0,
  rating_count INTEGER DEFAULT 0,
  services JSONB DEFAULT '[]'::jsonb,
  available_online BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ABILITA RLS
ALTER TABLE vetrina_professionals ENABLE ROW LEVEL SECURITY;

-- 3. CREA POLICY PER LETTURA PUBBLICA
CREATE POLICY "Vetrina professionals are publicly readable" ON vetrina_professionals
FOR SELECT USING (active = true);

-- 4. INSERISCI PROFESSIONISTI MOCK
INSERT INTO vetrina_professionals (
  id, slug, full_name, headline, bio, category, is_partner, photo_url, city, region, starting_price, rating_avg, rating_count, services, available_online, active
) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'marco-rossi-personal-trainer', 'Marco Rossi', 'Personal Trainer Certificato', 'Personal trainer certificato con oltre 10 anni di esperienza. Specializzato in allenamenti funzionali e preparazione atletica.', 'personal_trainer', true, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'Milano', 'Lombardia', 80, 4.9, 127, '["Sessione Personal Training", "Consulenza Online", "Pacchetto 10 Sessioni"]', true, true),

('550e8400-e29b-41d4-a716-446655440002', 'giulia-ferrari-nutrizionista', 'Giulia Ferrari', 'Nutrizionista Sportiva', 'Nutrizionista specializzata in alimentazione sportiva con esperienza nel supporto di atleti professionisti.', 'nutritionist', true, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', 'Roma', 'Lazio', 70, 4.8, 89, '["Consulenza Nutrizionale", "Follow-up Nutrizionale", "Piano Alimentare Sportivo"]', true, true),

('550e8400-e29b-41d4-a716-446655440003', 'alessandro-bianchi-fisioterapista', 'Alessandro Bianchi', 'Fisioterapista Specializzato', 'Fisioterapista specializzato in riabilitazione sportiva e terapia manuale. Lavora con atleti professionisti e amatori.', 'physiotherapist', true, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', 'Torino', 'Piemonte', 60, 4.9, 156, '["Valutazione Fisioterapica", "Terapia Manuale", "Riabilitazione Sportiva"]', true, true),

('550e8400-e29b-41d4-a716-446655440004', 'francesca-verde-mental-coach', 'Francesca Verde', 'Mental Coach e Psicologa', 'Psicologa e mental coach specializzata in performance sportiva e benessere mentale.', 'mental_coach', true, 'https://images.unsplash.com/photo-1594824472210-2f2b7d8b0b0b?w=400&h=400&fit=crop&crop=face', 'Napoli', 'Campania', 90, 4.7, 78, '["Sessione Mental Coaching", "Supporto Psicologico", "Preparazione Mentale"]', true, true),

('550e8400-e29b-41d4-a716-446655440005', 'roberto-gallo-personal-trainer', 'Roberto Gallo', 'Personal Trainer Esperto', 'Personal trainer con 15+ anni di esperienza nel powerlifting e allenamenti funzionali.', 'personal_trainer', true, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'Milano', 'Lombardia', 75, 4.8, 203, '["Powerlifting Training", "Allenamento Funzionale", "Consulenza Tecnica"]', false, true),

('550e8400-e29b-41d4-a716-446655440006', 'martina-russo-nutrizionista', 'Martina Russo', 'Nutrizionista Clinica', 'Nutrizionista clinica specializzata in disturbi alimentari e nutrizione pediatrica.', 'nutritionist', true, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', 'Bologna', 'Emilia-Romagna', 65, 4.6, 134, '["Nutrizione Clinica", "Disturbi Alimentari", "Nutrizione Pediatrica"]', true, true),

('550e8400-e29b-41d4-a716-446655440007', 'luca-morandi-fisioterapista', 'Luca Morandi', 'Fisioterapista Ortopedico', 'Fisioterapista specializzato in riabilitazione ortopedica e post-chirurgica.', 'physiotherapist', false, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', 'Firenze', 'Toscana', 55, 4.5, 92, '["Riabilitazione Ortopedica", "Post-Chirurgica", "Terapia del Dolore"]', false, true),

('550e8400-e29b-41d4-a716-446655440008', 'elena-ricci-mental-coach', 'Elena Ricci', 'Mental Coach Aziendale', 'Mental coach specializzata in performance aziendale e leadership.', 'mental_coach', false, 'https://images.unsplash.com/photo-1594824472210-2f2b7d8b0b0b?w=400&h=400&fit=crop&crop=face', 'Genova', 'Liguria', 85, 4.4, 67, '["Coaching Aziendale", "Leadership", "Performance Management"]', true, true),

('550e8400-e29b-41d4-a716-446655440009', 'davide-bruno-personal-trainer', 'Davide Bruno', 'Personal Trainer Funzionale', 'Personal trainer specializzato in allenamenti funzionali e correttivi.', 'personal_trainer', false, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'Venezia', 'Veneto', 70, 4.7, 118, '["Allenamento Funzionale", "Correttivo", "Mobility"]', true, true),

('550e8400-e29b-41d4-a716-446655440010', 'chiara-neri-nutrizionista', 'Chiara Neri', 'Nutrizionista Wellness', 'Nutrizionista specializzata in wellness e alimentazione preventiva.', 'nutritionist', false, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', 'Verona', 'Veneto', 60, 4.5, 89, '["Nutrizione Wellness", "Preventiva", "Educazione Alimentare"]', true, true),

('550e8400-e29b-41d4-a716-446655440011', 'andrea-rossi-fisioterapista', 'Andrea Rossi', 'Fisioterapista Sportivo', 'Fisioterapista sportivo con esperienza in squadre professionistiche.', 'physiotherapist', false, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', 'Parma', 'Emilia-Romagna', 65, 4.6, 145, '["Fisioterapia Sportiva", "Prevenzione Infortuni", "Ritorno allo Sport"]', false, true),

('550e8400-e29b-41d4-a716-446655440012', 'silvia-galli-mental-coach', 'Silvia Galli', 'Mental Coach Sportivo', 'Mental coach specializzata in psicologia dello sport e performance atletica.', 'mental_coach', false, 'https://images.unsplash.com/photo-1594824472210-2f2b7d8b0b0b?w=400&h=400&fit=crop&crop=face', 'Padova', 'Veneto', 80, 4.8, 112, '["Psicologia dello Sport", "Performance Atletica", "Gestione Stress"]', true, true),

('550e8400-e29b-41d4-a716-446655440013', 'michele-conti-personal-trainer', 'Michele Conti', 'Personal Trainer Calisthenics', 'Personal trainer specializzato in calisthenics e bodyweight training.', 'personal_trainer', false, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'Modena', 'Emilia-Romagna', 65, 4.4, 76, '["Calisthenics", "Bodyweight Training", "Street Workout"]', true, true),

('550e8400-e29b-41d4-a716-446655440014', 'valentina-ferri-nutrizionista', 'Valentina Ferri', 'Nutrizionista Vegana', 'Nutrizionista specializzata in alimentazione vegana e plant-based.', 'nutritionist', false, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', 'Perugia', 'Umbria', 55, 4.3, 98, '["Nutrizione Vegana", "Plant-Based", "Integrazione Naturale"]', true, true),

('550e8400-e29b-41d4-a716-446655440015', 'stefano-bianchi-fisioterapista', 'Stefano Bianchi', 'Fisioterapista Neurologico', 'Fisioterapista specializzato in riabilitazione neurologica.', 'physiotherapist', false, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', 'Brescia', 'Lombardia', 70, 4.7, 83, '["Riabilitazione Neurologica", "Parkinson", "Ictus"]', false, true),

('550e8400-e29b-41d4-a716-446655440016', 'giulia-marino-mental-coach', 'Giulia Marino', 'Mental Coach Life', 'Mental coach specializzata in life coaching e sviluppo personale.', 'mental_coach', false, 'https://images.unsplash.com/photo-1594824472210-2f2b7d8b0b0b?w=400&h=400&fit=crop&crop=face', 'Trento', 'Trentino-Alto Adige', 75, 4.5, 94, '["Life Coaching", "Sviluppo Personale", "Gestione Obiettivi"]', true, true),

('550e8400-e29b-41d4-a716-446655440017', 'marco-ferrari-personal-trainer', 'Marco Ferrari', 'Personal Trainer CrossFit', 'Personal trainer specializzato in CrossFit e functional fitness.', 'personal_trainer', false, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face', 'Udine', 'Friuli-Venezia Giulia', 80, 4.6, 127, '["CrossFit", "Functional Fitness", "HIIT Training"]', false, true),

('550e8400-e29b-41d4-a716-446655440018', 'francesca-romano-nutrizionista', 'Francesca Romano', 'Nutrizionista Pediatrica', 'Nutrizionista specializzata in alimentazione pediatrica e adolescenziale.', 'nutritionist', false, 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', 'Reggio Calabria', 'Calabria', 50, 4.2, 67, '["Nutrizione Pediatrica", "Adolescenziale", "Familiare"]', true, true),

('550e8400-e29b-41d4-a716-446655440019', 'alessandro-verdi-fisioterapista', 'Alessandro Verdi', 'Fisioterapista Geriatrico', 'Fisioterapista specializzato in riabilitazione geriatrica e terza età.', 'physiotherapist', false, 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', 'Bari', 'Puglia', 60, 4.4, 89, '["Riabilitazione Geriatrica", "Terza Età", "Prevenzione Cadute"]', false, true),

('550e8400-e29b-41d4-a716-446655440020', 'elena-bianco-mental-coach', 'Elena Bianco', 'Mental Coach Relazionale', 'Mental coach specializzata in relazioni e comunicazione efficace.', 'mental_coach', false, 'https://images.unsplash.com/photo-1594824472210-2f2b7d8b0b0b?w=400&h=400&fit=crop&crop=face', 'Catania', 'Sicilia', 70, 4.3, 78, '["Coaching Relazionale", "Comunicazione", "Gestione Conflitti"]', true, true);

-- 5. VERIFICA INSERIMENTO
SELECT COUNT(*) as total_professionals FROM vetrina_professionals;
SELECT id, full_name, category, is_partner FROM vetrina_professionals LIMIT 5;
