import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FaUserSecret } from 'react-icons/fa';
import { useConfessions } from '../context/ConfessionContext';

const Navbar = () => {
    const { login, logout, user } = useConfessions();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <FaUserSecret className="text-primary text-3xl mr-2" />
                        <span className="text-xl font-bold text-gray-800 tracking-tight">ConfessAll</span>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-gray-200" />
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <GoogleLogin
                                onSuccess={login}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
