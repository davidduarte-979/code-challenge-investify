import { useState } from "react";
import { CriptoCoin } from "../models/CriptoCoin";
import { Button } from "./Button";
import { useEffect } from "react";

interface CriptoOrderFormProps {
    data: CriptoCoin[];
}

const CriptoOrderForm: React.FC<CriptoOrderFormProps> = ({ data }) => {
    const [usdAmount, setUsdAmount] = useState("");
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [error, setError] = useState("");

    // Set default selectedSymbol when data changes
    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedSymbol(data[0].symbol);
        }
    }, [data]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Only allow up to 2 decimal places
        if (value.includes(".")) {
            const [intPart, decPart] = value.split(".");
            if (decPart.length > 2) {
                value = intPart + "." + decPart.slice(0, 2);
            }
        }
        setUsdAmount(value);
        setError(""); // Clear error on change
    };

    const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSymbol(e.target.value);
    };

    const handleBuy = () => {
        const amount = parseFloat(usdAmount);
        if (isNaN(amount) || amount <= 0 || amount > 5000) {
            setError("Amount must be greater than 0 and less than or equal to 5000.");
            return;
        }
        setError("");
        const userOrder = {
            amount: Number(usdAmount),
            symbol: selectedSymbol
        };
        console.log("User Order: ----------->", userOrder);
    };

    return (
        <>
            <div className='flex flex-wrap gap-4 w-full items-center justify-center mb-4'>
                <div className='flex items-center gap-4'>
                    <label className="text-sm/6 font-medium text-white">Buy</label>
                    <div className="flex items-center rounded-md px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
                        <input
                            id="buy"
                            type="number"
                            name="buy"
                            min="0"
                            step="0.01"
                            inputMode="decimal"
                            placeholder="0.00"
                            aria-describedby="buy-currency"
                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            value={usdAmount}
                            onChange={handleAmountChange} />
                        <div id="buy-currency" className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">USD</div>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <label className="text-sm/6 font-medium text-white">Of</label>
                    <div className="grid grid-cols-1">
                        <select
                            id="criptoSymbol"
                            name="criptoSymbol"
                            className="col-start-1 row-start-1 w-[200px] appearance-none rounded-md py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                            value={selectedSymbol}
                            onChange={handleSymbolChange}>
                            {data.map((coin) => (
                                <option className="bg-gray-800" key={coin.id} value={coin.symbol}>
                                    {coin.name} ({coin.symbol})
                                </option>
                            ))}
                        </select>

                        <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="col-start-1 row-start-1 pointer-events-none mr-2 size-5 self-center justify-self-end text-gray-500">
                            <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <Button onClick={handleBuy}>Buy</Button>
            </div>
            {error && (
                <div className="text-red-500 text-center mt-2">{error}</div>
            )}
        </>
    )
}

export default CriptoOrderForm;