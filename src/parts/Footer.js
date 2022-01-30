import React from "react";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4">
      <div className="flex flex-justify-between flex-wrap">
        <div className="w-full sm:w-1/3">
          <h6 className="text-white">Tentang Kami</h6>
          <ul className="mt-4">
            <li className="mt-2">
              <Link
                to="https://rsjhbsaanin.sumbarprov.go.id"
                target="_blank"
                rel="noopener noreferrer"
                alt="RSJ Prof. HB Saanin Padang"
                className="text-blue-300 hover:text-green-800 hover:underline"
              >
                RSJ Prof HB. Saanin Padang
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-green-800 hover:underline"
              >
                Unit IT RSJ Prof HB. Saanin Padang
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/3">
          <h6 className="text-white">Alamat</h6>
          <p className="mt-4 text-blue-300 leading-loose">
            Jl. Raya Gadut, Limau Manis Selatan,
            <br /> Kecamatan Pauh, Kota Padang,
            <br />
            Sumatera Barat 25157
          </p>
        </div>
      </div>
      <div className="border-t pt-8 mt-8 border-blue-300 text-center">
        <p className="text-blue-300">
          2022 Copyright Unit IT | Bidang Pelayanan. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
