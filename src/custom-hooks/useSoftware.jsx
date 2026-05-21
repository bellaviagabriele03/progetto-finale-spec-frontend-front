import { useState, useEffect } from "react";



export default function useSoftware() {

    const [softwares, setSoftwares] = useState([]);
    const back = import.meta.env.VITE_BACK;
    const [wishList, setWishList] = useState(() => {
        const saved = localStorage.getItem("wishList");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }, [wishList]);



    useEffect(() => {
        fetch(`${back}/softwares`)
            .then(resp => resp.json())
            .then(data => setSoftwares(data))
            .catch(error => console.error(error))
    }, [])


    function addwishList(id) {
        const software = softwares.find(s => s.id === id)

        setWishList(prev => {
            if (prev.some(s => s.id === id)) return prev;
            return [...prev, software];
        })
    }


    function removeWishList(id) {
        const software = softwares.find(s => s.id === id)
        setWishList(prev => prev.filter(s => s.id !== id))
    }

    const [elemToCompar, setElemToCompar] = useState([]);

    function addCompar(id) {
        const elem = softwares.find(s => s.id === id);
        setElemToCompar(prev => {
            if (prev.length >= 2) return prev;
            if (prev.some(s => s.id === id)) return prev;
            return [...prev, elem];
        });
    }

    function removeCompar(id) {
        setElemToCompar(prev => prev.filter(s => s.id !== id));
    }

    return { addwishList, removeWishList, setSoftwares, setWishList, softwares, wishList, elemToCompar, setElemToCompar, addCompar, removeCompar }


}


