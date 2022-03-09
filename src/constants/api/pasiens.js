/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  pasienbaru: (payload) => axios.post("/pendaftaran/pasienbaru", payload),

  detailspasien: (id) => axios.get(`pasien/${id}`).then((res) => res),
  pasienlama: (payload) => axios.post("/pendaftaran/pasienlama", payload),
};
