import React from "react";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";

import { Link, withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import users from "constants/api/users";

function Sidebar({ match, history }) {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const getNavLinkClass = (path) => {
    return match.path === path
      ? "active text-white bg-green-800"
      : "text-orange-400";
  };
  const USERS = useSelector((state) => state.users);

  function logout() {
    users.logout().then(() => {
      localStorage.removeItem("SIDEPRESI:token");
      history.push("/login");
    });
  }

  const sidebarStyle = {
    width: 280,
    left: window.innerWidth < 640 && !toggleMenu ? "-280px" : 0,
  };
  return (
    <>
      <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div>
      <aside
        className="transition-all duration-300 bg-green-900 max-h-screen h-screen overflow-y-auto min-h-full fixed sm:relative z-50"
        style={sidebarStyle}
      >
        {toggleMenu && (
          <div
            className="overlay"
            onClick={() => setToggleMenu((prev) => !prev)}
          ></div>
        )}
        <div
          className="max-h-screen h-screen fixed bg-green-900 flex flex-col content-between z-50"
          style={{ width: 280 }}
        >
          <div className="flex flex-col text-center mt-8">
            <div className="border border-orange-400 rounded-full mx-auto p-2 inline-flex  mb-3">
              <div className="rounded-full overflow-hidden">
                {USERS?.avatar ? (
                  <img
                    className="object-cover w-24 h-24"
                    src={USERS?.avatar}
                    alt={USERS?.name}
                  />
                ) : (
                  <DefaultUser className="fill-orange-400 w-24 h-24"></DefaultUser>
                )}
              </div>
            </div>

            <h6 className="text-white text-xl">
              {USERS?.name ?? "Nama Pengguna"}
            </h6>
            <span className="text-orange-400 text-sm">
              {USERS?.profession ?? "Profesi"}
            </span>
          </div>

          <ul className="main-menu mt-12">
            <li>
              <Link
                className={[
                  "nav-link relative text-orange-400 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/"),
                ].join("")}
                to="/"
              >
                Data Saya
              </Link>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "nav-link relative text-orange-400 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                ].join("")}
                href={`${process.env.REACT_APP_FRONTPAGE_URL}`}
              >
                Portal Informasi
              </a>
            </li>
            <li>
              <Link
                className={[
                  "nav-link relative text-orange-400 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/personalidentity"),
                ].join("")}
                to="/personalidentity"
              >
                Identitas Keperawatan
              </Link>
            </li>
            <li>
              <Link
                className={[
                  "nav-link relative text-orange-400 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                  getNavLinkClass("/settings"),
                ].join("")}
                to="/settings"
              >
                Pengaturan
              </Link>
            </li>
          </ul>
          <div className="my-auto"></div>
          <ul className="main-menu mt-12">
            <li>
              <button
                className={[
                  "nav-link relative text-orange-400 flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                ].join("")}
                onClick={logout}
              >
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default withRouter(Sidebar);
