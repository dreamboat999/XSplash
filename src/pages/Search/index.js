import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import s from "./search.module.scss";

import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/pageTitle";
import { getSearchImages } from "./api";

const Search = () => {
  const { recentArr } = useSelector((state) => state.appState);
  const { name } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(recentArr));
  }, [recentArr]);

  useEffect(() => {
    if (isFetching) {
      getSearchImages(page, name)
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
      <ImagesGrid images={images} setIsFetching={setIsFetching} />
    </PageTitle>
  );
};

export default Search;
