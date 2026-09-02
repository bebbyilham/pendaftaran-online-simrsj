import React, { useState, createRef } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";

// eslint-disable-next-line
import { useSelector } from "react-redux";
import useForm from "helpers/hooks/useForm";

import Input from "components/Form/Input";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import {
  CheckCircleIcon,
  IdentificationIcon,
  CalendarIcon,
  SearchIcon,
  DownloadIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { useScreenshot, createFileName } from "use-react-screenshot";

function CariAntreanForm({ history }) {
  const [
    {
      nama,
      nomr,
      nik,
      tanggallahir,
      nohp,
      pembayaran,
      pembayaranlain,
      nokartu,
      politujuan,
      dokterpoli,
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

  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [berhasil, setberhasil] = useState(null);

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

  const download = (imgData, { name = "bukti-antrean", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = imgData;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  async function submit(e) {
    e.preventDefault();
    if (!nomr || !startDate) {
      toast.error("NIK/No. RM dan Tanggal Periksa wajib diisi!", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    pasien
      .detailantrean(nomr, moment(startDate).format("YYYY-MM-DD"))
      .then((res) => {
        if (res.status === "success" || res.status === 200) {
          toast.info("Data antrean ditemukan", {
            position: "top-center",
            autoClose: 4000,
            icon: () => <CheckCircleIcon className="h-5 w-5 text-blue-500" />,
          });
          setberhasil(res.status);
          setnoantrean(res.data.nomorantrean);
          setnomorrm(res.data.norm);
          setnampasien(res.data.namapasien);
          setkodebooking(res.data.kodebooking);
          setnampoli(res.data.kodepoli);
          setketerangan(res.data.keterangan);
          settglregistrasi(res.data.created_at);
          settglperiksa(res.data.tanggalperiksa);
        } else {
          toast.warning("Data antrean tidak ditemukan!", {
            position: "top-center",
            autoClose: 4000,
          });
        }
      })
      .catch((err) => {
        toast.error("Data antrean tidak ditemukan untuk tanggal tersebut.", {
          position: "top-center",
          autoClose: 4000,
        });
        seterrors(err?.response?.data?.message);
      });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 flex justify-center items-start">
      <div
        className={[
          "w-full transition-all duration-300",
          berhasil === "success"
            ? "max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            : "max-w-2xl",
        ].join(" ")}
      >
        {/* ===== FORM CARD ===== */}
        <div
          className={[
            "bg-white rounded-3xl shadow-xl border border-gray-100",
            berhasil === "success" ? "lg:col-span-7" : "",
          ].join(" ")}
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative rounded-t-3xl overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 text-white border border-white border-opacity-30 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                Pelayanan Pasien
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Cari Status Antrean
              </h1>
              <p className="text-blue-100 text-sm mt-1.5 max-w-lg">
                Periksa nomor antrean dan jadwal kunjungan yang telah didaftarkan
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={nomr}
                    name="nomr"
                    type="text"
                    onChange={setState}
                    placeholder="Masukkan NIK atau No. RM"
                    labelName="NIK / No. Rekam Medis"
                    icon={IdentificationIcon}
                    isRequired={true}
                  />

                  <div className="flex flex-col mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Tanggal Periksa <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center w-full">
                      <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <DatePicker
                        className="w-full h-11 pl-11 pr-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm text-gray-900"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        portalId="root"
                        popperPlacement="bottom-start"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <SearchIcon className="w-5 h-5" />
                  <span>Cari Antrean Pasien</span>
                </button>
              </div>

              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-2.5">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Pastikan tanggal periksa sesuai dengan tanggal kunjungan yang Anda daftarkan. Anda dapat mencari berdasarkan 16 digit NIK atau Nomor Rekam Medis (No. RM).
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* ===== TICKET CARD ===== */}
        {berhasil === "success" && (
          <div className="lg:col-span-5 space-y-4">
            <div
              ref={ref}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
            >
              {/* Ticket Top Banner */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-2">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                  <span>Data Antrean Ditemukan</span>
                </div>
                <h3 className="text-xl font-extrabold">{nampasien}</h3>
                <p className="text-xs text-blue-100 font-mono mt-1">
                  NO. REKAM MEDIS: {nomorrm}
                </p>
              </div>

              {/* Ticket Details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Kode Booking
                    </span>
                    <span className="text-sm sm:text-base font-extrabold font-mono text-slate-800 break-all">
                      {kodebooking}
                    </span>
                  </div>
                  <div className="border-l border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Nomor Antrean
                    </span>
                    <span className="text-2xl font-black font-mono text-indigo-600">
                      {noantrean}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-dashed border-slate-200">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-medium">Poli Tujuan:</span>
                    <span className="font-bold text-gray-900">{nampoli}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-medium">Tgl Kunjungan:</span>
                    <span className="font-bold text-gray-900">{tglperiksa}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500 font-medium">Tgl Registrasi:</span>
                    <span className="font-medium text-gray-700">{tglregistrasi}</span>
                  </div>
                </div>

                {keterangan && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-800 font-medium">
                    * {keterangan}
                  </div>
                )}

                <div className="text-center text-[10px] uppercase tracking-wider text-gray-400 font-semibold pt-3 border-t border-dashed border-slate-200">
                  RS Jiwa Prof. HB Saanin Padang
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={downloadScreenshot}
              className="w-full h-12 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Download Bukti Antrean</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(CariAntreanForm);
