import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { getSearchImages } from "./api";
import ImagesGrid from "../../components/ImagesGrid";
import LinearProgress from "../../components/LinearProgress";
import Filters from "../../components/Filters";
import PageTitle from "../../utils/pageTitle";
import RenderIf from "../../utils/renderIf";
import MobileFilters from "../../components/Filters/MobileFilters";
import { useMatch } from "../../hooks/useMatch";

const Search = () => {
  const { recentArr, value } = useSelector((state) => state.appState);
  const { name } = useParams();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [orientation, setOrientation] = useState("");
  const [sort, setSort] = useState("relevant");
  const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(false);
  const match = useMatch();
  const defaultPage = 1;
  const url = window.location.pathname.split("/")[1];

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

  useEffect(() => {
    if (url === "photos") {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [url, location]);

  useEffect(() => {
    localStorage.setItem("recent", JSON.stringify(recentArr));
  }, [recentArr]);

  useEffect(() => {
    if (value) {
      window.location.reload();
    }
  }, [value]);

  useEffect(() => {
    if (isOpenMobileFilters) {
      document.querySelector("body").className = "disable_scroll";
    } else {
      document.querySelector("body").className = "";
    }
  }, [isOpenMobileFilters]);

  useEffect(() => {
    if (match) {
      setIsOpenMobileFilters(false);
    }
  }, [match]);

  const handleOpenModal = () => {
    setIsOpenMobileFilters(true);
  };

  return (
    <PageTitle title={`Unsplash | ${name ? name : "Loading"}`}>
      <RenderIf isTrue={isSearchPage}>
        <Filters
          orientation={orientation}
          setOrientation={setOrientation}
          sort={sort}
          setSort={setSort}
          handleOpenModal={handleOpenModal}
        />
      </RenderIf>
      <LinearProgress loading={loading}>
        <ImagesGrid images={images} setIsFetching={setIsFetching} name={name} />
      </LinearProgress>
      <RenderIf isTrue={isOpenMobileFilters}>
        <MobileFilters
          orientation={orientation}
          setOrientation={setOrientation}
          sort={sort}
          setSort={setSort}
          setIsOpenMobileFilters={setIsOpenMobileFilters}
        />
      </RenderIf>
    </PageTitle>
  );
};

export default Search;
