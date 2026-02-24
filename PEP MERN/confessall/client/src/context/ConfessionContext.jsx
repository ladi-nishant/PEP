import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';
import { toast } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { googleLogout } from '@react-oauth/google';

const ConfessionContext = createContext();

export const useConfessions = () => useContext(ConfessionContext);

export const ConfessionProvider = ({ children }) => {
    const [confessions, setConfessions] = useState([]);
    const [loading, setLoading] = useState(true);

    // We need to store the token when user logs in
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setToken(credentialResponse.credential);
        setUser(decoded);
    };

    const logout = () => {
        googleLogout();
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        fetchConfessions();
    }, []);

    const fetchConfessions = async () => {
        try {
            setLoading(true);
            const data = await api.getConfessions();
            setConfessions(data);
        } catch (error) {
            console.error("Failed to fetch", error);
            toast.error("Failed to load confessions");
        } finally {
            setLoading(false);
        }
    };

    const addConfession = async (data, user) => {
        if (!token) {
            toast.error("You must be logged in!");
            return;
        }
        try {
            const newConfession = await api.createConfession({
                ...data,
                // userId: user.sub // No longer needed, backend extracts from token
            }, token);
            setConfessions([newConfession, ...confessions]);
            toast.success("Confession posted!");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post");
            return false;
        }
    };

    const reactToConfession = async (id, type) => {
        // Optimistic update
        const previousConfessions = [...confessions];
        setConfessions(confessions.map(c =>
            c._id === id
                ? { ...c, reactions: { ...c.reactions, [type]: (c.reactions[type] || 0) + 1 } }
                : c
        ));

        try {
            await api.reactToConfession(id, type);
        } catch (error) {
            setConfessions(previousConfessions); // Revert
            toast.error("Failed to react");
        }
    };

    // Verify and Delete
    const removeConfession = async (id, secretCode) => {
        try {
            await api.deleteConfession(id, secretCode);
            setConfessions(confessions.filter(c => c._id !== id));
            toast.success("Confession deleted");
            return true;
        } catch (error) {
            throw error; // Let component handle specific error message display if needed
        }
    };

    // Verify and Update
    const editConfession = async (id, secretCode, newText) => {
        try {
            const updated = await api.updateConfession(id, { secretCode, text: newText });
            setConfessions(confessions.map(c => c._id === id ? updated : c));
            toast.success("Confession updated");
            return true;
        } catch (error) {
            throw error;
        }
    };

    return (
        <ConfessionContext.Provider value={{
            confessions,
            loading,
            addConfession,
            reactToConfession,
            removeConfession,
            editConfession,
            login,
            logout,
            user
        }}>
            {children}
        </ConfessionContext.Provider>
    );
};
