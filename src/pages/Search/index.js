import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import s from "./search.module.scss";

import { getSearchImages } from "./api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/pageTitle";
import LinearProgress from "../../components/LinearProgress";

const Search = () => {
  const { recentArr, orientation } = useSelector((state) => state.appState);
  const { name } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(recentArr));
  }, [recentArr]);

  useEffect(() => {
    if (orientation) {
      setLoading(true);
      getSearchImages(page, name, orientation)
        .then((response) => {
          setImages(response.results);
          setPage(1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orientation]);

  useEffect(() => {
    if (isFetching) {
      getSearchImages(page, name, orientation)
        .then((response) => {
          setImages([...images, ...response.results]);
          setPage((page) => page + 1);
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
    <PageTitle title={`Unsplash | ${name ? name : "Loading"}`}>
      <div className={s.title_outer}>
        <div className="container">
          <div className={s.title_inner}>
            <h1>{name ? name : "Loading"}</h1>
          </div>
        </div>
      </div>
      <LinearProgress loading={loading}>
        <ImagesGrid images={images} setIsFetching={setIsFetching} />
      </LinearProgress>
    </PageTitle>
  );
};

export default Search;
