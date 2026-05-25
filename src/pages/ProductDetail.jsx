import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { use, useEffect, useState } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { CornerUpLeft, CornerUpRight } from "lucide-react";
export default function ProductDetail() {

    const { id } = useParams();
    const back = import.meta.env.VITE_BACK
    const [oneSoftware, setOneSoftware] = useState([])
    const navigate = useNavigate();




    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`${back}/softwares/${Number(id)}`)
            .then(resp => resp.json())
            .then(data => setOneSoftware(data.software))
    }, [id])

    return (
        <>
            <h1 className="bg-emerald-600 text-center ">{oneSoftware.title}</h1>
            <div className="ml-25 relative min-h-screen p-4">
                <ParticleBackground />
                <div className="bg-gradient-to-r from-emerald-600 to-gray-700 p-3 relative rounded-4xl flex flex-col items-center">
                    <img className="rounded-3xl w-100 mb-3" src={oneSoftware.img} alt={oneSoftware.title} />
                    <div>
                        <h3 className="text-4xl">
                            Categoria Prodotto: <span>{oneSoftware.category}</span>
                        </h3>
                        <p className="text-2xl mt-3">
                            {oneSoftware.description}
                        </p>
                        <div className="mt-3 flex flex-col">
                            <span className="text-2xl">Anno d'uscita: {oneSoftware.release_year}</span>
                            <span className="text-2xl">Prezzo: <span className="text-3xl">{oneSoftware.price}</span> €</span>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full justify-around p-4 items-center">
                        <div>
                            <NavLink
                                to={`/products/${Number(id) === 1 ? 1 : Number(id) - 1}`} className="text-center text-yellow-400 hover:text-red-700"><CornerUpLeft /> BACK</NavLink>
                        </div>
                        <div>
                            <NavLink to="/products" className="text-center text-2xl text-sky-400 p-3 border rounded-2xl hover:bg-sky-400 hover:text-yellow-400">TORNA ALLA LISTA</NavLink>
                        </div>
                        <div>
                            <NavLink
                                to={`/products/${Number(id) === 12 ? 12 : Number(id) + 1}`}
                                className="text-center text-yellow-400 hover:text-red-700"><CornerUpRight /> NEXT</NavLink>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}