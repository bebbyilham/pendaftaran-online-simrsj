import React from "react";

import { Link } from "react-router-dom";

export default function ServerError() {
  return (
    <section className="h-screen flex flex-col items-center">
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/illustration-notfound.jpg`}
        alt="server error"
      />
      <h1 className="text-3xl text-gray-900 mt-12">Opps! Server error</h1>
      <p className="text-lg text-gray-600 mt-4 mb-8 md:w-1/12 lg:w-3/12 xl:w-2/12 mx-auto text-center">
        Coba lagi nantid
      </p>
      <Link
        className="btn-login bg-green-800 hover:bg-green-900 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3"
        to="/"
      >
        Kembali ke halaman utama
      </Link>
    </section>
  );
}
