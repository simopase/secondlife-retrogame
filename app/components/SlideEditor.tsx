'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, Plus, ArrowUp, ArrowDown, Save, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { saveSlidesToDb } from '@/app/actions/saveSlides'; 
import { SwiperProps } from 'types/components';

// SCHEMA DEL FORM
const slideSchema = z.object({
    slides: z.array(z.object({
        title: z.string().min(1, "Il titolo è obbligatorio"),
        primaryWord: z.string().optional(),
        secondaryWord: z.string().optional(),
        btnText: z.string().min(1, "Testo bottone obbligatorio"),
        image: z.string().optional()
    }))
});

type FormValues = z.infer<typeof slideSchema>;

export default function SlideEditor({ slides }: SwiperProps) {
    const [isSaving, setIsSaving] = useState(false);

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(slideSchema),
        defaultValues: {
            slides: slides?.map(s => ({
                title: s.title.text,
                primaryWord: s.title.primaryWord || "",
                secondaryWord: s.title.secondaryWord || "",
                btnText: s.btnText,
                btnLink: "#",
                image: s.image
            }))
        }
    });

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "slides"
    });

    // --- 2. GESTIONE IMMAGINE CON COMPRESSIONE ---
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];

        if (file) {
            // A. VALIDAZIONE TIPO
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert("Errore: Solo immagini JPG, PNG o WEBP.");
                e.target.value = "";
                return;
            }

            // B. VALIDAZIONE DIMENSIONE INIZIALE (Alzato a 10MB perché poi comprimiamo)
            if (file.size > 10 * 1024 * 1024) {
                alert("L'immagine originale è troppo grande (Max 10MB).");
                e.target.value = "";
                return;
            }

            try {
                // C. COMPRESSIONE (Target: 0.5MB)
                const options = {
                    maxSizeMB: 0.5,          // Comprime fino a ~500KB
                    maxWidthOrHeight: 1920,  // Ridimensiona a Full HD
                    useWebWorker: true
                };

                console.log(`Originale: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
                const compressedFile = await imageCompression(file, options);
                console.log(`Compresso: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

                // D. CONVERSIONE IN BASE64 E SALVATAGGIO NELLO STATO
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setValue(`slides.${index}.image`, base64String); // Aggiorna il form
                };
                reader.readAsDataURL(compressedFile);

            } catch (error) {
                console.error("Errore compressione:", error);
                alert("Impossibile comprimere l'immagine.");
            }
        }
    };

    // --- 3. SUBMIT REALE AL SERVER ---
    const onSubmit = async (data: FormValues) => {
        setIsSaving(true);

        // Prepariamo il pacchetto dati
        const payload = {
            slides: data.slides.map(s => ({
                title: {
                    text: s.title,
                    primaryWord: s.primaryWord,
                    secondaryWord: s.secondaryWord
                },
                image: s.image || "", // Passiamo il Base64 (nuovo) o l'URL (vecchio)
                btnText: s.btnText,
            }))
        };

        try {
            console.log("Invio al server in corso...");

            // CHIAMATA ALLA SERVER ACTION
            const result = await saveSlidesToDb(payload);

            if (result.success) {
                alert("✅ Salvataggio completato!");
                // Ricarichiamo la pagina per vedere le immagini definitive (URL)
                window.location.reload();
            } else {
                alert("❌ Errore: " + result.error);
            }

        } catch (error) {
            console.error(error);
            alert("Errore di connessione al server.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-neutral-700 pb-4">
                <div><h2 className="text-xl font-bold text-white uppercase">Gestione Slide</h2></div>
                <button disabled={isSaving} type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                    <Save size={18} /> {isSaving ? 'Salvataggio...' : 'Salva'}
                </button>
            </div>
            {/* Lista Slide */}
            <div className="space-y-4">
                {fields.map((field, index) => {
                    const currentImage = watch(`slides.${index}.image`);

                    return (
                        <div key={field.id} className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 relative group hover:border-neutral-500 transition-colors">

                            <div className="flex justify-between items-center mb-4 border-b border-neutral-700/50 pb-2">
                                <span className="text-neutral-400 font-mono text-sm font-bold">SLIDE #{index + 1}</span>
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} className="p-1 text-neutral-500 hover:text-white disabled:opacity-30"><ArrowUp size={16} /></button>
                                    <button type="button" onClick={() => move(index, index + 1)} disabled={index === fields.length - 1} className="p-1 text-neutral-500 hover:text-white disabled:opacity-30"><ArrowDown size={16} /></button>
                                    <button type="button" onClick={() => remove(index)} className="p-1 text-red-500 hover:bg-red-900/20 rounded ml-2"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                {/* --- ANTEPRIMA IMMAGINE CLICCABILE --- */}
                                <div className="md:col-span-1">
                                    <label className="aspect-video bg-neutral-900 rounded border border-dashed border-neutral-600 flex flex-col gap-2 items-center justify-center text-neutral-500 hover:border-neutral-400 hover:text-white cursor-pointer transition-colors relative overflow-hidden group-image">

                                        {currentImage ? (
                                            <img
                                                src={currentImage}
                                                alt="Preview"
                                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
                                            />
                                        ) : null}

                                        <div className="z-10 flex flex-col items-center drop-shadow-md">
                                            <ImageIcon size={24} />
                                            <span className="text-xs uppercase font-bold mt-2">
                                                {currentImage ? 'Cambia Foto' : 'Carica Foto'}
                                            </span>
                                        </div>

                                        <input
                                            type="file"
                                            accept=".jpg, .jpeg, .png, .webp"
                                            className="hidden"
                                            onChange={(e) => handleImageChange(e, index)}
                                        />
                                    </label>
                                </div>

                                {/* Campi Input */}
                                <div className="md:col-span-3 space-y-4">
                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Titolo</label>
                                        <input {...register(`slides.${index}.title`)} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-white focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Es. IL TUO NUOVO VECCHIO GIOCO" />
                                        {errors.slides?.[index]?.title && <span className="text-red-500 text-xs">{errors.slides[index]?.title?.message}</span>}
                                    </div>

                                    <div className="flex gap-4 p-3 bg-neutral-900/50 rounded-lg border border-neutral-800">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-red-400 uppercase font-bold mb-1 block">Parola Evidenziata 1 (Red)</label>
                                            <input {...register(`slides.${index}.primaryWord`)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-sm text-red-400 focus:outline-none focus:border-red-500 transition-colors" placeholder="Es. NUOVO" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[10px] text-yellow-400 uppercase font-bold mb-1 block">Parola Evidenziata 2 (Gold)</label>
                                            <input {...register(`slides.${index}.secondaryWord`)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-sm text-yellow-400 focus:outline-none focus:border-yellow-500 transition-colors" placeholder="Es. GIOCO" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Testo Bottone</label>
                                            <input {...register(`slides.${index}.btnText`)} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-sm text-white focus:outline-none focus:border-yellow-500 transition-colors" />
                                        </div>
                                        {/* <div className="flex-1">
                                            <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Link</label>
                                            <input {...register(`slides.${index}.btnLink`)} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-sm text-blue-400 font-mono focus:outline-none focus:border-yellow-500 transition-colors" placeholder="#" />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <button type="button" onClick={() => append({ title: "NUOVA SLIDE", btnText: "SCOPRI",/*  btnLink: "#" */ })} className="w-full py-4 border-2 border-dashed border-neutral-700 rounded-xl text-neutral-400 hover:text-white hover:border-neutral-500 hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 uppercase font-bold tracking-wider">
                <Plus size={20} /> Aggiungi Nuova Slide
            </button>

        </form>
    );
}