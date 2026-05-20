
import { useMemo, useState } from "react";
import Card from "../components/Card";
import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";
import { Search } from "lucide-react";


export default function Products() {

    const { softwares } = useGlobalContext();
    const [query, setQuery] = useState("");
    console.log(softwares)
    const filterSoftware = useMemo(() => {
        if (!softwares) return []
        return [...softwares].filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    }, [softwares, query])

    return (
        <>
            <h1 className="bg-emerald-600 text-center text-6xl">Lista dei Prodotti</h1>
            <div className="ml-25 relative min-h-screen">
                <ParticleBackground />
                <div>
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="p-3 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
                            <input
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="bg-gradient-to-r from-emerald-600 to-gray-700 p-2 pl-9 rounded-3xl w-full"
                                type="text"
                                placeholder="Cerca per titolo..." />
                        </div>
                    </form>
                </div>
                <div className="" style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex p-3 gap-2 flex-wrap flex-col">
                        {filterSoftware.map(s => <Card key={s.id} obj={s} />)}
                    </div>
                </div>
            </div>
        </>
    )
}