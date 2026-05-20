import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";
import CardWish from "../components/CardWish";
export default function WishList() {


    const { wishList } = useGlobalContext();



    return (
        <>
            <h1 className="bg-emerald-600 text-black">I TUOI ARTICOLI PREFERITI</h1>
            <div className="ml-25 relative min-h-screen">
                <ParticleBackground />
                <div className="bg-blue-400" style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex p-3 gap-2 flex-wrap flex-col">
                        {wishList.length > 0 && (<>
                            {wishList.map(p => <CardWish key={p.id} obj={p} />)}
                        </>)}
                    </div>

                    {wishList.length <= 0 && (<>
                        <h2 className="bg-gradient-to-r from-emerald-600 to-gray-700 text-center p-10 mt-10">LISTA DEI PREFERITI VUOTA !</h2>
                    </>)}
                </div>
            </div>
        </>
    )
}