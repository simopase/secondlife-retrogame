import { DynamicIcon, type IconName } from 'lucide-react/dynamic'; // 1. Importa il tipo

type DashboardCardType = {
    title: string,
    icon?: IconName,
    children?: React.ReactNode
}

const DashboardCard = ({ title, icon, children }: DashboardCardType) => {
    return (
        <div className="bg-neutral-800 min-h-20 p-3 border border-neutral-700 rounded-md shadow-xs hover:border-neutral-400">
            <div className="flex content-between items-center gap-10">
                {icon &&
                    <div className="p-2 bg-neutral-700 rounded-md">
                        <DynamicIcon name={icon} size={20} />
                    </div>
                }
                <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8 mb-0 uppercase">{title}</h5>
            </div>
            {children}
        </div>
    );
}
export default DashboardCard;