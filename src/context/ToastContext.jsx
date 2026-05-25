import { useContext, createContext, useState } from "react";
import GlobalContextProvider from "./GlobalContext";
import { useNavigate } from "react-router-dom";


const ToastContext = createContext();

export default function ToastContextProvider({ children }) {
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (message, options = {}) => {
        setToast({
            message,
            variant: options.variant || "wish",
            link: options.link || null,
            linkLabel: options.linkLabel || null,
        });
        setTimeout(() => {
            setToast(null);
        }, 4000)

    }

    const variantMap = {
        wishlistAdd: {
            bg: "bg-gradient-to-r from-emerald-600 to-gray-700",
            border: "border-yellow-300/60",
            glow: "shadow-[0_0_22px_rgba(253,224,71,0.35)]",
            text: "text-yellow-300",
            textGlow: "drop-shadow-[0_0_6px_rgba(253,224,71,0.45)]",
            link: "text-yellow-300 hover:text-yellow-400",
            linkGlow: "drop-shadow-[0_0_6px_rgba(253,224,71,0.45)]",
        },
        remove: {
            bg: "bg-red-600",
            border: "border-red-800/60",
            glow: "shadow-[0_0_22px_rgba(220,38,38,0.35)]",
            text: "text-black",
            textGlow: "",
            link: "text-black hover:text-gray-800",
            linkGlow: "",
        },
        comparator: {
            bg: "bg-white",
            border: "border-pink-700/60",
            glow: "shadow-[0_0_22px_rgba(190,24,93,0.35)]",
            text: "text-pink-700",
            textGlow: "drop-shadow-[0_0_6px_rgba(190,24,93,0.45)]",
            link: "text-pink-700 hover:text-pink-900",
            linkGlow: "drop-shadow-[0_0_6px_rgba(190,24,93,0.45)]",
        }
    }



    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}


            {toast && (
                <div className="fixed bottom-5 right-5 z-50">
                    {(() => {
                        const v = variantMap[toast.variant] || variantMap.wishlistAdd;

                        return (
                            <div className={[
                                "flex items-center gap-4 rounded-2xl p-5 min-w-[320px]",
                                v.bg,
                                "border",
                                v.border,
                                v.glow,
                            ].join(" ")}>

                                <div className="min-w-0">
                                    <p
                                        className={[
                                            "text-sm font-extrabold",
                                            v.text,
                                            v.textGlow,
                                            "truncate",
                                        ].join(" ")}
                                    >
                                        {toast.message.toUpperCase()}
                                    </p>

                                    {toast.link && (
                                        <button
                                            onClick={() => navigate(toast.link)}
                                            className={[
                                                "mt-1 text-sm font-semibold",
                                                v.link,
                                                v.linkGlow,
                                                "hover:underline hover:underline-offset-4",
                                            ].join(" ")}
                                        >
                                            {toast.linkLabel || "Apri"}
                                        </button>
                                    )}
                                </div>


                            </div>
                        )
                    })()}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export function useToastContext() {
    return useContext(ToastContext)
}