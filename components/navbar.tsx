'use client';
import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="sticky top-0 z-50 bg-black bg-opacity-90 text-white shadow-xl w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-3xl font-semibold tracking-wide">
          <Link className="hover:text-yellow-400 transition-all duration-300" href="/">
            SportHub
          </Link>
        </div>
        <div className="hidden md:flex gap-6 text-lg">
          <Link className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Calendar">
            <i className="fas fa-calendar-alt mr-2" /> Calendario
          </Link>
          <Link className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Ranking">
            <i className="fas fa-trophy mr-2" /> Rankings
          </Link>
          <Link className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Tournaments">
            <i className="fas fa-cogs mr-2" /> Torneos
          </Link>
        </div>
        <div className="hidden md:flex gap-6 items-center relative">
          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Bienvenido, {session.user?.name}</span>
              <button onClick={toggleDropdown} className="relative">
                <img
                  src={session.user?.image || "/img/default-avatar.jpg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer transform hover:scale-110 transition-transform duration-200"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-xl py-2">
                    <Link href="/pages/player" className="block px-4 py-2 hover:bg-gray-100">Configuración</Link>
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
              <Link className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-all duration-300" href="/pages/login">
                Iniciar Sesión
              </Link>
              <Link className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-all duration-300" href="/pages/register">
                Crear Cuenta
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-3xl`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-gray-800 w-full text-white flex flex-col items-center space-y-4 py-4 shadow-xl">
          <Link onClick={toggleMenu} className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Calendar">
            <i className="fas fa-calendar-alt mr-2" /> Calendario
          </Link>
          <Link onClick={toggleMenu} className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Ranking">
            <i className="fas fa-trophy mr-2" /> Rankings
          </Link>
          <Link onClick={toggleMenu} className="flex items-center hover:text-yellow-400 transition-all duration-300" href="/pages/Functions/Tournaments">
            <i className="fas fa-cogs mr-2" /> Torneos
          </Link>
          {session ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Bienvenido, {session.user?.name}</span>
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer transform hover:scale-110 transition-transform duration-200"
                  onClick={toggleDropdown}
                />
              </div>
              {dropdownOpen && (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link onClick={toggleMenu} href="/configuracion" className="hover:text-yellow-400 transition-all duration-300">
                    <i className="fas fa-cogs mr-2" /> Configuración
                  </Link>
                  <button
                    onClick={() => { signOut(); toggleMenu(); }}
                    className="text-left w-full hover:text-yellow-400 transition-all duration-300"
                  >
                    <i className="fas fa-sign-out-alt mr-2" /> Cerrar Sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link onClick={toggleMenu} className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-all duration-300" href="/pages/login">
                Iniciar Sesión
              </Link>
              <Link onClick={toggleMenu} className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition-all duration-300" href="/pages/register">
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
