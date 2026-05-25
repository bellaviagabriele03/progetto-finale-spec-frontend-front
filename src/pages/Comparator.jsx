import { useState, useEffect, memo } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";
import { Plus, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const COMPARISON_FIELDS = [
    { label: "Categoria", key: "category" },
    { label: "Prezzo", key: "price", suffix: " €" },
    { label: "Anno d'uscita", key: "release_year" },
    { label: "Descrizione", key: "description" },
];

export default function Comparator() {
    const { elemToCompar, removeCompar } = useGlobalContext();
    const back = import.meta.env.VITE_BACK;

    const [detailedProducts, setDetailedProducts] = useState([]);

    useEffect(() => {
        window.scroll(top)
        if (elemToCompar.length === 0) {
            setDetailedProducts([]);
            return;
        }
        Promise.all(
            elemToCompar.map(elem =>
                fetch(`${back}/softwares/${elem.id}`)
                    .then(resp => resp.json())
                    .then(data => data.software)
                    .catch((error) => console.error(error))
            )
        ).then(setDetailedProducts);
    }, [elemToCompar]);

    const slot1 = elemToCompar[0] || null;
    const slot2 = elemToCompar[1] || null;
    const detail1 = detailedProducts[0] || null;
    const detail2 = detailedProducts[1] || null;

    return (
        <>
            <h1 className="bg-emerald-600 text-black text-center p-4 text-3xl font-bold">
                Compara i prodotti che vuoi!
            </h1>
            <div className="ml-25 relative min-h-screen p-6">
                <ParticleBackground />

                <div className="relative z-10 flex gap-4 justify-center items-stretch">
                    <SlotCard product={slot1} onRemove={removeCompar} slotNumber={1} />

                    <div className="flex items-center justify-center shrink-0">
                        <div className="text-emerald-400 text-2xl font-bold bg-gray-800 border-2 border-emerald-600 rounded-full w-14 h-14 flex items-center justify-center">
                            VS
                        </div>
                    </div>

                    <SlotCard product={slot2} onRemove={removeCompar} slotNumber={2} />
                </div>

                {slot1 && slot2 && detail1 && detail2 && (
                    <div className="relative z-10 mt-8">
                        <ComparisonTable p1={detail1} p2={detail2} />
                    </div>
                )}

                {!slot1 && !slot2 && (
                    <p className="relative z-10 text-center bg-gradient-to-r from-emerald-600 to-gray-700 mt-8 text-lg rounded-3xl p-3">
                        Vai nella <NavLink to="/products" className="border-b">lista prodotti</NavLink>  e clicca l'icona <span className="text-pink-500">bilancia</span> su due prodotti per confrontarli.
                    </p>
                    
                )}
                {!slot2 && (
                    <p className={!slot1 ? "hidden" : "relative z-10 text-center bg-gradient-to-r from-emerald-600 to-gray-700 mt-8 text-lg rounded-3xl"}>
                        aggiungi un altro prodotto per confrontarli !
                    </p>
                )}
            </div>
        </>
    );
}

const SlotCard = memo(({ product, onRemove, slotNumber }) => {
    if (!product) {
        return (
            <div className="flex-1 max-w-sm border-2 border-dashed border-emerald-500 rounded-2xl flex flex-col items-center justify-center min-h-64 text-emerald-400 bg-gray-900/40">
                <Plus size={56} className="mb-3 opacity-50" />
                <p className="text-lg opacity-60">Slot {slotNumber}</p>
                <p className="text-sm opacity-40 mt-1">Aggiungi un prodotto dalla lista</p>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-sm bg-gradient-to-b from-emerald-700 to-gray-800 rounded-2xl p-4 relative">
            <button
                onClick={() => onRemove(product.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 cursor-pointer z-10"
            >
                <X size={22} />
            </button>
            {product.img && (
                <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-44 object-cover rounded-xl mb-3"
                />
            )}
            <h2 className="text-xl font-bold text-white">{product.title}</h2>
            <span className="text-emerald-300">{product.category}</span>
        </div>
    );
})

const ComparisonTable = memo(({ p1, p2 }) => {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-emerald-600 rounded-2xl overflow-hidden">
            <h3 className="text-center text-emerald-400 text-xl font-bold py-4 border-b border-emerald-700">
                Confronto Dettagliato
            </h3>
            <table className="w-full">
                <thead>
                    <tr className="bg-gradient-to-r from-emerald-700 to-gray-700">
                        <th className="py-3 px-4 text-left text-white">Caratteristica</th>
                        <th className="py-3 px-4 text-center text-white">{p1.title}</th>
                        <th className="py-3 px-4 text-center text-white">{p2.title}</th>
                    </tr>
                </thead>
                <tbody>
                    {COMPARISON_FIELDS.map((field, i) => (
                        <tr key={field.key} className={i % 2 === 0 ? "bg-gray-800/50" : "bg-gray-900/50"}>
                            <td className="py-3 px-4 text-emerald-400 font-semibold">{field.label}</td>
                            <td className="py-3 px-4 text-center text-white">
                                {p1[field.key]}{field.suffix ?? ""}
                            </td>
                            <td className="py-3 px-4 text-center text-white">
                                {p2[field.key]}{field.suffix ?? ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
})
