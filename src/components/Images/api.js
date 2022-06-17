import instance, { SECRET_KEY } from "../axios";

export const getImages = (page) => {
  return instance(true)
    .get(`photos?client_id=${SECRET_KEY}&per_page=9&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};
