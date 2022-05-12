import React, { useEffect, useState } from "react";

import API, { SECRET_KEY } from "../api";
import { sliceIntoChunks } from "../../utils/SliceIntoChunks";
import ImagesGrid from "../ImagesGrid";

const Images = () => {
  const [firstCol, setFirstCol] = useState([]);
  const [secondCol, setSecondCol] = useState([]);
  const [thirdCol, setThirdCol] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching) {
      API.get(`photos?client_id=${SECRET_KEY}&per_page=12&page=${page}`)
        .then((response) => {
          setFirstCol([
            ...firstCol,
            ...sliceIntoChunks(response.data, response.data.length / 3)[0],
          ]);
          setSecondCol([
            ...secondCol,
            ...sliceIntoChunks(response.data, response.data.length / 3)[1],
          ]);
          setThirdCol([
            ...thirdCol,
            ...sliceIntoChunks(response.data, response.data.length / 3)[2],
          ]);
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
    <ImagesGrid
      firstCol={firstCol}
      secondCol={secondCol}
      thirdCol={thirdCol}
      setIsFetching={setIsFetching}
    />
  );
};

export default Images;
