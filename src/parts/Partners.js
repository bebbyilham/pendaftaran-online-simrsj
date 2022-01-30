import React from "react";
import Sumbar from "assets/images/logo-sumbar.svg";
import Hbs from "assets/images/logo-hbs.svg";

export default function Partners() {
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="w-full sm:w-1/6 mb-8 md:mb-0">
        <img
          src={Sumbar}
          alt="logo provinsi sumbar"
          className="mx-auto"
        />
      </div>
      <div className="w-full sm:w-1/6 mb-8 md:mb-0">
        <img
          src={Hbs}
          alt="logo rsj hb saanin padang"
          className="mx-auto"
        />
      </div>
     
    </div>
  );
}
