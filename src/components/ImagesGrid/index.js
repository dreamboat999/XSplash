import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImageId, setImageModal } from "../../store/actions";

import ImagesMasonry from "../ImagesMasonry";

import s from "./imagesGrid.module.scss";
import RenderIf from "../../utils/renderIf";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMatch } from "../../hooks/useMatch";

const ImagesGrid = ({ setIsFetching, images, name }) => {
  const dispatch = useDispatch();
  const match = useMatch();

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenModal = (id) => {
    dispatch(setImageModal(true));
    dispatch(setImageId(id));
  };

  return (
    <div className={s.images_grid}>
      <div className="container">
        <RenderIf isTrue={name}>
          <h1 className={s.name}>{name ? name : "Loading"}</h1>
        </RenderIf>
        <ImagesMasonry>
          {images.map((el, i) => {
            const { id, user, urls, description } = el;
            return (
              <div
                key={i}
                className={s.image_wrapper}
                onClick={match ? () => handleOpenModal(id) : () => {}}
              >
                <div className={s.user_info_outer}>
                  <div
                    className={s.user_info_inner}
                    onClick={(e) => {
                      console.log("click");
                      e.stopPropagation();
                    }}
                  >
                    <div className={s.user_image}>
                      <LazyLoadImage
                        src={user.profile_image.small}
                        alt={user.name}
                      />
                    </div>
                    <h3>{user.name}</h3>
                  </div>
                </div>

                <div
                  onClick={match ? () => {} : () => handleOpenModal(id)}
                  className={s.image}
                >
                  <LazyLoadImage
                    src={urls.regular}
                    alt={description}
                    effect="blur"
                  />
                </div>
              </div>
            );
          })}
        </ImagesMasonry>
      </div>
    </div>
  );
};

export default ImagesGrid;
