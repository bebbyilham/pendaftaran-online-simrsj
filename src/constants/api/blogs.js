/* eslint-disable import/no-anonymous-default-export */
import axios from "configs/axios";
export default {
  details: (id) => axios.get(`/blogs/${id}`).then((res) => res.data),

  join: (id) => axios.post("/my-blogs", { blog_id: id }),
};
