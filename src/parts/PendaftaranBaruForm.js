import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";

import bpjs from "constants/api/bpjs";

import { ReactComponent as RegisterImages } from "assets/images/daftar-baru.svg";

// eslint-disable-next-line
import { useSelector } from "react-redux";
import useForm from "helpers/hooks/useForm";
// eslint-disable-next-line
import fieldErrors from "helpers/fieldErrors";

import Select from "components/Form/Select";
import Input from "components/Form/Input";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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
        // pembayaran: pembayaran === "bpjs" ? pembayaranlain : pembayaran,
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
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);

  async function submit(e) {
    e.preventDefault();

    pasien
      .pasienbaru({
        nomorkartu: nokartu,
        nik,
        nama,
        jeniskelamin,
        tanggallahir: tlahir,
        nohp,
        alamat,
        nomorkk,
        pembayaran: pembayaran === "bpjs" ? pembayaranlain : pembayaran,
      })
      .then((res) => {
        // console.log(res.status);
        if (res.status === "success") {
          history.push("/home");
          toast.success(res.message + " dengan nomor " + res.data.norm, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (res.status === "Ok") {
          toast.warning(res.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        // history.push("/home");
        // toast.success(res.message, {
        //   position: "top-center",
        //   autoClose: false,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        toast.error("Data belum lengkap !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // seterrors(err?.response?.data?.message);
      });
  }

  // const ERRORS = fieldErrors(errors);

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
            // error={ERRORS?.nama?.message}
            name="nama"
            onChange={setState}
            placeholder="Masukan nama lengkap"
            labelName="Nama"
          />
          <Input
            value={nik}
            // error={ERRORS?.nik?.message}
            name="nik"
            onChange={setState}
            placeholder="Masukan nik lengkap"
            labelName="NIK"
          />
          <Input
            value={nomorkk}
            // error={ERRORS?.nomorkk?.message}
            name="nomorkk"
            onChange={setState}
            placeholder="Masukan nomorkk lengkap"
            labelName="No KK"
          />
          <div className="w-full justify flex">
            <div className="w-1/2 mr-1">
              <Select
                labelName="Jenis Kelamin"
                name="jeniskelamin"
                value={jeniskelamin}
                fallbackText="Pilih"
                onClick={setState}
                menuPosition={"fixed"}
                className="w-full"
              >
                <option value="1">Laki - laki</option>
                <option value="0">Perempuan</option>
              </Select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor={tanggallahir}
                className={["block text-sm font-medium text-gray-900"].join(
                  " "
                )}
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
            </div>
          </div>
          <Input
            value={nohp}
            // error={ERRORS?.nohp?.message}
            name="nohp"
            onChange={setState}
            placeholder="No. Hp"
            labelName="Nomor Handphone"
          />
          <Input
            value={alamat}
            // error={ERRORS?.alamat?.message}
            name="alamat"
            onChange={setState}
            placeholder="Alamat Lengkap"
            labelName="Alamat"
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
                    // error={ERRORS?.nokartu?.message}
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

export default withRouter(PendaftaranBaruForm);
