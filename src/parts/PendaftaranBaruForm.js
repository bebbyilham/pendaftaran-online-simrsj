import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";

import bpjs from "constants/api/bpjs";

import { ReactComponent as RegisterImages } from "assets/images/daftar-baru.svg";

import { useSelector } from "react-redux";

import useForm from "helpers/hooks/useForm";
import fieldErrors from "helpers/fieldErrors";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function LoginForm({ history }) {
  const [
    {
      nama,
      email,
      password,
      pembayaran,
      otherProfession,
      nokartu,
      tgllahir,
      politujuan,
      tglkunjungan,
    },
    setState,
  ] = useForm({
    nama: "",
    email: "",
    password: "",
    pembayaran: "",
    otherProfession: "",
    tgllahir: "",
    nokartu: "",
    politujuan: "",
    tglkunjungan: "",
  });
  // const BPJS = useSelector((state) => state.bpjs);
  async function cekpeserta(e) {
    e.preventDefault();
    // this.setState(prevState => ({
    //   showButton: !prevState.showButton,
    //   showButtonName: "SAVING..."
    // }));
    // alert("Great Shot!");
    /** Mocking we updating the API and using the response to update the state */
    // setTimeout(() => {
    //   this.setState(prevState => ({
    //     showData: !prevState.showData,
    //     showButtonName: "SAVE"
    //   }));
    // }, 3000);
    bpjs
      .cekpeserta({
        nokartu,
        // email,
        // password,
        // pembayaran: pembayaran === "others" ? otherProfession : pembayaran,
      })
      .then((res) => {
        // console.log(res);
        console.log(res.metaData);
        if (res.peserta) {
          toast.info(res.peserta.statusPeserta.keterangan, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (res.metaData) {
          toast.error(res.metaData.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [errors, seterrors] = useState(null);

  async function submit(e) {
    e.preventDefault();

    pasien
      .pasienbaru({
        nama,
        tgllahir,
        password,
        pembayaran: pembayaran === "others" ? otherProfession : pembayaran,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  const ERRORS = fieldErrors(errors);

  return (
    <div className="flex justify-center items-center pb-24">
      <div className="w-full sm:w-3/12">
        <h1 className="text-4xl text-blue-500 mb-6">
          <span className="font-bold">Pendaftaran </span>
          Rawat Jalan
          <br />
          <span className="text-green-800 font-bold"> Pasien Baru </span>
        </h1>
        <form onSubmit={submit}>
          <Input
            value={nama}
            error={ERRORS?.nama?.message}
            name="nama"
            onChange={setState}
            placeholder="Masukan nama lengkap"
            labelName="Nama"
          />
          {/* <Input
            value={email}
            error={ERRORS?.email?.message}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Masukan alamat email"
            labelName="Email"
          /> */}
          <label
            htmlFor={tgllahir}
            className={["block text-sm font-medium text-gray-900"].join(" ")}
          >
            Tanggal Lahir
          </label>
          <DatePicker
            className="focus:outline-none bg-white border w-full px-5 py-2 mt-1 mb-2 shadow-sm sm:text-sm border-gray-300 rounded-md "
            selected={tlahir}
            onChange={(date) => setTlahirDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dateFormat="yyyy-MM-dd"
          />

          <label
            htmlFor={tglkunjungan}
            className={["block text-sm font-medium text-gray-900"].join(" ")}
          >
            Tanggal Kunjungan
          </label>
          <DatePicker
            className="focus:outline-none bg-white border w-full px-5 py-2 mt-1 mb-2 shadow-sm sm:text-sm border-gray-300 rounded-md "
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date().setDate(new Date().getDate() + 1)}
            showDisabledMonthNavigation
            dropdownMode="select"
            dateFormat="yyyy-MM-dd"
            labelName="Tanggal Lahir"
          />
          <div className="w-full justify flex">
            <div className="w-1/2 mr-1">
              <Select
                labelName="Poli Tujuan"
                name="politujuan"
                value={politujuan}
                fallbackText="Pilih poli"
                onClick={setState}
                menuPosition={"fixed"}
                className="w-full"
              >
                <option value="1">JIWA</option>
                <option value="2">ANAK</option>
              </Select>
            </div>
            <div className="w-1/2">
              <Select
                labelName="Pilih Pembayaran"
                name="pembayaran"
                value={pembayaran}
                fallbackText="pembayaran"
                onClick={setState}
                className="w-full"
              >
                <option value="umum">Umum</option>
                <option value="bpjs">BPJS</option>
              </Select>
            </div>
          </div>

          {pembayaran === "bpjs" && (
            <form>
              <div className="w-full justify flex">
                <div className="w-1/2">
                  <Input
                    value={nokartu}
                    error={ERRORS?.nokartu?.message}
                    name="nokartu"
                    type="text"
                    onChange={setState}
                    placeholder="Masukan nomor kartu"
                    labelName="Nomor Kartu"
                  />
                </div>
                <div className="w-1/4 mt-5 ml-2">
                  <button
                    onClick={cekpeserta}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1 w-full"
                  >
                    Cek
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-1 w-full"
          >
            Daftar
          </button>
        </form>
      </div>

      <div className="w-1/12 hidden sm:block"></div>
      <div className="w-5/12 hidden sm:block flex justify-end pt-24 pr-0 pl-20">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div className="absolute w-full h-full -mb-8 -ml-2">
            <div className="absolute w-full h-full -mb-8 -ml-2">
              <RegisterImages></RegisterImages>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
