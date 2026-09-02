import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";
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
import {
  IdentificationIcon,
  CalendarIcon,
  PhoneIcon,
  UserIcon,
  LocationMarkerIcon,
  CreditCardIcon,
  CheckCircleIcon,
  SearchIcon,
  SparklesIcon,
} from "@heroicons/react/solid";

function PendaftaranBaruForm({ history }) {
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

  async function cekpeserta(e) {
    e.preventDefault();
    if (!nokartu) {
      toast.error("Masukkan nomor kartu BPJS terlebih dahulu!", {
        position: "top-center",
        autoClose: 4000,
      });
      return;
    }

    bpjs
      .cekpeserta({
        nokartu,
      })
      .then((res) => {
        if (res.peserta) {
          toast.info("Status Peserta: " + res.peserta.statusPeserta.keterangan, {
            position: "top-center",
            autoClose: 5000,
            icon: () => <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
          });
        }
        if (res.metaData && res.metaData.code !== "200") {
          toast.error("Status Peserta: " + res.metaData.message, {
            position: "top-center",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  async function submit(e) {
    e.preventDefault();
    if (!nama || !nik || !jeniskelamin || !tlahir || !nohp || !startDate || !alamat || !pembayaran) {
      toast.error("Mohon lengkapi seluruh isian data pasien!", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }

    pasien
      .pasienbaru({
        nomorkartu: nokartu,
        nik,
        nama,
        jeniskelamin,
        tanggallahir: moment(tlahir).format("YYYY-MM-DD"),
        nohp,
        alamat,
        nomorkk,
        pembayaran,
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
      })
      .then((res) => {
        if (res.metadata.code === 200) {
          history.push("/home");
          toast.success(
            `Pendaftaran Berhasil! Kode Booking: ${res.response.kodebooking} (No. RM: ${res.response.norm})`,
            {
              position: "top-center",
              autoClose: 6000,
            }
          );
        } else {
          toast.warning(res.metadata.message || "Gagal melakukan pendaftaran pasien baru.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      })
      .catch((err) => {
        toast.error("Gagal melakukan pendaftaran pasien baru. Silakan coba kembali.", {
          position: "top-center",
          autoClose: 5000,
        });
      });
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 flex justify-center items-start">
      <div className="w-full max-w-5xl my-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ===== FORM CARD ===== */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white relative rounded-t-3xl overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 text-white border border-white border-opacity-30 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></span>
                Pasien Baru
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Pendaftaran Pasien Baru
              </h1>
              <p className="text-blue-100 text-sm mt-1.5 max-w-lg">
                Lengkapi formulir registrasi data diri pasien baru rawat jalan
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
                  placeholder="Nama lengkap sesuai KTP"
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
                placeholder="Alamat domisili lengkap pasien"
                labelName="Alamat Domisili"
                icon={LocationMarkerIcon}
                isRequired={true}
              />

              <Select
                labelName="Jenis Pembayaran"
                name="pembayaran"
                value={pembayaran}
                fallbackText="-- Pilih Jenis Pembayaran --"
                icon={CreditCardIcon}
                onClick={setState}
                isRequired={true}
              >
                <option value="UMUM">Umum (Mandiri / Tunai)</option>
                <option value="BPJS">BPJS Kesehatan</option>
              </Select>

              {pembayaran === "BPJS" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
                    <div className="sm:col-span-8">
                      <Input
                        value={nokartu}
                        name="nokartu"
                        type="text"
                        onChange={setState}
                        placeholder="13 digit nomor kartu BPJS"
                        labelName="Nomor Kartu BPJS"
                        icon={CreditCardIcon}
                      />
                    </div>
                    <div className="sm:col-span-4 mb-4">
                      <button
                        type="button"
                        onClick={cekpeserta}
                        className="w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md shadow-emerald-600/20 transition-all duration-150 cursor-pointer"
                      >
                        <SearchIcon className="h-4 w-4" />
                        <span>Cek Kartu</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 transition-all duration-150 cursor-pointer mt-2"
              >
                Daftar Pasien Baru
              </button>
            </form>
          </div>
        </div>

        {/* ===== ILLUSTRATION PANEL ===== */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8 text-center">
          <div className="w-full max-w-[280px] mb-6 p-4">
            <RegisterImages className="w-full h-auto" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-3 border border-blue-100">
            <SparklesIcon className="w-4 h-4 text-blue-600" />
            <span>Pelayanan Prima</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Pendaftaran Mudah & Cepat
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            Daftarkan diri Anda atau keluarga tanpa antre langsung di rumah sakit. Simpan bukti kode booking pendaftaran setelah pendaftaran selesai.
          </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PendaftaranBaruForm);
