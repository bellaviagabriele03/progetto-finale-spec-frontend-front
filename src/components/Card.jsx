import { useGlobalContext } from "../context/GlobalContext"
import { Star, Eye } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
export default memo(function Card({ obj }) {


    const { addwishList } = useGlobalContext();





    return (
        <>
            <div className="bg-gradient-to-r from-emerald-600 to-gray-700 rounded-2xl p-4 relative z-10">
                <div>
                    <h2 className="text-3xl">
                        {obj.title}
                    </h2>
                    <span className="text-2xl">
                        Categoria: {obj.category}
                    </span>
                </div>
                <div className="flex">
                    <button
                        onClick={() => {
                            addwishList(obj.id)
                        }}
                        className="mt-3 text-yellow-300 hover:text-red-700 cursor-pointer ">
                        <Star size={40} />
                    </button>
                    <NavLink
                        to={`/products/${obj.id}`}
                        className="mt-3 ml-4 text-sky-400 cursor-pointer hover:text-red-700">
                        <Eye size={40} />
                    </NavLink>
                </div>

            </div>
        </>
    )
})