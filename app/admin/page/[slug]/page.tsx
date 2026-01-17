import Accordion from "@/app/components/Accordion"
import SlideEditor from "@/app/components/SlideEditor";
import { createClient } from "@/app/utils/supabase/server";
import { Slide } from 'types/components';

export default async function PageEditor({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supabase = await createClient()
  let currentSlides: Slide[] = [];

  if (slug == "home") {
    const { data: slides } = await supabase.from("slider").select().order('order', { ascending: true });
    currentSlides = slides ?? []
  }



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h5 className="text-2xl font-bold tracking-tight text-white leading-8">
          Modifica: {slug}
        </h5>
      </div>

      <div className="p-6 flex flex-col gap-10 bg-neutral-900/50 rounded-xl">

        <Accordion title="Slider Principale" defaultOpen={true}>
          <SlideEditor slides={currentSlides} />
        </Accordion>
        <Accordion title="Prodotti in Evidenza">
          <div className="text-neutral-400">
            <p className="mb-2">Seleziona i prodotti da mostrare in home:</p>
          </div>
        </Accordion>

      </div>
    </div>
  )
}