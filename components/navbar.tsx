'use client';
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-white w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link className="hover:text-primary" href="/">
            SportHub
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          <Link className="hover:text-primary" href="/pages/Functions/Calendar">
            Calendario
          </Link>
          <Link className="hover:text-primary" href="/pages/Functions/Ranking">
            Rankings
          </Link>
          <Link className="hover:text-primary" href="/pages/Functions/Tournaments">
            Torneos
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center relative">
          {session ? (
            <div className="flex items-center gap-2">
              <span>Bienvenido, {session.user?.name}</span>
              <button onClick={toggleDropdown} className="relative focus:outline-none">
                <img
                  src={session.user?.image || "/img/default-avatar.jpg"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                    <Link href="/pages/player" className="block px-4 py-2 hover:bg-gray-100">
                      Configuración
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </button>
            </div>
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
          <Link onClick={toggleMenu} className="hover:text-primary" href="/pages/Functions/Calendar">
            Calendario
          </Link>
          <Link onClick={toggleMenu} className="hover:text-primary" href="/pages/Functions/Ranking">
            Rankings
          </Link>
          <Link onClick={toggleMenu} className="hover:text-primary" href="/pages/Functions/Tournaments">
            Torneos
          </Link>
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <span>Bienvenido, {session.user?.name}</span>
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
              {dropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link onClick={toggleMenu} href="/configuracion" className="hover:text-primary">
                    Configuración
                  </Link>
                  <button
                    onClick={() => { signOut(); toggleMenu(); }}
                    className="text-left w-full hover:text-primary"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link onClick={toggleMenu} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/login">
                Iniciar Sesión
              </Link>
              <Link onClick={toggleMenu} className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300" href="/pages/register">
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
