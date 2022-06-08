import React, { useEffect, useState } from "react";

import s from "./header.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

import API, { SECRET_KEY } from "../api";
import Search from "../Search";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../utils/useMatch";

const Header = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState({});
  const matches = useMatch();

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
      </div>
      <div className="container">
        <div className={s.header_inner}>
          <div className={s.header_content}>
            <h1>Unsplash</h1>
            <div className={s.search_wrapper}>
              <RenderIf isTrue={matches}>
                <Search />
              </RenderIf>
            </div>
            <div className={s.user}>
              <h6>Photo of the Day by</h6>
              <p>{photoOfTheDay.user?.username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
