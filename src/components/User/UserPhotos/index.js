import React, { useEffect, useState } from "react";

import { getUserImages } from "../../../api";
import ImagesGrid from "../../ImagesGrid";

const UserPhotos = ({ username }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching) {
      getUserImages(username, page)
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

  return <ImagesGrid images={images} setIsFetching={setIsFetching} />;
};

export default UserPhotos;
