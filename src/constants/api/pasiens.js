/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  pasienbaru: (payload) => axios.post("/pendaftaran/pasienbaru", payload),

  detailspasien: (id, tlahir) =>
    axios.get(`pasien/${id}/${tlahir}`).then((res) => res),
  pasienlama: (payload) => axios.post("/pendaftaran/pasienlama", payload),
};
