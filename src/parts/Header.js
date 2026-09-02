import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Header({ onLight, location }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggleMenu]);

  const linkColor = onLight
    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    : "text-white hover:text-white hover:bg-white hover:bg-opacity-20 font-semibold";

  const mobileDrawer = toggleMenu && (
    <div
      style={{ zIndex: 99999, backgroundColor: "#3b82f6" }}
      className="fixed inset-0 min-h-screen w-full flex flex-col p-6 sm:hidden"
    >
      {/* Top Bar inside Drawer */}
      <div className="flex justify-between items-center pb-6 border-b border-blue-400">
        <Link to="/home" onClick={() => setToggleMenu(false)}>
          <Logo className="on-dark" style={{ height: 44, width: "auto" }} />
        </Link>
        <button
          type="button"
          onClick={() => setToggleMenu(false)}
          className="p-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:outline-none transition-all duration-150 cursor-pointer"
          aria-label="Tutup Menu"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links inside Drawer */}
      <div className="flex-1 flex flex-col justify-center space-y-4 py-8">
        <a
          href="https://rsjhbsaanin.sumbarprov.go.id/jadwal-dokter"
          onClick={() => setToggleMenu(false)}
          className="text-blue-600 font-extrabold text-base sm:text-lg px-5 py-4 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 shadow-md transition-all duration-150 block text-center"
        >
          Info Jadwal Dokter
        </a>
        <a
          href="https://rsjhbsaanin.sumbarprov.go.id/info-tempat-tidur"
          onClick={() => setToggleMenu(false)}
          className="text-blue-600 font-extrabold text-base sm:text-lg px-5 py-4 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 shadow-md transition-all duration-150 block text-center"
        >
          Info Kamar
        </a>
        <Link
          to="/cariantrean"
          onClick={() => setToggleMenu(false)}
          className="text-blue-600 font-extrabold text-base sm:text-lg px-5 py-4 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 shadow-md transition-all duration-150 block text-center"
        >
          Cari Antrean
        </Link>
        <Link
          to="/home"
          onClick={() => setToggleMenu(false)}
          className="text-blue-600 font-extrabold text-base sm:text-lg px-5 py-4 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 shadow-md transition-all duration-150 block text-center"
        >
          Halaman Utama
        </Link>
      </div>

      {/* Bottom Footer inside Drawer */}
      <div className="text-center text-xs text-blue-100 pt-4 border-t border-blue-400 font-medium">
        RS Jiwa Prof. HB Saanin Padang
      </div>
    </div>
  );

  return (
    <header className="relative w-full flex justify-between items-center py-2 z-30">
      {/* Brand Logo */}
      <div className="flex items-center z-30">
        <Link to="/home" className="flex items-center">
          <Logo className={onLight ? "on-light" : "on-dark"} style={{ height: 50, width: "auto" }} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center space-x-1 md:space-x-2">
        <a
          href="https://rsjhbsaanin.sumbarprov.go.id/jadwal-dokter"
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${linkColor}`}
        >
          Info Jadwal Dokter
        </a>
        <a
          href="https://rsjhbsaanin.sumbarprov.go.id/info-tempat-tidur"
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${linkColor}`}
        >
          Info Kamar
        </a>
        <Link
          to="/cariantrean"
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${linkColor}`}
        >
          Cari Antrean
        </Link>
        <Link
          to="/home"
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${linkColor}`}
        >
          Halaman Utama
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="flex sm:hidden z-30">
        <button
          type="button"
          onClick={() => setToggleMenu(true)}
          className={`p-2 rounded-xl transition-all duration-150 focus:outline-none ${
            onLight
              ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
              : "text-white bg-white bg-opacity-20 hover:bg-opacity-30"
          }`}
          aria-label="Buka Menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Portal rendered directly to document.body */}
      {toggleMenu && ReactDOM.createPortal(mobileDrawer, document.body)}
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
