'use server';

import { createClient } from '../utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { SwiperProps, Slide } from 'types/components';

// Helper per trasformare la stringa Base64 in un file binario (Buffer)
const decodeBase64 = (dataString: string) => {
  // Cerca il pattern: data:image/jpeg;base64,.....
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    return null; 
  }

  return {
    type: matches[1], // es. 'image/jpeg'
    buffer: Buffer.from(matches[2], 'base64') // I dati veri e propri
  };
};

export async function saveSlidesToDb({ slides }: SwiperProps) {
  const supabase = await createClient();

  console.log("🚀 Inizio processo di salvataggio server...");

  try {
    // 1. ELABORIAMO LE SLIDE (Upload immagini)
    // Usiamo Promise.all per processarle tutte in parallelo (più veloce)
    const processedSlides = await Promise.all(slides.map(async (slide, index) => {
      
      let finalImageUrl = slide.image; // Di base teniamo quello che c'è (URL o Base64)

      // CONTROLLO: È una nuova immagine? (Inizia con "data:image"?)
      if (slide.image && slide.image.startsWith('data:image')) {
        
        const decoded = decodeBase64(slide.image);

        if (decoded) {
          // A. Generiamo nome file unico
          const fileExt = decoded.type.split('/')[1]; // es. 'jpeg'
          const fileName = `${uuidv4()}.${fileExt}`; // es. 'a1b2-c3d4.jpeg'
          
          // B. Carichiamo su Supabase Storage
          const { error: uploadError } = await supabase
            .storage
            .from('hero-slider') // <--- IL TUO BUCKET
            .upload(fileName, decoded.buffer, {
              contentType: decoded.type,
              upsert: true
            });

          if (uploadError) {
            console.error("Errore upload immagine:", uploadError);
            throw new Error("Impossibile caricare l'immagine nello storage");
          }

          // C. Otteniamo l'URL Pubblico
          const { data: publicUrlData } = supabase
            .storage
            .from('hero-slider')
            .getPublicUrl(fileName);

          finalImageUrl = publicUrlData.publicUrl; // Sostituiamo il Base64 col Link
        }
      }

      // Ritorniamo l'oggetto pulito da inserire nel DB
      return {
        // Mappiamo i campi in base alle colonne del tuo DB (viste nello screenshot)
        order: index + 1,           // Usiamo la posizione nell'array per l'ordine
        title: slide.title,         // È un oggetto JSON {text, primaryWord, secondaryWord}
        image: finalImageUrl,       // Ora è un URL https://...
        btnText: slide.btnText      // Nome colonna DB
        // created_at è automatico
      };
    }));

    // 2. SALVATAGGIO NEL DATABASE
    // Strategia: Cancelliamo tutto e reinseriamo. È il modo più sicuro per gestire
    // l'ordine e le rimozioni senza logiche complesse di ID.

    // A. Cancella tutto (usando un trucco: id diverso da '000... uuid nullo')
    const { error: deleteError } = await supabase
      .from('slider')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); 

    if (deleteError) {
      console.error("Errore pulizia DB:", deleteError);
      throw new Error("Errore durante la pulizia delle vecchie slide");
    }

    // B. Inserisci le nuove slide
    const { error: insertError } = await supabase
      .from('slider')
      .insert(processedSlides);

    if (insertError) {
      console.error("Errore insert DB:", insertError);
      throw new Error("Errore durante il salvataggio nel database");
    }

    // 3. AGGIORNA LA CACHE
    // Dice a Next.js di rigenerare la Home Page così l'utente vede subito le modifiche
    revalidatePath('/');

    console.log("✅ Salvataggio completato con successo!");
    return { success: true };

  } catch (error: any) {
    console.error("❌ Errore Server Action:", error);
    return { success: false, error: error.message };
  }
}