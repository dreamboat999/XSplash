import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import s from "./search.module.scss";

import { getSearchImages } from "./api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/pageTitle";
import LinearProgress from "../../components/LinearProgress";

const Search = () => {
  const { recentArr, orientation, sort, value } = useSelector(
    (state) => state.appState
  );
  const { name } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const defaultPage = 1;

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(recentArr));
  }, [recentArr]);

  useEffect(() => {
    if (value) {
      window.location.reload();
    }
  }, [value]);

  useEffect(() => {
    if (orientation || sort) {
      setLoading(true);
      getSearchImages(defaultPage, name, orientation, sort)
        .then((response) => {
          setImages(response.results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orientation, sort]);

  useEffect(() => {
    if (isFetching) {
      getSearchImages(page, name, orientation, sort)
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
