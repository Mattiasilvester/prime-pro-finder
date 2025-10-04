-- Aggiorna la foreign key di portal_favorites per puntare a vetrina_professionals
-- Esegui questo script nel SQL Editor di Supabase

-- 1. Rimuovi la foreign key esistente
ALTER TABLE portal_favorites DROP CONSTRAINT IF EXISTS portal_favorites_professional_id_fkey;

-- 2. Aggiungi la nuova foreign key verso vetrina_professionals
ALTER TABLE portal_favorites 
ADD CONSTRAINT portal_favorites_professional_id_fkey 
FOREIGN KEY (professional_id) REFERENCES vetrina_professionals(id) ON DELETE CASCADE;

-- 3. Verifica che la foreign key sia stata creata correttamente
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name = 'portal_favorites';
