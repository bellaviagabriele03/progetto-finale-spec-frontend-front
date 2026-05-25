import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";
import CardWish from "../components/CardWish";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function WishList() {


    const { wishList } = useGlobalContext();

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <h1 className="bg-emerald-600 text-6xl">I TUOI ARTICOLI PREFERITI</h1>
            <div className="ml-25 relative min-h-screen">
                <ParticleBackground />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex p-3 gap-2 flex-wrap flex-col">
                        {wishList.length > 0 && (<>
                            {wishList.map(p => <CardWish key={p.id} obj={p} />)}
                        </>)}
                    </div>

                    {wishList.length <= 0 && (<>
                        <h2 className="bg-gradient-to-r from-emerald-600 to-gray-700 text-center p-10 mt-10 ml-20 mr-20 rounded-2xl text-5xl">LISTA DEI PREFERITI VUOTA !</h2>
                        <div className="text-center">
                            <button
                                onClick={() => {
                                    navigate("/products")
                                }}
                                className="p-3 bg-gradient-to-r from-emerald-600 to-gray-700 text-sky-400 cursor-pointer mt-3 rounded-2xl text-4xl">
                                TORNA ALLA LISTA
                            </button>
                        </div>

                    </>)}
                </div>
            </div>
        </>
    )
}