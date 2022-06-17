import axios from "axios";
export const SECRET_KEY = "IUgXugRv2_py-RXNsbEV_V53Mqv_7HHKmZU622XZM3Y";

const instance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://api.unsplash.com/",
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
    }
  );

  return axiosInstance;
};

export default instance;
