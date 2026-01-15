'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-neutral-700 rounded-lg bg-neutral-900 mb-4 overflow-hidden">
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
            >
                <span className="font-semibold text-lg uppercase tracking-wide">
                    {title}
                </span>
                
                {/* Icona che ruota se aperto */}
                <ChevronDown 
                    size={20} 
                    className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>

            {/* Contenuto (visibile solo se isOpen è true) */}
            {isOpen && (
                <div className="p-5 border-t border-neutral-700 bg-neutral-900">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;