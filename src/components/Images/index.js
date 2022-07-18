import React, { useEffect, useState } from "react";

import ImagesGrid from "../ImagesGrid";
import { getImages } from "./api";
import LinearProgress from "../LinearProgress";

const Images = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getImages(page)
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return (
    <LinearProgress loading={loading}>
      <ImagesGrid setIsFetching={setIsFetching} images={images} />
    </LinearProgress>
  );
};

export default Images;
