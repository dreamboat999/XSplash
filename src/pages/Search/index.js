import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import s from "./search.module.scss";

import API, { SECRET_KEY } from "../../components/api";
import ImagesGrid from "../../components/ImagesGrid";
import PageTitle from "../../utils/pageTitle";

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
      API.get(
        `search/photos?client_id=${SECRET_KEY}&per_page=12&page=${page}&query=${name}`
      )
        .then((response) => {
          setImages([...images, ...response.data.results]);
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
