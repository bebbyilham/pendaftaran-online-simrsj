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

import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function PendaftaranLamaForm({ history }) {
  const [
    {
      // eslint-disable-next-line
      nama,
      nomr,
      // eslint-disable-next-line
      nik,
      nohp,
      pembayaran,
      pembayaranlain,
      nokartu,
      politujuan,
      tglkunjungan,
    },
    setState,
  ] = useForm({
    nama: "",
    nomr: "",
    nik: "",
    nohp: "",
    pembayaran: "",
    pembayaranlain: "",
    nokartu: "",
    politujuan: "",
    tglkunjungan: "",
  });
  async function ceknomr(e) {
    e.preventDefault();
    pasien
      .detailspasien(nomr)
      .then((res) => {
        if ((res.status = "success")) {
          setcekmr(res.status);
          toast.info("Data Rekam Medis ditemukan !", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // nama(res.status);
          setceknama(res.data.nama_pasien);
          setceknik(res.data.nomor_pengenal);
        }

        console.log(res.status);
        console.log(res.data.no_mr);
      })
      .catch((err) => {
        setcekmr(err?.response?.data?.status);
        seterrors(err?.response?.data?.message);
      });
  }
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
  // eslint-disable-next-line
  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [cekmr, setcekmr] = useState(null);
  const [ceknama, setceknama] = useState(null);
  const [ceknik, setceknik] = useState(null);

  async function submit(e) {
    e.preventDefault();

    pasien
      .pasienlama({
        norm: nomr,
        nomorkartu: nokartu,
        nik: ceknik,
        nama: ceknama,
        nohp,
        kodepoli: politujuan,
        jeniskunjungan: "0",
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
        pembayaran: pembayaran === "bpjs" ? pembayaranlain : pembayaran,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === "success") {
          history.push("/home");
          toast.success(
            "Pendaftaran Berhasil NO. RM " +
              res.data.norm +
              " KODE BOOKING : " +
              res.data.kodebooking,
            {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
        if (res.status === "Gagal") {
          toast.error(res.message, {
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
          <span className="text-green-800 font-bold"> Pasien Lama </span>
        </h1>
        <form onSubmit={submit}>
          <div className="w-full justify flex">
            <div className="w-1/2">
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
            <div className="w-1/4 mt-5 ml-2">
              <button
                onClick={ceknomr}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1 w-full"
              >
                Cek
              </button>
            </div>
          </div>
          {(cekmr === "success" && (
            <>
              <Input
                value={ceknama}
                // error={ERRORS?.nama?.message}
                name="nama"
                onChange={setState}
                placeholder="Masukan nama lengkap"
                labelName="Nama"
                readOnly={true}
              />
              <Input
                value={ceknik}
                // error={ERRORS?.nik?.message}
                name="nik"
                onChange={setState}
                placeholder="Masukan nik lengkap"
                labelName="NIK"
                readOnly={true}
              />
              <Input
                value={nohp}
                // error={ERRORS?.nohp?.message}
                name="nohp"
                type="number"
                onChange={setState}
                placeholder="No. Hp"
                labelName="Nomor Handphone"
              />

              <label
                htmlFor={tglkunjungan}
                className={["block text-sm font-medium text-gray-900"].join(
                  " "
                )}
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
                    <option value="JIW">Jiwa</option>
                  </Select>
                </div>
                <div className="w-1/3">
                  <Select
                    labelName="Pembayaran"
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
              )}
            </>
          )) ||
            cekmr === "error"}

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

export default withRouter(PendaftaranLamaForm);
