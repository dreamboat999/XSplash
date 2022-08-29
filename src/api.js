import instance from "./axios";
import { SECRET_KEY } from "./constants";

export const getBackgroundImage = () => {
  return instance(true)
    .get(
      `collections/1459961/photos?client_id=${SECRET_KEY}&orientation=landscape&per_page=1`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getImage = (id) => {
  return instance(true)
    .get(`photos/${id}?client_id=${SECRET_KEY}`)
    .then((res) => {
      return res?.data;
    });
};

export const getUserImages = (username, page) => {
  return instance(true)
    .get(
      `users/${username}/photos?client_id=${SECRET_KEY}&per_page=9${
        page ? `&page=${page}` : ""
      }`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getImages = (page) => {
  return instance(true)
    .get(`photos?client_id=${SECRET_KEY}&per_page=9&page=${page}`)
    .then((res) => {
      return res?.data;
    });
};

export const getSearchImages = (
  page,
  name,
  sort = "relevance",
  orientation
) => {
  return instance()
    .get(
      `search/photos?client_id=${SECRET_KEY}&per_page=12&page=${page}&query=${name}&order_by=${sort}${
        orientation ? `&orientation=${orientation}` : ""
      }`
    )
    .then((res) => {
      return res?.data;
    });
};

export const getUserInfo = (username) => {
  return instance()
    .get(`users/${username}/?client_id=${SECRET_KEY}`)
    .then((res) => {
      return res?.data;
    });
};
