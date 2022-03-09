/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";
export default {
  details: () => axios.get("/poli"),
};
