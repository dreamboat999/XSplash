import instance, { SECRET_KEY } from "../../components/axios";

export const getSearchImages = (page, name) => {
  return instance()
    .get(
      `search/photos?client_id=${SECRET_KEY}&per_page=12&page=${page}&query=${name}`
    )
    .then((res) => {
      return res?.data;
    });
};
