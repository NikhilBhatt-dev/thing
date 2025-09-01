import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUserData } from "../assets/assets";
import { dummyChats } from '../assets/assets'; // Adjust path as needed






const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedchat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const fetchUser = async () => {
        setUser(dummyUserData)
    }




    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(dummyChats);
    }, []);


    //select the first chat
    const FetchUserChats = async () => {
         setChats(dummyChats); //  filter user-specific chats
        setSelectedchat(dummyChats[0]);
        
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        if (user) {
            FetchUserChats()
        }
        else {
            setChats([])
            setChats([null])
        }
    }, [user])

    useEffect(() => {
        fetchUser()

    }, [])

    const value = {
        navigate, user, setUser, fetchUser, chats, setChats, selectedChat, setSelectedchat, theme ,setTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)





