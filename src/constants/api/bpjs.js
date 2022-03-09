/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";

export default {
  //private
  // login: (credentials) => axios.post("/users/login", credentials),
  cekpeserta: (payload) => axios.post("/bpjs/cekkartu", payload),
  // refresh: (credentials) =>
  //   axios.post("/refresh-tokens", {
  //     refresh_token: credentials.refresh_token,
  //     email: credentials.email,
  //   }),

  //public
  // details: () => axios.get("/users"),
  // update: (data) => axios.put("users", data),
  // logout: () => axios.post("/users/logout"),
};
