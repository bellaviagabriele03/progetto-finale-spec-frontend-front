import { useGlobalContext } from "../context/GlobalContext"
import { Star, Eye, Scale } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useToastContext } from "../context/ToastContext";
export default memo(function Card({ obj }) {

    const { addwishList, addCompar, wishList, removeWishList, elemToCompar, removeCompar } = useGlobalContext();

    const { showToast } = useToastContext();

    const isfav = wishList.map(p => p.id).includes(obj.id)
    const isCompar = elemToCompar.map(p => p.id).includes(obj.id)
    const comparfull = elemToCompar.length >= 2
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
                            if (!isfav) {
                                addwishList(obj.id)
                                showToast(`${obj.title} -- aggiunto ai preferiti !`,
                                    {
                                        variant: "wishlistAdd",
                                        link: "/wishlist"
                                    }
                                )
                            } else {
                                removeWishList(obj.id)
                                showToast(`${obj.title} -- rimosso dai preferiti`,
                                    {
                                        variant: "remove",
                                    }
                                )
                            }


                        }}
                        className="mt-3 text-yellow-300 hover:text-red-700 cursor-pointer ">
                        <Star size={40} />
                    </button>
                    <NavLink
                        to={`/products/${obj.id}`}
                        className="mt-3 ml-4 text-sky-400 cursor-pointer hover:text-red-700">
                        <Eye size={40} />
                    </NavLink>
                    <button
                        onClick={() => {
                            if (!isCompar) {
                                if (comparfull) {
                                    showToast("comparatore pieno, solo 2 prodotti alla volta !", { variant: "remove", link: "/comparator" })
                                } else {
                                    addCompar(obj.id)
                                    showToast(`${obj.title} -- aggiunto al comparatore !`, { variant: "comparator", link: "/comparator" })
                                }
                            } else {
                                removeCompar(obj.id)
                                showToast(`${obj.title} -- rimosso dal comparatore !`, { variant: "remove" })
                            }
                        }}
                        className="mt-3 ml-4 text-pink-700 cursor-pointer hover:text-red-700">
                        <Scale size={40} />
                    </button>
                </div>

            </div>
        </>
    )
})