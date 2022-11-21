import axios from "axios";

const ACCESS_KEY = "o8XokWkKZqJUPogocq58S9_73RF71wG2k11hWC5DIdc";
axios.defaults.baseURL = "https://api.unsplash.com/";

const wrapper = (method, url, data) =>
  axios.request({ method, url, data }).then((response) => response.data);

export const getBackgroundImage = () => {
  return wrapper(
    "get",
    `collections/1459961/photos?client_id=${ACCESS_KEY}&orientation=landscape&per_page=1`
  );
};

export const getImage = (id) => {
  return wrapper("get", `photos/${id}?client_id=${ACCESS_KEY}`);
};

export const getUserImages = (username) => {
  return wrapper(
    "get",
    `users/${username}/photos?client_id=${ACCESS_KEY}&per_page=10`
  );
};

export const getImages = () => {
  return wrapper("get", `photos?client_id=${ACCESS_KEY}&per_page=10`);
};

export const getSearchImages = (name, sort = "relevance", orientation) => {
  return wrapper(
    "get",
    `search/photos?client_id=${ACCESS_KEY}&per_page=10&query=${name}&order_by=${sort}${
      orientation ? `&orientation=${orientation}` : ""
    }`
  );
};

export const getUserInfo = (username) => {
  return wrapper("get", `users/${username}/?client_id=${ACCESS_KEY}`);
};
