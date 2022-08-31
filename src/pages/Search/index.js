import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSearchImages } from "../../api";
import { LinearProgress } from "../../components/Loading";
import ImagesGrid from "../../components/ImagesGrid";
import DesktopFilters from "../../components/Filters/DesktopFilters";
import MobileFilters from "../../components/Filters/MobileFilters";
import PageTitle from "../../utils/pageTitle";
import RenderIf from "../../utils/renderIf";
import useMatch from "../../hooks/useMatch";

const Search = () => {
  const { name, orientation, sort } = useParams();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(false);
  const match = useMatch();

  useEffect(() => {
    setLoading(true);
    getSearchImages(1, name, sort, orientation)
      .then((response) => {
        setImages(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, sort, orientation]);

  useEffect(() => {
    if (isFetching) {
      getSearchImages(page, name, sort, orientation)
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
    <PageTitle title={`${name ? name : "Loading"}`}>
      <DesktopFilters
        name={name}
        sort={sort}
        orientation={orientation}
        handleOpenModal={handleOpenModal}
      />
      <LinearProgress loading={loading}>
        <ImagesGrid images={images} setIsFetching={setIsFetching} name={name} />
      </LinearProgress>
      <RenderIf isTrue={isOpenMobileFilters}>
        <MobileFilters
          name={name}
          sort={sort}
          orientation={orientation}
          setIsOpenMobileFilters={setIsOpenMobileFilters}
        />
      </RenderIf>
    </PageTitle>
  );
};

export default Search;
