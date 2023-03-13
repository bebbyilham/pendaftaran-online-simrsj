import React, { useEffect, useState, createRef } from "react";
import { withRouter } from "react-router-dom";

import pasien from "constants/api/pasiens";
import poli from "constants/api/poli";
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
import moment from "moment";
import { useScreenshot, createFileName } from "use-react-screenshot";
// import "react-toastify/dist/ReactToastify.css";

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
      // eslint-disable-next-line
      pembayaranlain,
      nokartu,
      tanggallahir,
      // eslint-disable-next-line
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
        seterrors(err?.response?.data?.message);
      });
  }

  const [tlahir, setTlahirDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  // eslint-disable-next-line
  const [errors, seterrors] = useState(null);

  const [polis, setPolis] = useState([]);

  useEffect(() => {
    async function fetchPoli() {
      // const response = await poli.details();
      // // console.log(response.data);
      // response.errors ? setErrorRequest(true) : setPolis(response.data);
      pasien
        .getjenislayanan()
        .then((res) => {
          console.log(res);

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

  const [berhasil, setberhasil] = useState(null);

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

  async function submit(e) {
    e.preventDefault();

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
        // pembayaran,
        tanggal_periksa: moment(startDate).format("YYYY-MM-DD"),
      })
      .then((res) => {
        console.log(res);
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
          history.push("/cariantrean");
          toast.success(
            "Pendaftaran Berhasil Kodebooking " +
              res.response.kodebooking +
              " No. Antrean Loket " +
              res.response.nomorantrean,
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
        if (res.metadata.code === 201) {
          if (
            res.metadata.message ===
            "NIK dengan Layanan yang dipilih telah terdaftar, silahkan cari disini !"
          ) {
            history.push("/cariantrean");
            toast.warning(res.metadata.message, {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.warning(res.metadata.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
        // console.log(err);
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
          {/* <Input
            value={nomorkk}
            // error={ERRORS?.nomorkk?.message}
            name="nomorkk"
            onChange={setState}
            placeholder="Masukan nomorkk lengkap"
            labelName="No KK"
          /> */}
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
            {/* <div className="w-1/2 mr-1">
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
            </div> */}
            <div className="w-full">
              <Select
                labelName="Jenis Layanan"
                name="politujuan"
                value={politujuan}
                fallbackText="Pilih layanan"
                onClick={setState}
                menuPosition={"auto"}
                className="w-1/2"
              >
                {polis.map((value) => (
                  <option
                    className="w-1/2 mr-1"
                    value={value.id}
                    key={value.id}
                  >
                    {value.nama_layanan}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* {pembayaran === "BPJS" && (
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
          )} */}

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

      <div className="hidden w-full sm:w-3/12">
        {(berhasil === 200 && (
          <>
            <div className="w-full rounded-xl sm:w-3/12 xs:w-full p-4 ">
              <div
                ref={ref}
                className="bg-white rounded-xl shadow-lg shadow-neutral-200 w-full"
              >
                <div className="bg-white rounded-xl p-8 w-full">
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

export default withRouter(PendaftaranBaruBookingForm);
