import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Professional = Tables<'professionals'>;

export default function TestPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const { data, error: fetchError } = await supabase
          .from('professionals')
          .select('*')
          .limit(5);

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setProfessionals(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    }

    fetchProfessionals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl">
          <h1 className="text-2xl font-bold text-red-700 mb-4">❌ Errore Connessione Supabase</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">
            ✅ Test Supabase - Connessione Riuscita!
          </h1>
          <p className="text-gray-600 mb-6">
            Trovati <span className="font-bold text-[#EEBA2B]">{professionals.length}</span> professionisti
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">📊 Database Info:</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>URL:</strong> https://kfxoyucatvvcgmqalxsg.supabase.co</li>
              <li><strong>Tabella:</strong> professionals</li>
              <li><strong>Records trovati:</strong> {professionals.length}</li>
            </ul>
          </div>

          {professionals.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-4">📋 Primi 5 Professionisti:</h2>
              <div className="space-y-4">
                {professionals.map((prof) => (
                  <div 
                    key={prof.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#EEBA2B] transition-colors"
                  >
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>ID:</strong> {prof.id}</div>
                      <div><strong>Email:</strong> {prof.email}</div>
                      <div><strong>Nome:</strong> {prof.first_name} {prof.last_name}</div>
                      <div><strong>Categoria:</strong> {prof.category}</div>
                      <div><strong>Azienda:</strong> {prof.company_name}</div>
                      <div><strong>Telefono:</strong> {prof.phone}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">🔍 Raw Data (JSON):</h3>
                <pre className="bg-white p-4 rounded border border-blue-200 overflow-x-auto text-xs">
                  {JSON.stringify(professionals, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">
                ⚠️ Nessun professionista trovato nel database. La connessione funziona ma la tabella è vuota.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold mb-3">✅ Setup Completato:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Supabase client configurato</li>
              <li>✓ TypeScript types generati</li>
              <li>✓ Query funzionante</li>
              <li>✓ Pronto per sviluppo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

