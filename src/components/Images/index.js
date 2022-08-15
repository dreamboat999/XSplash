import React, { useEffect, useState } from "react";

import ImagesGrid from "../ImagesGrid";
import { getImages } from "./api";

const Images = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching) {
      getImages(page)
        .then((response) => {
          setImages([...images, ...response]);
          setPage((prevState) => prevState + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isFetching]);

  return <ImagesGrid setIsFetching={setIsFetching} images={images} />;
};

export default Images;
