import { useGlobalContext } from "../context/GlobalContext"
import { Star } from "lucide-react";
export default function Card({ obj }) {


    const { addwishList } = useGlobalContext();
    

    return (
        <>
            <div className="bg-gradient-to-r from-emerald-600 to-gray-700 rounded-2xl p-4 relative z-10">
                <div>
                    <h2>
                        {obj.title}
                    </h2>
                    <span>
                        Categoria: {obj.category}
                    </span>
                </div>

                <button
                    onClick={() => {
                        addwishList(obj.id)
                    }}
                    className="mt-3 text-yellow-300 hover:text-red-700 cursor-pointer ">
                    <Star size={30} />
                </button>
            </div>
        </>
    )
}