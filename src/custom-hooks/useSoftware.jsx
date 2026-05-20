import { useState, useEffect } from "react";



export default function useSoftware() {

    const [softwares, setSoftwares] = useState([]);
    const back = import.meta.env.VITE_BACK;
    const [wishList, setWishList] = useState([])

    


    useEffect(() => {
        fetch(`${back}/softwares`)
            .then(resp => resp.json())
            .then(data => setSoftwares(data))
            .catch(error => console.error(error))
    }, [])


    function addwishList(id) {
        const software = softwares.find(s => s.id === id)

        setWishList(prev => [...prev, software])

    }


    function removeWishList(id) {
        const software = softwares.find(s => s.id === id)
        setWishList(prev => prev.filter(s => s.id !== id))

    }



    return { addwishList, removeWishList, setSoftwares, setWishList, softwares, wishList, }


}


