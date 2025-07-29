import { CriptoCoin } from "../models/CriptoCoin";

interface CriptoListProps {
    data: CriptoCoin[];
}

const CriptoList: React.FC<CriptoListProps> = ({ data }) => {
    if (!data) return <div>No data available</div>;

    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((item) => (
            <li key={item.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-cyan-800 shadow-sm">
                <div className="flex flex-col w-full items-center justify-between space-x-6 p-6">
                    <h3 className="truncate text-sm font-medium text-white">{item.name} ({item.id})</h3>
                    <h3 className="truncate text-sm font-medium text-white">${item.quote.USD.price.toFixed(2)}</h3>
                </div>
            </li>
          ))}
        </ul>
    )
}

export default CriptoList;