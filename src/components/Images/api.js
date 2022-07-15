import instance from "../../axios";
import { SECRET_KEY } from "../../utils/constants";

export const getImages = (page) => {
  return instance(true)
    .get(`photos?client_id=${SECRET_KEY}&per_page=9&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
