import React from "react";

import Sidebar from "parts/Sidebar";

function Emptystate() {
  return (
    <section className="flex h-screen items-center relative z-50 bg-white">
      <div className="w-full sm:w-5/12 text-center py-12 mx-auto">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/illustration-joined.jpg`}
          alt="success join data"
        />
        <h1 className="text-3xl text-gray-900 mt-12">Selamat datang di</h1>
        <p className="text-lg text-gray-600 mt-4 mb-8 mx-auto text-center">
          Dashboard Sidepresi
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn-login bg-green-800 hover:bg-green-900 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3"
          href={`${process.REACT_APP_FRONTPAGE_URL}/library`}
        >
          Entri data
        </a>
      </div>
    </section>
  );
}

export default function MyData() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <Emptystate></Emptystate>
        </div>
      </main>
    </div>
  );
}
