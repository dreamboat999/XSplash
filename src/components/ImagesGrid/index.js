import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImageId, setImageModal } from "../../store/actions";

import ImagesMasonry from "../ImagesMasonry";

import s from "./imagesGrid.module.scss";
import RenderIf from "../../utils/renderIf";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImagesGrid = ({ setIsFetching, images, name }) => {
  const dispatch = useDispatch();

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
            return (
              <div
                key={i}
                className={s.image}
                onClick={() => handleOpenModal(el.id)}
              >
                <div className={s.user_info_wrapper}>
                  <div
                    className={s.user_info}
                    onClick={(e) => {
                      console.log("click");
                      e.stopPropagation();
                    }}
                  >
                    <div className={s.user_image_wrapper}>
                      <LazyLoadImage
                        src={el.user.profile_image.small}
                        alt={el.user.name}
                      />
                    </div>
                    <h3>{el.user.name}</h3>
                  </div>
                </div>

                <LazyLoadImage
                  src={el.urls.regular}
                  alt={el.description}
                  effect="blur"
                />
              </div>
            );
          })}
        </ImagesMasonry>
      </div>
    </div>
  );
};

export default ImagesGrid;
