import React, { useEffect, useState } from "react";

import API, { SECRET_KEY } from "../api";
import Images from "../Images";

const MainImageList = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching) {
      API.get(`photos?client_id=${SECRET_KEY}&per_page=12&page=${page}`)
        .then((response) => {
          setImages([...images, ...response.data]);
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

  return <Images setIsFetching={setIsFetching} images={images} />;
};

export default MainImageList;
