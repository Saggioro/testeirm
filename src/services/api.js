import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonserverirm2.herokuapp.com",
});

export default api;
