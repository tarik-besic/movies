import { createContext, useEffect, useState, useContext } from "react";
import FavoritesApi from "../api/favorites";

const Context = createContext({
    session_id: null,
    logout: () => { }
}
)
export function ContextProvider({ children }) {

    const [session_id, setSession_id] = useState(null)
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        //TODO get current session
        const id = localStorage.getItem('session_id')
        if (!id) {
            alert("Ouf nema sessije")
        }
        setSession_id(id)
    }, []);

    useEffect(() => {

        if (session_id) {
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
        setSession_id(localStorage.removeItem('session_id'))
        setFavorites([])
    }

    return <Context.Provider value={{ session_id, logout, favorites }}>{children}</Context.Provider>;
}
export default Context;