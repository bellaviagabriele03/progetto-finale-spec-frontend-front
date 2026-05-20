import {
    House,
    Cpu,
    Star,
    Scale,

} from "lucide-react"
import { NavLink } from "react-router-dom";




export default function Header() {


    const links = [
        { name: "HOME", icon: <House size={40} />, path: "/" },
        { name: "PRODUCTS", icon: <Cpu size={40} />, path: "/products" },
        { name: "WISH-LIST", icon: <Star size={40} />, path: "/wishlist" },
        { name: "COMPARATOR", icon: <Scale size={40} />, path: "/comparator" },
    ]
    return (
        <header className="bg-gradient-to-b from-emerald-600 to-gray-700 text-lime-400 fixed top-0 left-0 bottom-0 w-25">
            <nav className="flex flex-col justify-around items-center h-full">
                {links.map((l, i) => {
                    return (
                        <div
                            key={i}
                            className="hover:text-yellow-400"><NavLink to={l.path}>{l.icon}</NavLink></div>)
                })}
            </nav>
        </header>
    )
}