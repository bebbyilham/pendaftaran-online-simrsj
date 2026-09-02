/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  pasienbaru: (payload) => axios.post("/pendaftaran/pasienbaru", payload),

  detailspasien: (nik, tlahir) =>
    axios.get(`pasien/${nik}/${tlahir}`).then((res) => res),
  pasienlama: (payload) => axios.post("/pendaftaran/pasienlama", payload),
  detailantrean: (nomr, tanggalperiksa) =>
    axios
      .get(`pasien/cariantrean/${nomr}/${tanggalperiksa}`)
      .then((res) => res),
  getjenislayanan: () => axios.get("/pendaftaran/jenislayanan"),
  pasienbarubooking: (payload) =>
    axios.post("/pendaftaran/pasienbarubooking", payload),
};
