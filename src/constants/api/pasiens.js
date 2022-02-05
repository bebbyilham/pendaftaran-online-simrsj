/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  pasienbaru: (payload) => axios.post("/api/antrean/infopasienbaru", payload),

  detailspasien: (id) => axios.get(`/api/pasiens/${id}`).then((res) => res),
};
