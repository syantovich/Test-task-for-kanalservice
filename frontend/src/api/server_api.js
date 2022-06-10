import axios from "axios";
import { SERVER_API } from "../constants/constants";

const server_api = {
  add({ date, numberOf, distance, name }) {
    return axios.post(`${SERVER_API}element`, {
      date,
      numberOf,
      distance,
      name,
    });
  },
  getAllDB(page, limit, setting = {}) {
    return axios.post(`${SERVER_API}elements/${page}/${limit}`, setting);
  },
};
export default server_api;
