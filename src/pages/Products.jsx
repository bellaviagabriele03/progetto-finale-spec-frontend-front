
import Card from "../components/Card";
import ParticleBackground from "../components/ParticleBackground";
import { useGlobalContext } from "../context/GlobalContext";

export default function Products() {

    const { softwares } = useGlobalContext();


    return (
        <>
            <h1 className="bg-emerald-600 text-black text-center">Lista dei Prodotti</h1>
            <div className="ml-25 relative min-h-screen">
                <ParticleBackground />
                <div className="" style={{ position: "relative", zIndex: 1 }}>
                    <div className="flex p-3 gap-2 flex-wrap flex-col">
                        {softwares && (<>
                            {softwares.map(s => <Card key={s.id} obj={s} />)}
                        </>)}
                    </div>
                </div>
            </div>
        </>
    )
}