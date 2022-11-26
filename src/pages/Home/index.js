import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import s from "./home.module.scss";

import { getBackgroundImage, getImages } from "../../api";
import ImagesGrid from "../../components/ImagesGrid";
import Form from "../../components/Form";
import useMatch from "../../hooks/useMatch";
import PageTitle from "../../utils/PageTitle";
import RenderIf from "../../utils/RenderIf";

const Home = () => {
  const [photoBy, setPhotoBy] = useState({});
  const [images, setImages] = useState([]);

  const { urls, description, user } = photoBy;
  const match = useMatch();

  useEffect(() => {
    getBackgroundImage()
      .then((res) => {
        setPhotoBy(res[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setPhotoBy({});
  }, []);

  useEffect(() => {
    getImages()
      .then((response) => {
        setImages(response);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => setImages([]);
  }, []);

  return (
    <PageTitle title="Home">
      <div className={s.header_outer}>
        <div className={s.header_image}>
          <LazyLoadImage src={urls?.regular} alt={description} effect="blur" />
        </div>
        <div className="container">
          <div className={s.header_inner}>
            <div className={s.header_content}>
              <h1 className={s.header_title}>Unsplash</h1>
              <div className={s.header_text}>
                <p>The internet’s source of freely-usable images.</p>
                <p>Powered by creators everywhere.</p>
              </div>
              <RenderIf isTrue={match}>
                <Form />
              </RenderIf>
              <RenderIf isTrue={user?.username}>
                <div className={s.user}>
                  <p>Photo by</p>
                  <Link to={`/@${user?.username}`}>{user?.username}</Link>
                </div>
              </RenderIf>
            </div>
          </div>
        </div>
      </div>

      <ImagesGrid images={images} />
    </PageTitle>
  );
};

export default Home;
