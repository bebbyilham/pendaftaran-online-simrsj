import React from "react";
import { Link } from "react-router-dom";
// import { Link, withRouter } from "react-router-dom";

import { ReactComponent as Pic } from "assets/images/pic.svg";

export default function Hero() {
  // const [state, setstate] = useState(() => "");

  // function submit() {
  //   window.open(
  //     `${process.env.NEXT_PUBLIC_NURSEPAGE_URL}/register?email=${state}`
  //   );timvwr
  // }
  return (
    <div className="flex justify-between items-center">
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <h1 className="text-5xl text-white mb-5 font-semibold">
          <span className="text-white mb-5"></span>Selamat Datang Di{" "}
          <br className="hidden md:block" />
          <span className="text-green-800 mb-5">
            Pendaftaran Online Rawat Jalan
          </span>
        </h1>
        <p className="text-white font-light text-lg mb-8">
          Rumah Sakit Jiwa Prof. HB Saanin Padang
        </p>
        {/* <form onSubmit={submit} className="flex">
          <input
            type="text"
            onChange={(event) => setstate(event.target.value)}
            className="bg-white focus:outline-none border-0 px-4 md:px-6 py-3 w-full md:w-1/2"
            value={state}
            placeholder="Your email addres"
          />
          <button className="bg-green-500 hover:bg-green-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-4 md:px-6 py-3 whitespace-no-wrap">
            Daftar Sekarang
          </button>
        </form> */}
        <Link
          to="/pendaftaranlama"
          className="bg-green-800 hover:bg-green-900 transition-all duration-200 rounded-md focus:outline-none shadow-inner text-white px-4 md:px-6 py-3 whitespace-no-wrap mr-2"
        >
          Pasien Mandiri
        </Link>
        <Link
          to="/pendaftaranlamabpjs"
          className="bg-green-800 hover:bg-green-900 transition-all duration-200 rounded-md focus:outline-none shadow-inner text-white px-4 md:px-6 py-3 whitespace-no-wrap mb-8 mr-2"
        >
          Pasien BPJS
        </Link>
        <Link
          to="/pendaftaranbarubooking"
          className="bg-green-800 hover:bg-green-900 transition-all duration-200 rounded-md focus:outline-none shadow-inner text-white px-4 md:px-6 py-3 whitespace-no-wrap mb-8"
        >
          Pasien Baru
        </Link>
        <div className="w-full mt-6">
          <a
            rel="noopener noreferrer"
            className={[
              "text-white sm:text-white hover:text-green-900 text-lg px-4 py-3 my-8 sm:my-0 font-medium",
            ].join(" ")}
            // href={`${process.env.REACT_APP_FRONTPAGE_URL}`}
            href={`/cariantrean`}
          >
            <span>Cari Antrean</span>
          </a>
        </div>
      </div>
      <div className="hidden w-1/2 md:flex justify-end pt-24 ">
        <div className="relative" style={{ width: 600, height: 440 }}>
          <div className="absolute w-full h-full -mb-8 -ml-2">
            <div className="absolute w-full h-full -mb-8 -ml-2">
              <Pic></Pic>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
