import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ConfessionCard from './components/ConfessionCard';
import ConfessionForm from './components/ConfessionForm';
import SecretCodeModal from './components/SecretCodeModal';
import { useConfessions } from './context/ConfessionContext';
import { Toaster, toast } from 'react-hot-toast';

function App() {
    const { confessions, loading, addConfession, reactToConfession, removeConfession, editConfession, user } = useConfessions();

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedConfession, setSelectedConfession] = useState(null);

    const handlePost = async (data) => {
        await addConfession(data);
    };

    const openModal = (confession, action) => {
        setSelectedConfession(confession);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleSecretSubmit = async (secretCode) => {
        if (!selectedConfession) return;

        try {
            if (modalAction === 'delete') {
                await removeConfession(selectedConfession._id, secretCode);
            } else if (modalAction === 'edit') {
                const newText = prompt("Enter new text for your confession:", selectedConfession.text);
                if (newText && newText !== selectedConfession.text) {
                    await editConfession(selectedConfession._id, secretCode, newText);
                }
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid secret code");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <Toaster position="top-right" />

            <main className="max-w-3xl mx-auto px-4 mt-8">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                        Anonymous Confession Wall
                    </h1>
                    <p className="text-gray-500">Share your secrets, securely and anonymously.</p>
                </div>

                {user ? (
                    <ConfessionForm onSubmit={handlePost} />
                ) : (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
                        <p className="text-blue-700">Please log in to post a confession.</p>
                    </div>
                )}

                <div className="space-y-6">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : confessions.length === 0 ? (
                        <p className="text-center text-gray-400 py-10">No confessions yet. Be the first!</p>
                    ) : (
                        confessions.map(confession => (
                            <ConfessionCard
                                key={confession._id}
                                confession={confession}
                                onReact={reactToConfession}
                                onEdit={(c) => openModal(c, 'edit')}
                                onDelete={(c) => openModal(c, 'delete')}
                            />
                        ))
                    )}
                </div>
            </main>

            <SecretCodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSecretSubmit}
                action={modalAction}
            />
        </div>
    );
}

export default App;
