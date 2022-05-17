import React, { useEffect, useState } from "react";

import API, { SECRET_KEY } from "../api";

import s from "./header.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Search from "../Search";

const Header = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState({});

  useEffect(() => {
    API.get(
      `collections/1459961/photos?client_id=${SECRET_KEY}&orientation=landscape&per_page=1`
    ).then((response) => {
      setPhotoOfTheDay(response.data[0]);
    });
  }, []);

  return (
    <div className={s.header_outer}>
      <div className={s.header_image}>
        <LazyLoadImage
          src={photoOfTheDay.urls?.regular}
          alt={photoOfTheDay?.description}
          effect="blur"
        />
        <div className={s.user}>
          <h6>Photo of the Day by</h6>
          <p>{photoOfTheDay.user?.username}</p>
        </div>
      </div>
      <div className={s.header_inner}>
        <div className={s.header_content}>
          <h1>Unsplash</h1>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
