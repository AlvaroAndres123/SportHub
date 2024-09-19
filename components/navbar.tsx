'use client'

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 bg-[#333333] text-white w-full">
            <div className="container mx-auto flex justify-between items-center p-4">
          
                <div className="text-xl font-bold">
                    <Link className="hover:text-[#facc15]" href="/">
                        SportHub
                    </Link>
                </div>

              
                <div className="hidden md:flex gap-6">
                    <Link className="hover:text-[#facc15]" href="/calendario">
                        Calendario
                    </Link>
                    <Link className="hover:text-[#facc15]" href="/rankings">
                        Rankings
                    </Link>
                    <Link className="hover:text-[#facc15]" href="/torneos">
                        Torneos
                    </Link>
                </div>

             
                <div className="hidden md:flex items-center">
                    <Link className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/login">
                        Iniciar Sesión
                    </Link>
                </div>

               
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? "Cerrar" : "Menu"}
                    </button>
                </div>
            </div>

          
            {isOpen && (
                <div className="md:hidden absolute top-full inset-x-0 bg-[#333333] w-full text-white flex flex-col items-center space-y-4 py-4">
                    <Link onClick={toggleMenu} className="hover:text-[#facc15]" href="/calendario">
                        Calendario
                    </Link>
                    <Link onClick={toggleMenu} className="hover:text-[#facc15]" href="/rankings">
                        Rankings
                    </Link>
                    <Link onClick={toggleMenu} className="hover:text-[#facc15]" href="/torneos">
                        Torneos
                    </Link>
                    <Link onClick={toggleMenu} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/login">
                        Iniciar Sesión
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
