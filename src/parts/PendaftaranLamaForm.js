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

function PendaftaranLamaForm({ history }) {
  const [
    {
      // eslint-disable-next-line
      nama,
      nomr,
      // eslint-disable-next-line
      nik,
      tanggallahir,
      nohp,
      // eslint-disable-next-line
      pembayaran,
      // eslint-disable-next-line
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
  async function ceknomr(e) {
    e.preventDefault();
    pasien
      .detailspasien(nomr, moment(tlahir).format("YYYY-MM-DD"))
      .then((res) => {
        if ((res.status = "success")) {
          setcekmr(res.status);
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
          // nama(res.status);
          setceknama(res.data.nama_pasien);
          setceknik(res.data.nomor_pengenal);
          // setceknohp(res.data.hp);
        }

        // console.log(res.status);
        // console.log(res.data.no_mr);
      })
      .catch((err) => {
        toast.error("Server sibuk, coba lagi !", {
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
  // eslint-disable-next-line
  async function cekpeserta(e) {
    e.preventDefault();

    bpjs
      .cekpeserta({
        nokartu,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.metaData);
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
        // console.log(err?.response?.data?.message);
        toast.error("Server sibuk, coba lagi !", {
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
  // eslint-disable-next-line
  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);
  const [cekmr, setcekmr] = useState(null);
  const [ceknama, setceknama] = useState(null);
  const [ceknik, setceknik] = useState(null);
  const [berhasil, setberhasil] = useState(null);
  // const [ceknohp, setceknohp] = useState(null);

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
        kodedokter: dokterpoli,
        // jampraktek: praktek,
        jeniskunjungan: "0",
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
        pembayaran: "umum",
        // pembayaran: pembayaran === "bpjs" ? pembayaranlain : pembayaran,
      })
      .then((res) => {
        // console.log("====================================");
        // console.log(res.metadata.message);
        // console.log("====================================");
        // console.log(res.metadata.code);
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
          // console.log("====================================");
          // console.log(res.metadata.code);
          // console.log("====================================");
          toast.success(
            "Pendaftaran Berhasil NO. RM " +
              res.response.norm +
              " KODE BOOKING : " +
              res.response.kodebooking,
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
        } else if (res.metadata.code === 201) {
          toast.error(res.metadata.message, {
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

  async function cekjadwaldokter(e) {
    setStartDate(e);

    dokter
      .cekjadwaldokter({
        kodepoli: politujuan,
        tanggalperiksa: moment(startDate).format("YYYY-MM-DD"),
      })
      .then((res) => {
        // console.log(res);

        if (res.code === "200") {
          setJadwal(res.code);
          setDokters(res.data);
          setPraktek(res.data);
          toast.info("Jadwal ditemukan", {
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

  const [polis, setPolis] = useState([]);
  const [dokters, setDokters] = useState([]);
  // eslint-disable-next-line
  const [praktek, setPraktek] = useState(null);
  const [cekjadwal, setJadwal] = useState(false);
  // eslint-disable-next-line
  const [errorRequest, setErrorRequest] = useState(false);

  useEffect(() => {
    async function fetchPoli() {
      // const response = await poli.details();
      // // console.log(response.data);
      // response.errors ? setErrorRequest(true) : setPolis(response.data);
      poli
        .details()
        .then((res) => {
          // console.log(res);

          setPolis(res.data);
        })
        .catch((err) => {
          toast.error("Server sibuk, coba lagi !", {
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
    fetchPoli();
  }, []);

  const [noantrean, setnoantrean] = useState(null);
  const [kodebooking, setkodebooking] = useState(null);
  const [nomorrm, setnomorrm] = useState(null);
  const [nampasien, setnampasien] = useState(null);
  const [nampoli, setnampoli] = useState(null);
  const [keterangan, setketerangan] = useState(null);
  const [tglregistrasi, settglregistrasi] = useState(null);
  const [tglperiksa, settglperiksa] = useState(null);

  // const ERRORS = fieldErrors(errors);

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
          <span className="font-bold">Pendaftaran </span>
          Rawat Jalan
          <br />
          <span className="text-green-800 font-bold"> Pasien Lama </span>
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
            <div className="w-1/6 mt-5 ml-2">
              <button
                onClick={ceknomr}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1 w-full"
                data-bs-toggle="tooltip"
                title="Cek Data"
              >
                <CheckCircleIcon className="h-5 w-5 text-white mx-auto" />
              </button>
            </div>
          </div>
          {(cekmr === "success" && (
            <>
              {/* <div className="w-full justify flex">
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
              </div> */}

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
              <div className="w-full justify flex">
                <div className="w-1/2 mr-2">
                  <Select
                    labelName="Poli Tujuan"
                    name="politujuan"
                    value={politujuan}
                    fallbackText="Pilih Poli"
                    onClick={setState}
                    menuPosition={"auto"}
                    className="w-1/2"
                  >
                    {polis.map((value) => (
                      <option
                        className="w-1/2 mr-1"
                        value={value.kode_ruangan}
                        key={value.id_ruangan}
                      >
                        {value.nama_ruangan}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor={tglkunjungan}
                    className={["block text-sm font-medium text-gray-900"].join(
                      " "
                    )}
                  >
                    Tanggal Kunjungan
                  </label>
                  <DatePicker
                    name="tglkunjungan"
                    className="focus:outline-none bg-white border w-full px-5 py-2 mt-1 mb-2 shadow-sm sm:text-sm border-gray-300 rounded-md "
                    selected={startDate}
                    onChange={cekjadwaldokter}
                    minDate={new Date().setDate(new Date().getDate() + 3)}
                    maxDate={new Date().setDate(new Date().getDate() + 7)}
                    showDisabledMonthNavigation
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    labelName=""
                  />
                </div>
                {/* <div className="w-1/6 mt-5 ml-2">
                  <button
                    onClick={cekjadwaldokter}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-1 w-full"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  </button>
                </div> */}
              </div>

              {cekjadwal === "200" && (
                <>
                  <div className="w-full justify flex">
                    <div className="w-full">
                      <Select
                        multiple={true}
                        labelName="Dokter"
                        name="dokterpoli"
                        value={dokterpoli}
                        fallbackText="Pilih poli"
                        onClick={setState}
                        menuPosition={"auto"}
                        className="w-1/2"
                      >
                        {dokters.map((value) => (
                          <option
                            className="w-1/2 mr-1"
                            value={value.dokter_kode}
                            key={value.dokter_kode}
                          >
                            {value.dokter_nama}
                            {" ("} {value.buka}
                            {"-"}
                            {value.tutup} {}
                            {")"}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </>
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
      {(berhasil === 200 && (
        <>
          <div className="w-full rounded-xl sm:w-3/12 xs:w-full p-4">
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
                  {"*"}
                  {keterangan}
                </div>
                <div className="mt-2 border-t border-dashed"></div>
                <div className="text-center text-neutral-400 font-semibold rounded-lg mt-3">
                  {"RS Jiwa Prof HB Saanin Padang"}
                </div>
              </div>
            </div>
            <div className="w-5/6 ml-10 items-end">
              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-1 w-full"
                onClick={downloadScreenshot}
              >
                Download Bukti Pendaftaran
              </button>
            </div>
          </div>
        </>
      )) ||
        berhasil !== 200}
    </div>
  );
}

export default withRouter(PendaftaranLamaForm);
