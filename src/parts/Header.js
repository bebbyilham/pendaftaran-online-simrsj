import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import surveiKepuasanImg from "assets/images/survei_kepuasan.png";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Header({ onLight, location }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  useEffect(() => {
    if (toggleMenu || showSurveyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggleMenu, showSurveyModal]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSurveyModal(false);
      }
    };
    if (showSurveyModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSurveyModal]);

  const linkColor = onLight
    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
    : "text-white hover:text-white hover:bg-white hover:bg-opacity-20 font-semibold";

  const surveyModal = showSurveyModal && (
    <div
      style={{ zIndex: 99999 }}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={() => setShowSurveyModal(false)}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-2 sm:p-4 z-10 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowSurveyModal(false)}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 p-2 bg-white text-gray-700 hover:text-gray-900 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none transition-all duration-150 cursor-pointer border border-gray-200"
          aria-label="Tutup"
        >
          <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="w-full flex justify-center items-center overflow-hidden rounded-xl">
          <img
            src={surveiKepuasanImg}
            alt="Survei Kepuasan Masyarakat"
            className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );

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
        <button
          type="button"
          onClick={() => {
            setToggleMenu(false);
            setShowSurveyModal(true);
          }}
          className="text-blue-600 font-extrabold text-base sm:text-lg px-5 py-4 rounded-2xl bg-white hover:bg-blue-50 active:bg-blue-100 shadow-md transition-all duration-150 block text-center w-full cursor-pointer"
        >
          Survei Kepuasan
        </button>
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
        <button
          type="button"
          onClick={() => setShowSurveyModal(true)}
          className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer focus:outline-none ${linkColor}`}
        >
          Survei Kepuasan
        </button>
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

      {/* Portals rendered directly to document.body */}
      {toggleMenu && ReactDOM.createPortal(mobileDrawer, document.body)}
      {showSurveyModal && ReactDOM.createPortal(surveyModal, document.body)}
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
