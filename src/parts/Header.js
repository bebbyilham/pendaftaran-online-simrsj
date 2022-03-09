import React from "react";
import propTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";
import { ReactComponent as Logo } from "assets/images/logo.svg";

function Header({ onLight, location }) {
  const linkColor = onLight ? "text-white sm:text-gray-900" : "text-white";

  const [toggleMenu, setToggleMenu] = React.useState(false);
  // eslint-disable-next-line
  const linkCTA =
    location.pathname.indexOf("/login") > -1 ? `/register` : `/login`;
  // eslint-disable-next-line
  const textCTA = location.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";

  const classNameLogo = onLight
    ? toggleMenu
      ? "on-dark"
      : "on-light"
    : "on-light";
  return (
    <header
      className={[
        "flex justify-between items-center",
        toggleMenu ? "fixed w-full -mx-4 px-4" : "",
      ].join(" ")}
    >
      <div style={{ height: 54 }} className="z-50">
        <Link to="/home">
          <Logo className={classNameLogo}></Logo>
        </Link>
      </div>
      <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div>

      <ul
        className={[
          "transition-all duration-200 items-center fixed inset-0 bg-blue-500 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible",
          toggleMenu ? "opacity-100 visible z-20" : "opacity-0 invisible",
        ].join(" ")}
      >
        <li className="leading-10">
          <a
            rel="noopener noreferrer"
            className={[
              linkColor,
              "hover:text-green-900 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
            // href={`${process.env.REACT_APP_FRONTPAGE_URL}`}
            href={`/home`}
          >
            Halaman Utama
          </a>
        </li>
        {/* <li className="leading-10">
          <Link
            to="/syaratketentuan"
            className={[
              linkColor,
              "hover:text-green-900 text-lg px-6 py-3 my-4 sm:my-0 font-medium",
            ].join(" ")}
          >
            Syarat & Ketentuan
          </Link>
        </li> */}

        {/* <li className="leading-10">
          <Link
            to={linkCTA}
            className="btn-login bg-green-800 hover:bg-green-900 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 my-4 sm:my-0 font-medium ml-6"
          >
            {textCTA}
          </Link>
        </li> */}
      </ul>
    </header>
  );
}

Header.prototype = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
