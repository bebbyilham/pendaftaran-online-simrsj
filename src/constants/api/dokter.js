/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  details: () => axios.get("/dokter"),
  detailspasien: (kodepoli, tanggalperiksa) =>
    axios
      .get(`api/jadwaldokterpoli/${kodepoli}/${tanggalperiksa}`)
      .then((res) => res),
  cekjadwaldokter: (payload) => axios.post("/dokter/jadwaldokter", payload),
};
