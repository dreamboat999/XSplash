import instance from "../../axios";
import { SECRET_KEY } from "../../utils/constants";

export const getSearchImages = (page, name) => {
  return instance()
    .get(
      `search/photos?client_id=${SECRET_KEY}&per_page=12&page=${page}&query=${name}`
    )
    .then((res) => {
      return res?.data;
    });
};
