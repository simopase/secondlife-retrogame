import Navbar from "./components/Navbar";
import { ShoppingCart, User } from 'lucide-react';
import SwiperComponent from "./components/SwiperComponent";
import CatalogueComponent from "./components/CatalogueComponent";
import { catalogue } from "./utils/lib/db";
import Footer from "./components/Footer";
import { createClient } from "./utils/supabase/server";




export default async function Home() {
  const supabase = await createClient()
  const { data: slides } = await supabase.from("slider").select().order('order', { ascending: true });  

  console.log(slides)

  return <>
    <div className="border-b-2 border-primary-red sticky top-0 z-50 bg-[rgba(18,18,18,0.95)]">
      <Navbar className="container mx-auto flex justify-between items-center ">
        <ul className="font-monserrat text-lg uppercase font-bold">
          <li className="inline-block mx-4">Shop</li>
          <li className="inline-block mx-4">Chi siamo</li>
          <li className="inline-block mx-4">Contatti</li>
        </ul>
        <div className="flex space-x-4">
          <ShoppingCart className="text-primary-yellow" />
          <User className="text-primary-yellow" />
        </div>
      </Navbar>
    </div>
    <SwiperComponent slides={slides ?? []} />
    <CatalogueComponent catalogue={catalogue} />
    <Footer />
  </>

}
