import React, { useEffect, useState, createRef } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";

import bpjs from "constants/api/bpjs";
import poli from "constants/api/poli";
import dokter from "constants/api/dokter";

// import { ReactComponent as RegisterImages } from "assets/images/daftar-baru.svg";

// eslint-disable-next-line
import { useSelector } from "react-redux";
import useForm from "helpers/hooks/useForm";
// eslint-disable-next-line
import fieldErrors from "helpers/fieldErrors";

import Input from "components/Form/Input";
import Select from "components/Form/Select";

import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import { CheckCircleIcon } from "@heroicons/react/solid";
// import { exportComponentAsPNG } from "react-component-export-image";
import { useScreenshot, createFileName } from "use-react-screenshot";
// import "react-toastify/dist/ReactToastify.css";

function CariAntreanForm({ history }) {
  const [
    {
      // eslint-disable-next-line
      nama,
      nomr,
      // eslint-disable-next-line
      nik,
      tanggallahir,
      // eslint-disable-next-line
      nohp,
      // eslint-disable-next-line
      pembayaran,
      // eslint-disable-next-line
      pembayaranlain,
      // eslint-disable-next-line
      nokartu,
      // eslint-disable-next-line
      politujuan,
      // eslint-disable-next-line
      dokterpoli,
      // eslint-disable-next-line
      tglkunjungan,
    },
    setState,
  ] = useForm({
    nama: "",
    nomr: "",
    nik: "",
    tanggallahir: "",
    nohp: "",
    pembayaran: "",
    pembayaranlain: "",
    nokartu: "",
    politujuan: "",
    dokterpoli: "",
    tglkunjungan: "",
  });

  // eslint-disable-next-line
  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [berhasil, setberhasil] = useState(null);
  // const [ceknohp, setceknohp] = useState(null);

  async function submit(e) {
    e.preventDefault();

    pasien
      .detailantrean(nomr, moment(startDate).format("YYYY-MM-DD"))
      .then((res) => {
        if ((res.status = "success")) {
          toast.info("Data ditemukan", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: () => <CheckCircleIcon className="h-5 w-5 text-blue-500" />,
          });
          console.log("dataantrean", res);
          setberhasil(res.status);
          setnoantrean(res.data.nomorantrean);
          setnomorrm(res.data.norm);
          setnampasien(res.data.namapasien);
          setkodebooking(res.data.kodebooking);
          setnampoli(res.data.kodepoli);
          setketerangan(res.data.keterangan);
          settglregistrasi(res.data.created_at);
          settglperiksa(res.data.tanggalperiksa);
        }

        // console.log(res.status);
        // console.log(res.data.no_mr);
      })
      .catch((err) => {
        // console.log(err?.response?.data?.message);
        toast.error("Data belum lengkap !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        seterrors(err?.response?.data?.message);
      });
  }

  const [noantrean, setnoantrean] = useState(null);
  const [kodebooking, setkodebooking] = useState(null);
  const [nomorrm, setnomorrm] = useState(null);
  const [nampasien, setnampasien] = useState(null);
  const [nampoli, setnampoli] = useState(null);
  const [keterangan, setketerangan] = useState(null);
  const [tglregistrasi, settglregistrasi] = useState(null);
  const [tglperiksa, settglperiksa] = useState(null);

  const ref = createRef(null);
  // eslint-disable-next-line
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className="flex justify-center items-centerpb-24">
      <div className="w-full sm:w-3/12 xs:w-3/12 p-4">
        <h1 className="text-4xl text-blue-500 mb-6">
          <span className="font-bold">Cari </span>
          <br />
          <span className="text-green-800 font-bold">Antrean</span>
        </h1>
        <form onSubmit={submit}>
          <div className="w-full justify flex">
            <div className="w-1/2 mr-2">
              <Input
                value={nomr}
                // error={ERRORS?.nomr?.message}
                name="nomr"
                type="number"
                onChange={setState}
                placeholder="Masukan No. MR"
                labelName="No. Rekam Medis"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor={tanggallahir}
                className={["block text-sm font-medium text-gray-900"].join(
                  " "
                )}
              >
                Tanggal Periksa
              </label>
              <DatePicker
                className="focus:outline-none bg-white border w-full px-5 py-2 mt-1 mb-2 shadow-sm sm:text-sm border-gray-300 rounded-md "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-1 w-full"
          >
            Cari
          </button>
        </form>
        {(berhasil === "success" && (
          <>
            <div className="w-full rounded-xl mt-3 sm:w-full xs:w-full p-4">
              <div
                ref={ref}
                className="bg-white rounded-xl shadow-lg shadow-neutral-200 w-full"
              >
                <div className="bg-white rounded-xl p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-neutral-700">
                        {nampasien}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <div className="flex items-center">
                      <span className="text-sm font-normal text-neutral-700">
                        {nomorrm}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p className="font-normal text-neutral-400 text-sm">
                        {tglregistrasi}
                      </p>
                      {/* <p className="mt-0.5  text-neutral-400 text-sm">
                      {tglregistrasi}
                    </p> */}
                    </div>
                  </div>

                  <span className="text-green-500 text-sm mt-2 font-extrabold">
                    ✓ Bukti Pendaftaran Online
                  </span>

                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center">
                      <span className="text-neutral-400 text-md sm:text-xs">
                        Kode Booking
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-extrabold text-neutral-400 text-lg sm:text-sm">
                        {kodebooking}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center">
                      <span className="text-neutral-400 text-md sm:text-xs">
                        Nomor Antrean
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-extrabold text-neutral-400 text-lg sm:text-sm">
                        {noantrean}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-dashed space-y-4 py-4">
                    <div className="flex justify-between group duration-150 cursor-pointer">
                      <div>
                        <p className="text-md text-neutral-600 sm:text-xs">
                          Tanggal Kunjungan
                        </p>
                      </div>
                      <span className="text-md text-neutral-600 sm:text-xs">
                        {tglperiksa}
                      </span>
                    </div>
                    <div className="flex justify-between group duration-150 cursor-pointer">
                      <div>
                        <p className="text-md text-neutral-600 sm:text-xs">
                          Poli
                        </p>
                      </div>
                      <span className="text-md text-neutral-600 sm:text-xs">
                        {nampoli}
                      </span>
                    </div>
                  </div>
                  <div className="text-center text-xs font-semibold rounded-lg mt-3">
                    {keterangan}
                    <br />
                    {
                      "*Simpan bukti pendaftaran online untuk pencatatan administrasi."
                    }
                  </div>
                  <div className="mt-2 border-t border-dashed"></div>
                  <div className="text-center text-neutral-400 font-semibold rounded-lg mt-3">
                    {"RS Jiwa Prof HB Saanin Padang"}
                  </div>
                </div>
              </div>

              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-6 w-full"
                onClick={downloadScreenshot}
              >
                Download Bukti Pendaftaran
              </button>
            </div>
          </>
        )) ||
          berhasil !== 200}
      </div>
    </div>
  );
}

export default withRouter(CariAntreanForm);
