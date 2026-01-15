'use client'; // Necessario per l'interattività dei bottoni se usati in Next.js App Router

import { Edit, Trash2, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

// Dati simulati per le pagine (in futuro verranno dal tuo DB)
const pages = [
  { id: 1, title: 'Home Page', slug: '/', status: 'Pubblicata', lastModified: '12/01/2025' },
  { id: 2, title: 'Chi Siamo', slug: '/chi-siamo', status: 'Pubblicata', lastModified: '10/01/2025' },
  { id: 3, title: 'Contatti', slug: '/contatti', status: 'Bozza', lastModified: '15/01/2025' },
  { id: 4, title: 'Shop', slug: '/shop', status: 'Pubblicata', lastModified: '09/01/2025' },
  { id: 5, title: 'Termini e Condizioni', slug: '/termini', status: 'Bozza', lastModified: '01/01/2025' },
];

const PageManager = () => {
  return (
    <div className="bg-neutral-900 block p-6 min-h-[80vh]">
      
      {/* Intestazione Sezione */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-2xl font-bold tracking-tight text-white leading-8">
          Gestione Pagine
        </h5>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          + Nuova Pagina
        </button>
      </div>

      {/* Contenitore Tabella */}
      <div className="relative overflow-x-auto rounded-lg border border-neutral-700 shadow-md">
        <table className="w-full text-sm text-left text-neutral-400">
          
          {/* Header Tabella */}
          <thead className="text-xs text-neutral-300 uppercase bg-neutral-800 border-b border-neutral-700">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Titolo Pagina
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Slug (URL)
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Stato
              </th>
              <th scope="col" className="px-6 py-4 font-medium tracking-wider">
                Ultima Modifica
              </th>
              <th scope="col" className="px-6 py-4 text-right font-medium tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>

          {/* Corpo Tabella */}
          <tbody className="divide-y divide-neutral-700">
            {pages.map((page) => (
              <tr 
                key={page.id} 
                className="bg-neutral-900 hover:bg-neutral-800/60 transition-colors"
              >
                {/* Colonna Titolo */}
                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap flex items-center gap-3">
                  <FileText size={16} className="text-neutral-500" />
                  {page.title}
                </th>

                {/* Colonna Slug */}
                <td className="px-6 py-4 font-mono text-neutral-500">
                  {page.slug}
                </td>

                {/* Colonna Stato */}
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    page.status === 'Pubblicata' 
                      ? 'bg-green-900/30 text-green-400 border-green-900' 
                      : 'bg-yellow-900/30 text-yellow-500 border-yellow-900'
                  }`}>
                    {page.status}
                  </span>
                </td>

                {/* Colonna Data */}
                <td className="px-6 py-4">
                  {page.lastModified}
                </td>

                {/* Colonna Azioni */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {/* Vedi */}
                    <Link href={page.slug} target="_blank" className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Vedi Pagina">
                        <Eye size={16} />
                    </Link>

                    {/* Modifica */}
                    <button className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 rounded transition-colors" title="Modifica">
                        <Edit size={16} />
                    </button>

                    {/* Elimina */}
                    <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded transition-colors" title="Elimina">
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PageManager;