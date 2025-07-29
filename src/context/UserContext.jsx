import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
<<<<<<< HEAD
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

=======

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // İlk yüklemede localStorage'dan kullanıcıyı al
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
<<<<<<< HEAD
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {!loading && children}
=======
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
        </UserContext.Provider>
    );
};

<<<<<<< HEAD
export const useUser = () => useContext(UserContext);
=======
export const useUser = () => useContext(UserContext);
>>>>>>> ac03ff2292459be05d0e9afe03b22e3ade267ae3
