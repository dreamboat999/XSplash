import React, { useEffect, useState } from "react";

import s from "./userPhotos.module.scss";
import { MdPhoto } from "react-icons/md";

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

  return (
    <div>
      <div className={s.tabs_outer}>
        <div className={s.tabs_inner}>
          <div className={s.tab}>
            <div className={s.tab_icon}>
              <MdPhoto />
            </div>
            <div className={s.tab_title}>Photos</div>
          </div>
        </div>
      </div>
      <ImagesGrid images={images} setIsFetching={setIsFetching} />
    </div>
  );
};

export default UserPhotos;
