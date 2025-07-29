export default function CriptoHeaderUpdateCount({ timer }: { timer: number }) {
    return (
        <>
            <h1 className="mx-auto text-5xl font-semibold tracking-tight text-pretty text-white">Cripto Prices</h1>
            <p className="text-lg font-medium text-pretty text-gray-400 sm:text-xl/8 mb-4">Next update {timer}s</p>
        </>
    )
}