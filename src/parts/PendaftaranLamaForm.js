import React, { useEffect, useState, createRef } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";
import poli from "constants/api/poli";
import dokter from "constants/api/dokter";

// eslint-disable-next-line
import { useSelector } from "react-redux";
import useForm from "helpers/hooks/useForm";

import Input from "components/Form/Input";
import Select from "components/Form/Select";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import {
  CheckCircleIcon,
  IdentificationIcon,
  CalendarIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
  OfficeBuildingIcon,
  DownloadIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { useScreenshot, createFileName } from "use-react-screenshot";

function PendaftaranLamaForm({ history }) {
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

  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [cekmr, setcekmr] = useState(null);
  const [ceknama, setceknama] = useState(null);
  const [ceknik, setceknik] = useState(null);
  const [ceknorm, setceknorm] = useState(null);
  const [berhasil, setberhasil] = useState(null);

  const [polis, setPolis] = useState([]);
  const [dokters, setDokters] = useState([]);
  // eslint-disable-next-line
  const [praktek, setPraktek] = useState(null);
  const [cekjadwal, setJadwal] = useState(false);

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

  const download = (imgData, { name = "bukti-pendaftaran", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = imgData;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  useEffect(() => {
    async function fetchPoli() {
      poli
        .details()
        .then((res) => {
          setPolis(res.data);
        })
        .catch((err) => {
          toast.error("Gagal memuat data poli, silakan coba lagi.", {
            position: "top-center",
            autoClose: 4000,
          });
          seterrors(err?.response?.data?.message);
        });
    }
    fetchPoli();
  }, []);

  async function ceknomr(e) {
    e.preventDefault();
    if (!nomr || !tlahir) {
      toast.error("NIK dan Tanggal Lahir wajib diisi!", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    pasien
      .detailspasien(nomr, moment(tlahir).format("YYYY-MM-DD"))
      .then((res) => {
        if (res.status === "success" || res.status === 200) {
          setcekmr("success");
          toast.info("Data pasien berhasil diverifikasi", {
            position: "top-center",
            autoClose: 4000,
            icon: () => <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
          });
          setceknama(res.data.nama_pasien);
          setceknik(res.data.nomor_pengenal);
          setceknorm(res.data.no_mr);
        }
      })
      .catch((err) => {
        const errMsg = err?.response?.data?.message || "Data pasien tidak ditemukan!";
        toast.error(errMsg, {
          position: "top-center",
          autoClose: 5000,
        });
        seterrors(errMsg);
      });
  }

  async function cekjadwaldokter(e) {
    e.preventDefault();
    if (!politujuan || !startDate) {
      toast.error("Pilih Poli Tujuan dan Tanggal Kunjungan terlebih dahulu!", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    dokter
      .cekjadwaldokter({
        kodepoli: politujuan,
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
      })
      .then((res) => {
        if (res.code === "200") {
          setJadwal(res.code);
          setDokters(res.data);
          setPraktek(res.data);
          toast.info("Jadwal dokter tersedia", {
            position: "top-center",
            autoClose: 4000,
          });
        } else {
          toast.warning(res.metaData?.message || "Jadwal dokter tidak ditemukan.", {
            position: "top-center",
            autoClose: 4000,
          });
        }
      })
      .catch((err) => {
        toast.error("Gagal memeriksa jadwal dokter!", {
          position: "top-center",
          autoClose: 4000,
        });
        seterrors(err?.response?.data?.message);
      });
  }

  async function submit(e) {
    e.preventDefault();
    if (!nohp || !politujuan || !dokterpoli || !startDate) {
      toast.error("Mohon lengkapi seluruh isian form!", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    pasien
      .pasienlama({
        norm: ceknorm || nomr,
        nomorkartu: nokartu,
        nik: ceknik,
        nama: ceknama,
        nohp,
        kodepoli: politujuan,
        kodedokter: dokterpoli,
        jeniskunjungan: "0",
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
        pembayaran: "umum",
      })
      .then((res) => {
        if (res.metadata.code === 200) {
          setberhasil(res.metadata.code);
          setnoantrean(res.response.nomorantrean);
          setnomorrm(res.response.norm);
          setnampasien(res.response.namapasien);
          setkodebooking(res.response.kodebooking);
          setnampoli(res.response.namapoli);
          setketerangan(res.response.keterangan);
          settglregistrasi(res.response.tglregistrasi);
          settglperiksa(res.response.tanggalperiksa);

          toast.success(
            `Pendaftaran Berhasil! No. Antrean: ${res.response.nomorantrean}`,
            {
              position: "top-center",
              autoClose: 5000,
            }
          );
        } else {
          toast.error(res.metadata.message || "Gagal melakukan pendaftaran!", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        toast.error("Terjadi kesalahan pada sistem pendaftaran.", {
          position: "top-center",
          autoClose: 5000,
        });
        seterrors(err?.response?.data?.message);
      });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 flex justify-center items-start">
      <div
        className={[
          "w-full transition-all duration-300",
          berhasil === 200
            ? "max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            : "max-w-3xl",
        ].join(" ")}
      >
        {/* ===== FORM CARD ===== */}
        <div
          className={[
            "bg-white rounded-3xl shadow-xl border border-gray-100",
            berhasil === 200 ? "lg:col-span-7" : "",
          ].join(" ")}
        >
          {/* Modern Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative rounded-t-3xl overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 text-white border border-white border-opacity-30 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Pasien Umum / Mandiri
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Pendaftaran Pasien Lama
              </h1>
              <p className="text-blue-100 text-sm mt-1.5 max-w-lg">
                Verifikasi identitas pasien terdaftar RS Jiwa Prof. HB Saanin Padang
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-6">
              {/* SECTION 1: VERIFIKASI IDENTITAS */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    Verifikasi NIK & Tanggal Lahir
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                  <div className="sm:col-span-5">
                    <Input
                      value={nomr}
                      name="nomr"
                      type="text"
                      onChange={setState}
                      placeholder="16 digit NIK"
                      labelName="NIK Pasien"
                      icon={IdentificationIcon}
                      isRequired={true}
                    />
                  </div>

                  <div className="sm:col-span-4 flex flex-col mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Tanggal Lahir <span className="text-red-500 font-bold">*</span>
                    </label>
                    <div className="relative flex items-center w-full">
                      <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <DatePicker
                        className="w-full h-11 pl-11 pr-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm text-gray-900"
                        selected={tlahir}
                        onChange={(date) => setTlahirDate(date)}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()}
                        portalId="root"
                        popperPlacement="bottom-start"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 mb-4">
                    <button
                      type="button"
                      onClick={ceknomr}
                      className="w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/20 transition-all duration-150 cursor-pointer"
                    >
                      <SearchIcon className="h-4 w-4" />
                      <span>Cek Data</span>
                    </button>
                  </div>
                </div>

                {/* VERIFIED PATIENT BADGE */}
                {cekmr === "success" && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/70">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                          <span>Pasien Terverifikasi</span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          Valid
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-sm">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            Nama Pasien
                          </span>
                          <span className="font-bold text-gray-900 text-xs sm:text-sm truncate block mt-0.5">
                            {ceknama}
                          </span>
                        </div>

                        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-sm">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            No. Rekam Medis
                          </span>
                          <span className="font-bold font-mono text-blue-700 text-xs sm:text-sm block mt-0.5">
                            {ceknorm || nomr}
                          </span>
                        </div>

                        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-100 shadow-sm">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            NIK
                          </span>
                          <span className="font-bold font-mono text-gray-800 text-xs sm:text-sm block mt-0.5">
                            {ceknik}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: POLI & JADWAL KUNJUNGAN */}
              {cekmr === "success" && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                      Pilihan Poli & Tanggal Kunjungan
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                    <div className="sm:col-span-5">
                      <Select
                        labelName="Poli Tujuan"
                        name="politujuan"
                        value={politujuan}
                        fallbackText="-- Pilih Poli --"
                        icon={OfficeBuildingIcon}
                        onClick={setState}
                        isRequired={true}
                      >
                        {polis.map((value) => (
                          <option value={value.kode_ruangan} key={value.id_ruangan}>
                            {value.nama_ruangan}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="sm:col-span-4 flex flex-col mb-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Tgl Kunjungan <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative flex items-center w-full">
                        <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                          <CalendarIcon className="w-5 h-5" />
                        </div>
                        <DatePicker
                          name="tglkunjungan"
                          className="w-full h-11 pl-11 pr-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm text-gray-900"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          minDate={new Date()}
                          maxDate={new Date(Date.now() + 35 * 24 * 60 * 60 * 1000)}
                          portalId="root"
                          popperPlacement="bottom-start"
                          dateFormat="dd/MM/yyyy"
                          placeholderText="DD/MM/YYYY"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 mb-4">
                      <button
                        type="button"
                        onClick={cekjadwaldokter}
                        className="w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-500/20 transition-all duration-150 cursor-pointer"
                      >
                        <SearchIcon className="h-4 w-4" />
                        <span>Cek Jadwal</span>
                      </button>
                    </div>
                  </div>

                  {/* DOKTER DROPDOWN */}
                  {cekjadwal === "200" && (
                    <div className="pt-2">
                      <Select
                        labelName="Pilih Dokter Spesialis"
                        name="dokterpoli"
                        value={dokterpoli}
                        fallbackText="-- Pilih Dokter yang Bertugas --"
                        icon={UserIcon}
                        onClick={setState}
                        isRequired={true}
                      >
                        {dokters.map((value) => (
                          <option value={value.dokter_kode} key={value.dokter_kode}>
                            {value.dokter_nama} ({value.buka} - {value.tutup})
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}

                  {/* KONTAK WHATSAPP */}
                  <div className="pt-2">
                    <Input
                      value={nohp}
                      name="nohp"
                      type="text"
                      onChange={setState}
                      placeholder="Contoh: 081234567890"
                      labelName="Nomor Handphone (WhatsApp)"
                      icon={PhoneIcon}
                      isRequired={true}
                    />
                  </div>
                </div>
              )}

              {/* PETUNJUK PENDAFTARAN */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-blue-900 font-bold mb-2">
                  <InformationCircleIcon className="h-4 w-4 text-blue-600" />
                  <span>Petunjuk Pendaftaran Online:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-700">1.</span>
                    <span>Masukkan NIK & Tanggal Lahir lalu klik Cek Data.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-700">2.</span>
                    <span>Pilih Poli & Tanggal Kunjungan, lalu Cek Jadwal.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-700">3.</span>
                    <span>Pilih Dokter Spesialis & isi No. WhatsApp.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="font-bold text-blue-700">4.</span>
                    <span>Klik Daftar Sekarang dan simpan bukti antrean.</span>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={cekmr !== "success"}
                className={[
                  "w-full h-12 rounded-2xl text-base font-bold text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2",
                  cekmr === "success"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    : "bg-gray-300 cursor-not-allowed opacity-70 shadow-none",
                ].join(" ")}
              >
                <span>Daftar Sekarang</span>
              </button>
            </form>
          </div>
        </div>

        {/* ===== TICKET CARD (SIDE BY SIDE ON SUCCESS) ===== */}
        {berhasil === 200 && (
          <div className="lg:col-span-5 space-y-4">
            <div
              ref={ref}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
            >
              {/* Ticket Top Banner */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-2">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                  <span>Pendaftaran Berhasil</span>
                </div>
                <h3 className="text-xl font-extrabold">{nampasien}</h3>
                <p className="text-xs text-emerald-100 font-mono mt-1">
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
                    <span className="text-2xl font-black font-mono text-blue-600">
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
              <span>Download Bukti Pendaftaran</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(PendaftaranLamaForm);
