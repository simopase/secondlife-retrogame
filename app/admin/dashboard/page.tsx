import DashboardCard from "@/app/components/DashboardCard";
import { Edit, ExternalLink } from "lucide-react"; // Assicurati di avere lucide-react installato

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- KPI CARDS --- */}
        <DashboardCard title="Incasso totale" icon="euro">
          <p className="text-3xl text-white font-bold mt-6">€ 1.240,00</p>
          <p className="text-sm text-green-500 mt-2">+12% rispetto a ieri</p>
        </DashboardCard>
        
        <DashboardCard title="Ordini" icon="package">
          <p className="text-3xl text-white font-bold mt-6">TOTALE: 15</p>
          <p className="text-sm text-neutral-400 mt-2">Da spedire: 4</p>
        </DashboardCard>
        
        <DashboardCard title="Nuovi clienti" icon="person-standing">
          <p className="text-3xl text-white font-bold mt-6">12</p>
          <p className="text-sm text-neutral-400 mt-2">Questa settimana</p>
        </DashboardCard>

        {/* --- COLONNA GRANDE (2/3): GESTIONE PAGINE --- */}
        <div className="md:col-span-2">
          {/* Nota: Assicurati che DashboardCard accetti 'className' e lo passi al div contenitore tramite cn() o interpolazione stringhe */}
          <DashboardCard title="Gestione pagine"> 
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left text-neutral-400">
                <thead className="text-xs text-neutral-500 uppercase bg-neutral-900/50 border-b border-neutral-700">
                  <tr>
                    <th className="px-4 py-3">Nome Pagina</th>
                    <th className="px-4 py-3">URL</th>
                    <th className="px-4 py-3">Stato</th>
                    <th className="px-4 py-3 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  <tr className="hover:bg-neutral-700/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">Home Page</td>
                    <td className="px-4 py-3 font-mono text-blue-400">/home</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded border border-green-500/20">
                        Pubblicata
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1.5 rounded text-xs transition-colors">
                        <Edit size={14} /> Modifica
                      </button>
                    </td>
                  </tr>
                  {/* Riga aggiuntiva di esempio */}
                  <tr className="hover:bg-neutral-700/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">Chi Siamo</td>
                    <td className="px-4 py-3 font-mono text-blue-400">/about</td>
                    <td className="px-4 py-3">
                      <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded border border-green-500/20">
                        Pubblicata
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1.5 rounded text-xs transition-colors">
                        <Edit size={14} /> Modifica
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>

        {/* --- COLONNA LATERALE (1/3): AVVISI MAGAZZINO --- */}
        <DashboardCard title="Avvisi di magazzino" icon="alert-triangle">
          <div className="mt-6 space-y-4">
            
            <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
              <span className="text-neutral-300">Pokémon Rosso (GB)</span>
              <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold border border-red-500/20">
                1 pz. rimasto
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-neutral-700 pb-2">
              <span className="text-neutral-300">Pokémon Verde (GB)</span>
              <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold border border-red-500/20">
                2 pz. rimasti
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-neutral-300">Pokémon Blu (GB)</span>
              <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs font-bold border border-yellow-500/20">
                5 pz. rimasti
              </span>
            </div>

            <button className="w-full mt-4 text-xs text-neutral-400 hover:text-white underline decoration-neutral-600 hover:decoration-white underline-offset-4 transition-all">
              Vedi tutto il magazzino
            </button>
          </div>
        </DashboardCard>

      </div>
    </>
  );
};

export default Dashboard;