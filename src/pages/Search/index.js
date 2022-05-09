import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";
import { SEARCH_IMAGE } from "../../utils/Config";
import { sliceIntoChunks } from "../../utils/SliceIntoChunks";
import ImagesGrid from "../../components/ImagesGrid";

import styles from "./search.module.scss";

const { title_outer, title_inner } = styles;

const Search = () => {
  const { recentArr } = useSelector((state) => state.appState);
  const { name } = useParams();
  const [firstCol, setFirstCol] = useState([]);
  const [secondCol, setSecondCol] = useState([]);
  const [thirdCol, setThirdCol] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(recentArr));
  }, [recentArr]);

  useEffect(() => {
    if (isFetching) {
      axios
        .get(`${SEARCH_IMAGE}&per_page=12&page=${page}&query=${name}`)
        .then((response) => {
          setFirstCol([
            ...firstCol,
            ...sliceIntoChunks(
              response.data.results,
              response.data.results.length / 3
            )[0],
          ]);
          setSecondCol([
            ...secondCol,
            ...sliceIntoChunks(
              response.data.results,
              response.data.results.length / 3
            )[1],
          ]);
          setThirdCol([
            ...thirdCol,
            ...sliceIntoChunks(
              response.data.results,
              response.data.results.length / 3
            )[2],
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
    <>
      <div className={title_outer}>
        <div className="container">
          <div className={title_inner}>
            <h1>{name ? name : "Loading"}</h1>
          </div>
        </div>
      </div>
      <ImagesGrid
        firstCol={firstCol}
        secondCol={secondCol}
        thirdCol={thirdCol}
        setIsFetching={setIsFetching}
      />
    </>
  );
};

export default Search;
