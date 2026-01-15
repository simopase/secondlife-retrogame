import Accordion from "@/app/components/Accordion"
import Image from "next/image"

export default async function PageEditor({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>
    <div className="flex justify-between items-center mb-6">
      <h5 className="text-2xl font-bold tracking-tight text-white leading-8">
        Modifica: {slug}
      </h5>
    </div>
    <div className="shadow-lg shadow-amber-300 p-6 flex flex-col gap-10">
      <Accordion title="Slider Principale">
        <div className="flex flex-col gap-8">
          <div className="rounded-lg border border-neutral-700 p-6">
            <Image src="/slider/slide1.jpg" width={50} height={50} alt="img_alt"></Image>
          </div>
          <div className="rounded-lg border border-neutral-700 p-6">
            <Image src="/slider/slide1.jpg" width={50} height={50} alt="img_alt"></Image>
          </div>
          <div className="rounded-lg border border-neutral-700 p-6">
            <Image src="/slider/slide1.jpg" width={50} height={50} alt="img_alt"></Image>
          </div>
        </div>

      </Accordion>

      {/* --- ACCORDION 2: PRODOTTI --- */}
      <Accordion title="Prodotti in Evidenza">
        <div className="text-neutral-400">
          <p className="mb-2">Seleziona i prodotti da mostrare in home:</p>

        </div>
      </Accordion>
    </div>
  </div>
}