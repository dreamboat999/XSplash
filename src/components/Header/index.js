import React, { useEffect, useState } from "react";

import s from "./header.module.scss";

import Form from "../Form";
import RenderIf from "../../utils/renderIf";
import { useMatch } from "../../hooks/useMatch";
import { getBackgroundImage } from "../../api";

const Header = () => {
  const [photoBy, setPhotoBy] = useState({});
  const match = useMatch();

  const { urls, description, user } = photoBy;

  useEffect(() => {
    getBackgroundImage()
      .then((res) => {
        setPhotoBy(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={s.header_outer}>
      <div className={s.header_image}>
        <img src={urls?.regular} alt={description} />
      </div>
      <div className="container">
        <div className={s.header_inner}>
          <div className={s.header_content}>
            <h1>Unsplash</h1>
            <RenderIf isTrue={match}>
              <Form />
            </RenderIf>
            <RenderIf isTrue={user?.username}>
              <div className={s.user}>
                <p>Photo by</p>
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
