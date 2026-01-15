import Card from "./Card";

export type Card = {
    title: string;
    subtitle: string;
    image: string;
    price: number;
    button: {
        text: string;
        type: 'primary' | 'secondary' | 'primary-glow';
    }
}

type CatalogueProps = {
    catalogue: Card[];
}


const CatalogueComponent = ({ catalogue }: CatalogueProps) => {
    return <div className="bg-[radial-gradient(circle_at_top_right,#2a0a0a,#121212)]">
        <div className="container mx-auto py-20">
            <h2 className="text-4xl font-black mb-10 uppercase title-retro">Ultimi Arrivi</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10">
                {catalogue.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
        </div>
    </div>


};

export default CatalogueComponent;