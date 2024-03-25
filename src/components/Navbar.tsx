import React from 'react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter();

    return (
        <nav className="w-full py-4 text-right shadow-md">
            <button onClick={() => router.back()} className="text-indigo-600 font-semibold mx-6 px-4 py-2 rounded-lg bg-white border-2 border-indigo-600 shadow-md hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                Back
            </button>
        </nav>
    );
};

export default NavBar;