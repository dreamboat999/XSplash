import instance from "../axios";
import { SECRET_KEY } from "../axios";

export const getBackgroundImage = () => {
  return instance(true)
    .get(
      `collections/1459961/photos?client_id=${SECRET_KEY}&orientation=landscape&per_page=1`
    )
    .then((res) => {
      return res?.data;
    });
};
