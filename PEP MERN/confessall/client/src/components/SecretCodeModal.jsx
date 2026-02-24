import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecretCodeModal = ({ isOpen, onClose, onSubmit, action }) => {
    const [secretCode, setSecretCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(secretCode);
        setSecretCode('');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md"
                >
                    <h3 className="text-xl font-bold mb-4 text-gray-800 capitalize">
                        {action} Confession
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Enter the secret code you used when creating this confession to verify ownership.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4 outline-none"
                            placeholder="Enter Secret Code"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            autoFocus
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Verify & {action}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SecretCodeModal;
