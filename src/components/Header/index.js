import React, { useEffect, useState } from "react";

import s from "./header.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Form from "../Form";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../hooks/useMatch";
import { getBackgroundImage } from "./api";

const Header = () => {
  const [photoOfTheDay, setPhotoOfTheDay] = useState({});
  const matches = useMatch();

  const { urls, description, user } = photoOfTheDay;

  useEffect(() => {
    getBackgroundImage()
      .then((res) => {
        setPhotoOfTheDay(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={s.header_outer}>
      <div className={s.header_image}>
        <LazyLoadImage src={urls?.regular} alt={description} effect="blur" />
      </div>
      <div className="container">
        <div className={s.header_inner}>
          <div className={s.header_content}>
            <h1>Unsplash</h1>
            <div>
              <RenderIf isTrue={matches}>
                <Form />
              </RenderIf>
            </div>
            <RenderIf isTrue={user?.username}>
              <div className={s.user}>
                <p>Photo of the Day by</p>
                <span>{user?.username}</span>
              </div>
            </RenderIf>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
