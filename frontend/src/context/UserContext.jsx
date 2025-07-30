import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);


            if (!parsedUser.profilePicture) {
                parsedUser.profilePicture = "https://i.pravatar.cc/150?img=3";
            }

            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);