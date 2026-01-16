import Accordion from "@/app/components/Accordion"
import { slides } from "@/app/utils/lib/db";
import SlideEditor from "@/app/components/SlideEditor"; // <--- 1. Importa il componente client

export default async function PageEditor({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  // Immagina che 'slides' venga caricato qui dal DB in base allo slug
  const currentSlides = slides; 

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-2xl font-bold tracking-tight text-white leading-8">
            Modifica: {slug}
          </h5>
        </div>
        
        <div className="p-6 flex flex-col gap-10 bg-neutral-900/50 rounded-xl">
          
          {/* --- ACCORDION 1: EDITOR SLIDER --- */}
          <Accordion title="Slider Principale" defaultOpen={true}>
            {/* 2. Passi i dati al componente Client */}
            <SlideEditor initialSlides={currentSlides}/>
          </Accordion>

          {/* --- ACCORDION 2: PRODOTTI --- */}
          <Accordion title="Prodotti in Evidenza">
            <div className="text-neutral-400">
              <p className="mb-2">Seleziona i prodotti da mostrare in home:</p>
              {/* Qui in futuro metterai un altro componente client: <ProductsSelector /> */}
            </div>
          </Accordion>
          
        </div>
    </div>
  )
}