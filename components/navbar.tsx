'use client';
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-white w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link className="hover:text-primary" href="/">
            SportHub
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          <Link className="hover:text-primary" href="/calendario">
            Calendario
          </Link>
          <Link className="hover:text-primary" href="/rankings">
            Rankings
          </Link>
          <Link className="hover:text-primary" href="/torneos">
            Torneos
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          {session ? (
            <button onClick={() => signOut()} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/login">
                Iniciar Sesión
              </Link>
              <Link className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/register">
                Crear Cuenta
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-[#333333] w-full text-white flex flex-col items-center space-y-4 py-4">
          <Link onClick={toggleMenu} className="hover:text-primary" href="/calendario">
            Calendario
          </Link>
          <Link onClick={toggleMenu} className="hover:text-primary" href="/rankings">
            Rankings
          </Link>
          <Link onClick={toggleMenu} className="hover:text-primary" href="/torneos">
            Torneos
          </Link>
          {session ? (
            <button onClick={() => { signOut(); toggleMenu(); }} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link onClick={toggleMenu} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/login">
                Iniciar Sesión
              </Link>
              <Link className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/register">
                Crear Cuenta
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
