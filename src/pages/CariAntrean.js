import React, { useEffect } from "react";

import Header from "parts/Header";
import Footer from "parts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CariAntreanForm from "parts/CariAntreanForm";

export default function Pendaftaran({ history }) {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <section className="container mx-auto pt-10 px-4 guest-page relative z-10">
        <Header onLight></Header>
        <ToastContainer />
      </section>
      <section className="container mx-auto pt-10 px-4">
        <CariAntreanForm></CariAntreanForm>
      </section>
      <section className="mt-24 bg-blue-500 py-12">
        <Footer></Footer>
      </section>
    </>
  );
}
