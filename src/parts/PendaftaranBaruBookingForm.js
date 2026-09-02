import React, { useEffect, useState, createRef } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";
import poli from "constants/api/poli";
import bpjs from "constants/api/bpjs";

import { ReactComponent as RegisterImages } from "assets/images/daftar-baru.svg";

// eslint-disable-next-line
import { useSelector } from "react-redux";
import useForm from "helpers/hooks/useForm";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
import moment from "moment";
import { useScreenshot, createFileName } from "use-react-screenshot";
import {
  IdentificationIcon,
  CalendarIcon,
  PhoneIcon,
  UserIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  CheckCircleIcon,
  DownloadIcon,
  SparklesIcon,
} from "@heroicons/react/solid";

function PendaftaranBaruBookingForm({ history }) {
  const [
    {
      nama,
      nik,
      nomorkk,
      jeniskelamin,
      nohp,
      alamat,
      pembayaran,
      pembayaranlain,
      nokartu,
      tanggallahir,
      politujuan,
      tglkunjungan,
    },
    setState,
  ] = useForm({
    nama: "",
    nik: "",
    nomorkk: "",
    nohp: "",
    alamat: "",
    jeniskelamin: "",
    pembayaran: "",
    pembayaranlain: "",
    tanggallahir: "",
    nokartu: "",
    politujuan: "",
    tglkunjungan: "",
  });

  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [polis, setPolis] = useState([]);
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

  const download = (imgData, { name = "bukti-booking-antrean", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = imgData;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  useEffect(() => {
    async function fetchPoli() {
      pasien
        .getjenislayanan()
        .then((res) => {
          setPolis(res.data);
        })
        .catch((err) => {
          toast.error("Gagal memuat jenis layanan!", {
            position: "top-center",
            autoClose: 4000,
          });
          seterrors(err?.response?.data?.message);
        });
    }
    fetchPoli();
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!nama || !nik || !jeniskelamin || !tlahir || !nohp || !startDate || !alamat || !politujuan) {
      toast.error("Mohon lengkapi seluruh isian form booking!", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    pasien
      .pasienbarubooking({
        nomorkartu: nokartu,
        nik,
        nama_lengkap: nama,
        jenis_kelamin: jeniskelamin,
        tanggal_lahir: moment(tlahir).format("YYYY-MM-DD"),
        no_hp: nohp,
        alamat_lengkap: alamat,
        jenis_layanan: politujuan,
        tanggal_periksa: moment(startDate).format("YYYY-MM-DD"),
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
            `Booking Berhasil! Kode Booking: ${res.response.kodebooking}`,
            {
              position: "top-center",
              autoClose: 6000,
            }
          );
        } else if (res.metadata.code === 201) {
          toast.warning(res.metadata.message, {
            position: "top-center",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        toast.error("Gagal memproses booking pendaftaran.", {
          position: "top-center",
          autoClose: 5000,
        });
      });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 flex justify-center items-start">
      <div className="w-full max-w-5xl my-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ===== FORM CARD ===== */}
        <div
          className={[
            "bg-white rounded-3xl shadow-xl border border-gray-100",
            berhasil === 200 ? "lg:col-span-7" : "lg:col-span-7",
          ].join(" ")}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative rounded-t-3xl overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 text-white border border-white border-opacity-30 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                Booking Online
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Pendaftaran Pasien Baru (Booking)
              </h1>
              <p className="text-blue-100 text-sm mt-1.5 max-w-lg">
                Reservasi antrean online sebelum kunjungan ke rumah sakit
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Input
                  value={nama}
                  name="nama"
                  onChange={setState}
                  placeholder="Nama lengkap pasien"
                  labelName="Nama Lengkap"
                  icon={UserIcon}
                  isRequired={true}
                />

                <Input
                  value={nik}
                  name="nik"
                  type="text"
                  onChange={setState}
                  placeholder="16 digit NIK"
                  labelName="NIK (KTP/KK)"
                  icon={IdentificationIcon}
                  isRequired={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Select
                  labelName="Jenis Kelamin"
                  name="jeniskelamin"
                  value={jeniskelamin}
                  fallbackText="-- Pilih Jenis Kelamin --"
                  icon={UserIcon}
                  onClick={setState}
                  isRequired={true}
                >
                  <option value="1">Laki - laki</option>
                  <option value="0">Perempuan</option>
                </Select>

                <div className="flex flex-col mb-4">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
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

                <div className="flex flex-col mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Tanggal Kunjungan <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center w-full">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <DatePicker
                      className="w-full h-11 pl-11 pr-4 bg-gray-50 hover:bg-white focus:bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm rounded-xl transition-all duration-200 focus:outline-none shadow-sm text-gray-900"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                      portalId="root"
                      popperPlacement="bottom-start"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                    />
                  </div>
                </div>
              </div>

              <Input
                value={alamat}
                name="alamat"
                onChange={setState}
                placeholder="Alamat domisili lengkap"
                labelName="Alamat Pasien"
                icon={LocationMarkerIcon}
                isRequired={true}
              />

              <Select
                labelName="Jenis Layanan"
                name="politujuan"
                value={politujuan}
                fallbackText="-- Pilih Jenis Layanan --"
                icon={OfficeBuildingIcon}
                onClick={setState}
                isRequired={true}
              >
                {polis.map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.nama_layanan}
                  </option>
                ))}
              </Select>

              <button
                type="submit"
                className="w-full h-12 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-150 cursor-pointer mt-2"
              >
                Booking Jadwal Sekarang
              </button>
            </form>
          </div>
        </div>

        {/* ===== RIGHT PANEL (TICKET OR ILLUSTRATION) ===== */}
        {berhasil === 200 ? (
          <div className="lg:col-span-5 space-y-4">
            <div
              ref={ref}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
            >
              {/* Ticket Top Banner */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white text-center relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-2">
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                  <span>Booking Berhasil</span>
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
                    <span className="text-gray-500 font-medium">Poli / Layanan:</span>
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
              <span>Download Bukti Booking</span>
            </button>
          </div>
        ) : (
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8 text-center">
            <div className="w-full max-w-[280px] mb-6 p-4">
              <RegisterImages className="w-full h-auto" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 mb-3 border border-indigo-100">
              <SparklesIcon className="w-4 h-4 text-indigo-600" />
              <span>Booking Praktis</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Reservasi Jadwal Lebih Mudah
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Tentukan tanggal kunjungan yang Anda inginkan dan peroleh kode booking untuk administrasi di rumah sakit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(PendaftaranBaruBookingForm);
