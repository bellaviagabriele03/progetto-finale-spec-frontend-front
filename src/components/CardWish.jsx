import { useGlobalContext } from "../context/GlobalContext"
import { Star, Trash } from "lucide-react";
import { memo } from "react";
export default memo(function CardWish({ obj }) {


    const { addwishList, removeWishList } = useGlobalContext();


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
                        removeWishList(obj.id)
                    }}
                    className="mt-3  text-red-700 cursor-pointer hover:text-gray-700">
                    <Trash size={30} />
                </button>
            </div>
        </>
    )
})