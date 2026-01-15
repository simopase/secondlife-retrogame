import { Card as CardType } from './CatalogueComponent';
import Button from './Button';

type CardProps = {
    card: CardType;
}

const ProductCard = ({ card }: CardProps) => {
    
    return (
        <div className="group relative flex flex-col bg-[#1E1E1E] rounded-[15px] overflow-hidden border border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-primary-red hover:shadow-[0_0_15px_rgba(230,0,0,0.6)]">
            <div className="h-55 w-full bg-[#252525] p-6 flex justify-center items-center">
                <img
                    src={card.image}
                    alt={card.title}
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-6 text-center flex flex-col grow">
                <h3 className="text-white font-bold text-lg mb-1 truncate">
                    {card.title}
                </h3>
                <p className="text-[#B0B0B0] text-xs uppercase tracking-widest font-semibold mb-4">
                    {card.subtitle}
                </p>
                <div className="mt-auto w-full">
                    <p className="text-primary-yellow text-2xl font-black mb-6 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                        €{card.price.toFixed(2)}
                    </p>
                    <Button className="mt-2" size="s" type="primary-glow">{card.button.text}</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;