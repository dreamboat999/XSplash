import axios from "axios";

export const SECRET_KEY = "IUgXugRv2_py-RXNsbEV_V53Mqv_7HHKmZU622XZM3Y";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
});
