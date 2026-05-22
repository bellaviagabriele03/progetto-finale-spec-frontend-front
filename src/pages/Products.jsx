
import { useCallback, useMemo, useState } from "react";
import Card from "../components/Card";
import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";
import { Search } from "lucide-react";

const CATEGORY_ORDER = { "accessories": 0, "console": 1, "videogiochi": 2 }

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}



export default function Products() {
    console.log("Rendering...")
    const { softwares } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [selectQuery, setSelectQuery] = useState("");
    const [show, setshow] = useState(false)
    const [sortOrder, setSortOrder] = useState(1)
    const [sortBy, setSortBy] = useState("videogiochi")

    function handleSort(string) {
        if (sortBy === string) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(string)
            setSortOrder(1);
        }
    }

    const queryDebounce = useCallback(debounce(setQuery, 600), [])


    const filterSoftware = useMemo(() => {
        if (!softwares) return []
        return [...softwares]
            .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
            .filter((p) => selectQuery !== "" ? p.category.toLowerCase() === selectQuery.toLocaleLowerCase() ? true : false : [...softwares])
            .sort((a, b) => {
                if (sortBy === "title") {
                    return a.title.localeCompare(b.title) * sortOrder;
                }
                if (sortBy === "category") {
                    return (CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category] * sortOrder);
                }
                return 0
            })
    }, [softwares, query, selectQuery, sortBy, sortOrder])





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
                                onChange={e => queryDebounce(e.target.value)}
                                className="bg-gradient-to-r from-emerald-600 to-gray-700 p-4 pl-9 rounded-3xl w-full"
                                type="text"
                                placeholder="Cerca per titolo..." />
                        </div>
                        <div>
                            <button
                                onClick={() => setshow(!show)}
                                className="bg-gradient-to-r from-emerald-600 to-gray-700 p-4 rounded-3xl w-full mt-3 cursor-pointer text-sky-400">
                                {show ? "NASCONDI" : "MOSTRA ALTRE OPZIONI"}
                            </button>
                        </div>
                        {show && (<>
                            <div>
                                <select
                                    className="bg-gradient-to-r from-emerald-600 to-gray-700 p-4 rounded-3xl w-full mt-3"
                                    value={selectQuery}
                                    onChange={e => setSelectQuery(e.target.value)}
                                >
                                    <option value="">Filtra per Categoria</option>
                                    <option value="videogiochi">Videogiochi</option>
                                    <option value="console">Console</option>
                                    <option value="accessories">Accessori</option>
                                </select>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => handleSort("title")}
                                    className="bg-gradient-to-r from-emerald-500 to-gray-700 p-4 rounded-3xl w-full mt-3 cursor-pointer"
                                >
                                    Ordine alfabetico per nome prodotto {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                                </button>

                                <button
                                    onClick={() => handleSort("category")}
                                    className="bg-gradient-to-r from-emerald-500 to-gray-700 p-4 rounded-3xl w-full mt-3 cursor-pointer"
                                >
                                    Ordine alfabetico per Categoria {sortBy === "category" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                                </button>
                            </div>
                        </>)}


                        {(selectQuery !== "" || query !== "" || sortBy === "title" || sortBy === "category") && (
                            <div>
                                <button
                                    onClick={() => {
                                        setSelectQuery("")
                                        setQuery("")
                                        setshow(false)
                                        setSortOrder(1)
                                        setSortBy("videogiochi")
                                    }}
                                    className="bg-gradient-to-r from-emerald-600 to-gray-700 p-4 rounded-3xl w-full mt-3 text-sky-400 cursor-pointer">
                                    Rimuovi filtri
                                </button>
                            </div>
                        )}
                    </form>

                </div>
                <div className="" style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex p-3 gap-2 flex-wrap flex-col">
                        {filterSoftware.length > 0 && filterSoftware.map(s => <Card key={s.id} obj={s} />)}
                        {filterSoftware.length <= 0 && (<><p className="bg-gradient-to-r from-emerald-600 to-gray-700 p-4 rounded-3xl w-full mt-3">Nessun prodotto trovato</p></>)}
                    </div>
                </div>
            </div>
        </>
    )
}