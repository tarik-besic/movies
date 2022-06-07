import { createContext, useEffect, useRef, useState } from "react";
import FavoritesApi from "../api/favorites";

const Context = createContext({
    session_id: null,
    logout: () => { },
    favorites: [],
    select: 1,
    setSelect: () => { },
    option: "movies",
    setOption: () => { },
    data: null,
    setData: () => { },
    inputRef: null
}
)
export function ContextProvider({ children }) {

    const [session_id, setSession_id] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [select, setSelect] = useState(1);
    const [option, setOption] = useState("movies");
    const [data, setData] = useState([])
    const inputRef = useRef(
        {
            input: null,
            lastValue: ""
        }
    )

    useEffect(() => {
        //TODO get current session
        const id = localStorage.getItem('session_id')
        if (!id) {
            alert("Ouf nema sessije")
        }
        setSession_id(id)
    }, []);

    useEffect(() => {
        console.log("Favorties changed:", favorites);
    }, [favorites])

    useEffect(() => {
        if (session_id) {
            console.log("getam favorites", session_id);
            FavoritesApi.getFavorites('movies', session_id).then((res) => {
                setFavorites((favorites) => {
                    const newData = [...favorites]
                    const arr2 = res.data.results.map((item) => {
                        return item.id
                    })
                    Array.prototype.push.apply(newData, arr2);
                    return newData
                })
            })
            FavoritesApi.getFavorites('tv', session_id).then((res) => {
                setFavorites((favorites) => {
                    const newData = [...favorites]
                    const arr2 = res.data.results.map((item) => {
                        return item.id
                    })
                    Array.prototype.push.apply(newData, arr2);
                    return newData
                })
            })
        }

    }, [session_id])

    const logout = () => {
        console.log("ide logout");
        setSession_id(localStorage.removeItem('session_id'))
        setFavorites([])
        if (option == "favorites") {
            setOption("movies")
        }
    }

    return <Context.Provider value={{
        session_id,
        logout,
        favorites,
        select,
        setSelect,
        option,
        setOption,
        data,
        setData,
        inputRef
    }}>{children}</Context.Provider>;
}
export default Context;